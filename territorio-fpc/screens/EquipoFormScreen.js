import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  ActivityIndicator, Image, TouchableOpacity, Platform,
  Modal, FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/client';
import { API_URL } from '../config';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SweetAlert from '../components/SweetAlert';
import { colors } from '../theme';

const CATEGORIAS = [
  { label: 'Primera A', value: 'A' },
  { label: 'Primera B', value: 'B' },
];

export default function EquipoFormScreen({ route, navigation }) {
  const editingId = route.params?.id;

  const [nombre, setNombre]         = useState('');
  const [idCiudad, setIdCiudad]     = useState('');
  const [estadio, setEstadio]       = useState('');
  const [titulos, setTitulos]       = useState('');
  const [categoria, setCategoria]   = useState('A');
  const [imagen, setImagen]         = useState('');   // URL final guardada en BD
  const [localUri, setLocalUri]     = useState('');   // preview local antes de subir
  const [uploading, setUploading]   = useState(false);

  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);

  // ── Cargar ciudades y, si aplica, datos del equipo ──────────────────────
  useEffect(() => {
    async function load() {
      try {
        const ciudadesRes = await api.get('/ciudades');
        setCiudades(ciudadesRes.data);

        if (editingId) {
          const { data } = await api.get(`/equipos/${editingId}`);
          setNombre(data.nombre);
          setIdCiudad(String(data.id_ciudad ?? ''));
          setEstadio(data.estadio || '');
          setTitulos(String(data.titulos ?? ''));
          setCategoria(data.categoria || 'A');
          setImagen(data.imagen || '');
        } else if (ciudadesRes.data[0]) {
          setIdCiudad(String(ciudadesRes.data[0].id));
        }
      } catch (e) {
        Alert.alert('Error', 'No se pudo cargar el formulario');
      } finally {
        setLoading(false);
      }
    }
    load();
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
        if (asset.file) {
          formData.append('imagen', asset.file);
        } else {
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

  // ── Guardar equipo ──────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!nombre || !idCiudad) {
      Alert.alert('Faltan datos', 'Nombre y ciudad son obligatorios');
      return;
    }
    if (uploading) {
      Alert.alert('Espera', 'La imagen aún se está subiendo');
      return;
    }
    setSaving(true);
    const payload = {
      nombre,
      id_ciudad: Number(idCiudad),
      estadio,
      titulos: Number(titulos) || 0,
      categoria,
      imagen,
    };
    try {
      if (editingId) {
        await api.put(`/equipos/${editingId}`, payload);
      } else {
        await api.post('/equipos', payload);
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

  if (ciudades.length === 0) {
    return (
      <SafeAreaView style={styles.bg}>
        <Text style={styles.warning}>
          Primero crea al menos una ciudad (pestaña Ciudades) antes de agregar un equipo.
        </Text>
      </SafeAreaView>
    );
  }

  const previewUri = localUri || imagen;
  const selectedCity = ciudades.find((c) => String(c.id) === idCiudad);
  const selectedCityLabel = selectedCity?.nombre || 'Selecciona una ciudad';

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
        {/* ── Header con botón atrás ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{editingId ? 'Editar equipo' : 'Agregar equipo'}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* ── Imagen / escudo ── */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.8}>
          {uploading ? (
            <ActivityIndicator color={colors.gold} />
          ) : previewUri ? (
            <Image source={{ uri: previewUri }} style={styles.preview} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderIcon}>🛡️</Text>
              <Text style={styles.imagePlaceholderText}>Toca para subir escudo</Text>
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
        <InputField value={nombre} onChangeText={setNombre} placeholder="Nombre del equipo" />

        <Text style={styles.label}>Ciudad *</Text>
        <View style={styles.pickerWrap}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowCityPicker(true)}
            activeOpacity={0.85}
          >
            <Text style={[styles.pickerText, !idCiudad && styles.pickerTextPlaceholder]}>
              {selectedCityLabel}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          visible={showCityPicker}
          animationType="fade"
          onRequestClose={() => setShowCityPicker(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowCityPicker(false)}
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Selecciona una ciudad</Text>
              <FlatList
                data={ciudades}
                keyExtractor={(item) => String(item.id)}
                style={styles.modalList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isActive = String(item.id) === idCiudad;
                  return (
                    <TouchableOpacity
                      style={[styles.modalItem, isActive && styles.modalItemActive]}
                      onPress={() => {
                        setIdCiudad(String(item.id));
                        setShowCityPicker(false);
                      }}
                    >
                      <Text style={[styles.modalItemText, isActive && styles.modalItemTextActive]}>
                        {item.nombre}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <Text style={styles.label}>Categoría *</Text>
        <View style={styles.categoriaRow}>
          {CATEGORIAS.map((c) => (
            <TouchableOpacity
              key={c.value}
              style={[
                styles.categoriaBtn,
                categoria === c.value && styles.categoriaBtnActive,
              ]}
              onPress={() => setCategoria(c.value)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.categoriaBtnText,
                  categoria === c.value && styles.categoriaBtnTextActive,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Estadio</Text>
        <InputField value={estadio} onChangeText={setEstadio} placeholder="Nombre del estadio" />

        <Text style={styles.label}>Títulos locales</Text>
        <InputField value={titulos} onChangeText={setTitulos} placeholder="0" keyboardType="numeric" />

        <Text style={styles.required}>* Campos obligatorios</Text>

        <PrimaryButton
          title={editingId ? 'Guardar cambios' : 'Crear equipo'}
          onPress={handleSubmit}
          loading={saving || uploading}
        />

        <SweetAlert
          visible={showSuccess}
          title={editingId ? 'Actualizado' : 'Guardado'}
          message={editingId ? 'El equipo se actualizó correctamente.' : 'El equipo se agregó correctamente.'}
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
  select:{
    border: 'none',
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
  pickerWrap: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  pickerButton: {
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    color: '#111',
    fontSize: 14,
    flex: 1,
  },
  pickerTextPlaceholder: {
    color: '#999',
  },
  pickerArrow: {
    color: colors.gold,
    fontSize: 12,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    maxHeight: '70%',
    paddingVertical: 12,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  modalList: {
    maxHeight: 260,
  },
  modalItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemActive: {
    backgroundColor: '#f9f2d7',
  },
  modalItemText: {
    color: '#111',
    fontSize: 14,
  },
  modalItemTextActive: {
    color: '#0d1535',
    fontWeight: '700',
  },

  categoriaRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  categoriaBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
  },
  categoriaBtnActive: { backgroundColor: colors.gold },
  categoriaBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  categoriaBtnTextActive: { color: '#0d1535' },

  required: { color: '#aaa', fontSize: 11, marginTop: 8, marginBottom: 16 },
  warning: { color: '#fff', textAlign: 'center', marginTop: 60, paddingHorizontal: 30 },
});