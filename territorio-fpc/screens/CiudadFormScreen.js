import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  ActivityIndicator, Image, TouchableOpacity, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/client';
import { API_URL } from '../config';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SweetAlert from '../components/SweetAlert';
import { colors } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CiudadFormScreen({ route, navigation }) {
  const editingId = route.params?.id;

  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [poblacion, setPoblacion] = useState('');
  const [region, setRegion] = useState('');
  const [imagen, setImagen] = useState('');   // URL final guardada en BD
  const [localUri, setLocalUri] = useState('');   // preview local antes de subir
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(!!editingId);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ── Cargar datos si es edición ──────────────────────────────────────────
  useEffect(() => {
    if (!editingId) return;
    api.get(`/ciudades/${editingId}`)
      .then(({ data }) => {
        setNombre(data.nombre ?? '');
        setDepartamento(data.departamento ?? '');
        setPoblacion(String(data.poblacion ?? ''));
        setRegion(data.region ?? '');
        setImagen(data.imagen ?? '');
      })
      .catch(() => Alert.alert('Error', 'No se pudo cargar la ciudad'))
      .finally(() => setLoading(false));
  }, [editingId]);

  // ── Pedir permisos y abrir galería ──────────────────────────────────────
  async function pickImage() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setLocalUri(asset.uri);
    await uploadImage(asset);
  }

  // ── Subir imagen al backend ─────────────────────────────────────────────
  async function uploadImage(asset) {
    setUploading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();

      if (Platform.OS === 'web') {
        // En web, asset.file es el File object real del input nativo
        if (asset.file) {
          formData.append('imagen', asset.file);
        } else {
          // Fallback: convertir uri blob a file
          const res = await fetch(asset.uri);
          const blob = await res.blob();
          formData.append('imagen', blob, 'foto.jpg');
        }
      } else {
        const filename = asset.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        formData.append('imagen', { uri: asset.uri, name: filename, type });
      }

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const data = await res.json();
      setImagen(data.url);
    } catch (e) {
      console.log('Upload error:', e.message);
      Alert.alert('Error', 'No se pudo subir la imagen: ' + e.message);
      setLocalUri('');
    } finally {
      setUploading(false);
    }
  }
  // ── Guardar ciudad ──────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!nombre || !departamento) {
      Alert.alert('Faltan datos', 'Nombre y departamento son obligatorios');
      return;
    }
    if (uploading) {
      Alert.alert('Espera', 'La imagen aún se está subiendo');
      return;
    }
    setSaving(true);
    const payload = {
      nombre,
      departamento,
      poblacion: poblacion ? Number(poblacion) : null,
      region,
      imagen,   // URL guardada en BD
    };
    try {
      if (editingId) {
        await api.put(`/ciudades/${editingId}`, payload);
      } else {
        await api.post('/ciudades', payload);
      }
      setShowSuccess(true);
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  }

  // ── Loading inicial ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.bg}>
        <ActivityIndicator color={colors.gold} size="large" style={{ marginTop: 60 }} />
      </SafeAreaView>
    );
  }

  const previewUri = localUri || imagen;

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
        {/* ── Header con botón atrás ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{editingId ? 'Editar ciudad' : 'Agregar ciudad'}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* ── Imagen ── */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.8}>
          {uploading ? (
            <ActivityIndicator color={colors.gold} />
          ) : previewUri ? (
            <Image source={{ uri: previewUri }} style={styles.preview} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderIcon}>🖼️</Text>
              <Text style={styles.imagePlaceholderText}>Toca para subir imagen</Text>
            </View>
          )}
        </TouchableOpacity>
        {previewUri ? (
          <TouchableOpacity onPress={pickImage} style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Cambiar imagen</Text>
          </TouchableOpacity>
        ) : null}

        {/* ── Campos ── */}
        <Text style={styles.label}>Nombre *</Text>
        <InputField value={nombre} onChangeText={setNombre} placeholder="Nombre de la ciudad" />

        <Text style={styles.label}>Departamento *</Text>
        <InputField value={departamento} onChangeText={setDepartamento} placeholder="Departamento" />

        <Text style={styles.label}>Población</Text>
        <InputField
          value={poblacion}
          onChangeText={setPoblacion}
          placeholder="Número de habitantes"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Región</Text>
        <InputField value={region} onChangeText={setRegion} placeholder="Ej: Andina, Caribe..." />

        <Text style={styles.required}>* Campos obligatorios</Text>

        <PrimaryButton
          title={editingId ? 'Guardar cambios' : 'Crear ciudad'}
          onPress={handleSubmit}
          loading={saving || uploading}
        />

        <SweetAlert
          visible={showSuccess}
          title={editingId ? 'Actualizado' : 'Guardado'}
          message={editingId ? 'La ciudad se actualizó correctamente.' : 'La ciudad se agregó correctamente.'}
          onConfirm={() => {
            setShowSuccess(false);
            navigation.goBack();
          }}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark },
  content: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.navy,
    borderRadius: 24,
    padding: 24,
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    minHeight: 64,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    color: colors.gold,
    fontSize: 24,
    fontWeight: '700',
  },

  // Imagen
  imagePicker: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.gold,
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a2340',
  },
  preview: { width: '100%', height: '100%' },
  imagePlaceholder: { alignItems: 'center', gap: 6 },
  imagePlaceholderIcon: { fontSize: 32 },
  imagePlaceholderText: { color: '#aaa', fontSize: 13 },
  changeBtn: { alignItems: 'center', marginBottom: 10 },
  changeBtnText: { color: colors.gold, fontSize: 13, fontWeight: '600' },

  // Campos
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
  },
  required: { color: '#aaa', fontSize: 11, marginTop: 8, marginBottom: 16 },
});