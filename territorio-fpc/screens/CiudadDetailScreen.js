import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';
import InitialsCircle from '../components/InitialsCircle';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';

export default function CiudadDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [ciudad, setCiudad] = useState(null);
  const [loading, setLoading] = useState(true);

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

  function handleDelete() {
    Alert.alert('Eliminar ciudad', `¿Eliminar ${ciudad.nombre}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/ciudades/${id}`);
            navigation.goBack();
          } catch (e) {
            Alert.alert('Error', e.response?.data?.error || 'No se pudo eliminar');
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.bg}>
        <ActivityIndicator color={colors.gold} size="large" style={{ marginTop: 60 }} />
      </View>
    );
  }
  if (!ciudad) return null;

  return (
    <View style={styles.bg}>
      <View style={styles.card}>
        <InitialsCircle name={ciudad.nombre} size={120} bg="#27496d" />
        <Field label="Nombre" value={ciudad.nombre} />
        <Field label="Departamento" value={ciudad.departamento || '-'} />
        <Field label="Población" value={String(ciudad.poblacion ?? '-')} />
        <Field label="Región" value={ciudad.region || '-'} />
        <View style={styles.actions}>
          <PrimaryButton title="Eliminar" variant="danger" style={styles.half} onPress={handleDelete} />
          <PrimaryButton title="Editar" style={styles.half} onPress={() => navigation.navigate('CiudadForm', { id })} />
        </View>
      </View>
    </View>
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
  bg: { flex: 1, backgroundColor: colors.dark, padding: 20, alignItems: 'center' },
  card: { width: '100%', maxWidth: 320, backgroundColor: colors.navy, borderRadius: 24, padding: 24, alignItems: 'center', marginTop: 20 },
  label: { color: '#fff', fontSize: 12, fontWeight: '600', marginTop: 16, marginBottom: 4, alignSelf: 'flex-start' },
  value: { backgroundColor: '#fff', color: '#111', borderRadius: 8, padding: 10, fontSize: 13, textAlign: 'center', width: '100%' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 20, width: '100%' },
  half: { flex: 1 },
});
