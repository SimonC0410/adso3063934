import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../api/client';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';

export default function CiudadFormScreen({ route, navigation }) {
  const editingId = route.params?.id;
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [poblacion, setPoblacion] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(!!editingId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editingId) return;
    api
      .get(`/ciudades/${editingId}`)
      .then(({ data }) => {
        setNombre(data.nombre);
        setDepartamento(data.departamento || '');
        setPoblacion(String(data.poblacion ?? ''));
        setRegion(data.region || '');
      })
      .catch(() => Alert.alert('Error', 'No se pudo cargar la ciudad'))
      .finally(() => setLoading(false));
  }, [editingId]);

  async function handleSubmit() {
    if (!nombre || !departamento) {
      Alert.alert('Faltan datos', 'Nombre y departamento son obligatorios');
      return;
    }
    setSaving(true);
    const payload = { nombre, departamento, poblacion, region };
    try {
      if (editingId) {
        await api.put(`/ciudades/${editingId}`, payload);
      } else {
        await api.post('/ciudades', payload);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.bg}>
        <ActivityIndicator color={colors.gold} size="large" style={{ marginTop: 60 }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{editingId ? 'Editar ciudad' : 'Agregar ciudad'}</Text>

        <Text style={styles.label}>Nombre</Text>
        <InputField value={nombre} onChangeText={setNombre} placeholder="Nombre de la ciudad" />

        <Text style={styles.label}>Departamento</Text>
        <InputField value={departamento} onChangeText={setDepartamento} placeholder="Departamento" />

        <Text style={styles.label}>Población</Text>
        <InputField value={poblacion} onChangeText={setPoblacion} placeholder="Población" />

        <Text style={styles.label}>Región</Text>
        <InputField value={region} onChangeText={setRegion} placeholder="Región" />

        <PrimaryButton
          title={editingId ? 'Guardar cambios' : 'Crear ciudad'}
          onPress={handleSubmit}
          loading={saving}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark },
  content: { padding: 20, alignItems: 'center' },
  card: { width: '100%', maxWidth: 320, backgroundColor: colors.navy, borderRadius: 24, padding: 24, marginTop: 10 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 18 },
  label: { color: '#fff', fontSize: 12, fontWeight: '600', marginBottom: 4 },
});
