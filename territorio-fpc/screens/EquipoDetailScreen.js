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

function getImageUrl(imagenField) {
  if (!imagenField) return null;
  if (imagenField.startsWith('http')) return imagenField;
  return `${API_URL}${imagenField.startsWith('/') ? '' : '/'}${imagenField}`;
}

export default function EquipoDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [equipo, setEquipo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      setImgError(false);
      api
        .get(`/equipos/${id}`)
        .then((res) => active && setEquipo(res.data))
        .catch(() => active && Alert.alert('Error', 'No se pudo cargar el equipo'))
        .finally(() => active && setLoading(false));
      return () => { active = false; };
    }, [id])
  );

  async function confirmDeleteTeam() {
    try {
      await api.delete(`/equipos/${id}`);
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
  if (!equipo) return null;

  const imageUrl = getImageUrl(equipo.imagen);
  const hasImg = Boolean(imageUrl) && !imgError;

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
          {hasImg ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.img}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <InitialsCircle name={equipo.nombre} size={120} bg="#27496d" />
          )}
          <Field label="Nombre" value={equipo.nombre} />
          <Field label="Ciudad" value={equipo.ciudad || '-'} />
          <Field label="Estadio" value={equipo.estadio || '-'} />
          <Field label="Titulos Locales" value={String(equipo.titulos ?? '-')} />
          <View style={styles.actions}>
            <PrimaryButton title="Eliminar" variant="danger" style={styles.half} onPress={() => setConfirmDelete(true)} />
            <PrimaryButton title="Editar" style={styles.half} onPress={() => navigation.navigate('EquipoForm', { id })} />
          </View>
        </View>
      </ScrollView>

      <SweetAlert
        visible={confirmDelete}
        title="Eliminar equipo"
        message={`¿Deseas eliminar ${equipo?.nombre || 'este equipo'}?`}
        onConfirm={confirmDeleteTeam}
        onCancel={() => setConfirmDelete(false)}
        confirmText="Eliminar"
        cancelText="Cancelar"
        showCancel
      />

      <SweetAlert
        visible={showSuccess}
        title="Eliminado"
        message="El equipo se eliminó correctamente."
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
    paddingBottom: 40,
  },
  card: { width: '100%', maxWidth: 320, backgroundColor: colors.navy, borderRadius: 24, padding: 24, alignItems: 'center', marginTop: 20 },
  img: { width: 120, height: 120, borderRadius: 60 },
  label: { color: '#fff', fontSize: 12, fontWeight: '600', marginTop: 16, marginBottom: 4, alignSelf: 'flex-start' },
  value: { backgroundColor: '#fff', color: '#111', borderRadius: 8, padding: 10, fontSize: 13, textAlign: 'center', width: '100%' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 20, width: '100%' },
  half: { flex: 1 },
});