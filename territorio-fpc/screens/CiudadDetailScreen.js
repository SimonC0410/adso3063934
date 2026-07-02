import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/client';
import { API_URL } from '../config';
import InitialsCircle from '../components/InitialsCircle';
import PrimaryButton from '../components/PrimaryButton';
import SweetAlert from '../components/SweetAlert';
import { colors } from '../theme';

// Helper para construir URL completa de imagen
function getImageUrl(imagenField) {
  if (!imagenField) return null;
  // Si ya es una URL completa, usarla tal cual
  if (imagenField.startsWith('http')) return imagenField;
  // Si es una ruta relativa, construir URL completa
  return `${API_URL}${imagenField.startsWith('/') ? '' : '/'}${imagenField}`;
}

export default function CiudadDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [ciudad, setCiudad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      api
        .get(`/ciudades/${id}`)
        .then((res) => active && setCiudad(res.data))
        .catch(() => active && Alert.alert('Error', 'No se pudo cargar la ciudad'))
        .finally(() => active && setLoading(false));
      return () => { active = false; };
    }, [id])
  );

  async function confirmDeleteCity() {
    try {
      await api.delete(`/ciudades/${id}`);
      setConfirmDelete(false);
      setShowSuccess(true);
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'No se pudo eliminar');
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.bg}>
        <ActivityIndicator color={colors.gold} size="large" style={{ marginTop: 60 }} />
      </SafeAreaView>
    );
  }
  if (!ciudad) return null;

  return (
    <SafeAreaView style={styles.bg}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Show</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* ── Imagen o Initials ── */}
          {ciudad.imagen ? (
            <Image
              source={{ uri: getImageUrl(ciudad.imagen) }}
              style={styles.imagen}
              resizeMode="cover"
              onError={() => console.error('Error cargando imagen:', ciudad.imagen)}
            />
          ) : (
            <InitialsCircle name={ciudad.nombre} size={120} bg="#27496d" />
          )}
          <Field label="Nombre" value={ciudad.nombre} />
          <Field label="Departamento" value={ciudad.departamento || '-'} />
          <Field label="Población" value={String(ciudad.poblacion ?? '-')} />
          <Field label="Región" value={ciudad.region || '-'} />
          <View style={styles.actions}>
            <PrimaryButton title="Eliminar" variant="danger" style={styles.half} onPress={() => setConfirmDelete(true)} />
            <PrimaryButton title="Editar" style={styles.half} onPress={() => navigation.navigate('CiudadForm', { id })} />
          </View>
        </View>
      </ScrollView>

      <SweetAlert
        visible={confirmDelete}
        title="Eliminar ciudad"
        message={`¿Deseas eliminar ${ciudad?.nombre || 'esta ciudad'}?`}
        onConfirm={confirmDeleteCity}
        onCancel={() => setConfirmDelete(false)}
        confirmText="Eliminar"
        cancelText="Cancelar"
        showCancel
      />

      <SweetAlert
        visible={showSuccess}
        title="Eliminado"
        message="La ciudad se eliminó correctamente."
        onConfirm={() => {
          setShowSuccess(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

function Field({ label, value }) {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark, paddingHorizontal: 20, paddingTop: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  back: { color: '#fff', fontSize: 24, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },

  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40, // evita que el botón quede pegado al fondo
  },
  card: { width: '100%', maxWidth: 320, backgroundColor: colors.navy, borderRadius: 24, padding: 24, alignItems: 'center', marginTop: 20 },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.gold,
    marginBottom: 16,
  },
  label: { color: '#fff', fontSize: 12, fontWeight: '600', marginTop: 16, marginBottom: 4, alignSelf: 'flex-start' },
  value: { backgroundColor: '#fff', color: '#111', borderRadius: 8, padding: 10, fontSize: 13, textAlign: 'center', width: '100%' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 20, width: '100%' },
  half: { flex: 1 },
});