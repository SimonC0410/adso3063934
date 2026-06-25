import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api/client';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';

export default function EquipoFormScreen({ route, navigation }) {
  const editingId = route.params?.id;
  const [nombre, setNombre] = useState('');
  const [idCiudad, setIdCiudad] = useState('');
  const [estadio, setEstadio] = useState('');
  const [titulos, setTitulos] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  async function handleSubmit() {
    if (!nombre || !idCiudad) {
      Alert.alert('Faltan datos', 'Nombre y ciudad son obligatorios');
      return;
    }
    setSaving(true);
    const payload = { nombre, id_ciudad: Number(idCiudad), estadio, titulos: Number(titulos) || 0 };
    try {
      if (editingId) {
        await api.put(`/equipos/${editingId}`, payload);
      } else {
        await api.post('/equipos', payload);
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

  if (ciudades.length === 0) {
    return (
      <View style={styles.bg}>
        <Text style={styles.warning}>
          Primero crea al menos una ciudad (pestaña Ciudades) antes de agregar un equipo.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{editingId ? 'Editar equipo' : 'Agregar equipo'}</Text>

        <Text style={styles.label}>Nombre</Text>
        <InputField value={nombre} onChangeText={setNombre} placeholder="Nombre del equipo" />

        <Text style={styles.label}>Ciudad</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={idCiudad} onValueChange={setIdCiudad}>
            {ciudades.map((c) => (
              <Picker.Item key={c.id} label={c.nombre} value={String(c.id)} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Estadio</Text>
        <InputField value={estadio} onChangeText={setEstadio} placeholder="Nombre del estadio" />

        <Text style={styles.label}>Títulos locales</Text>
        <InputField value={titulos} onChangeText={setTitulos} placeholder="0" keyboardType="numeric" />

        <PrimaryButton
          title={editingId ? 'Guardar cambios' : 'Crear equipo'}
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
  pickerWrap: { backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, overflow: 'hidden' },
  warning: { color: '#fff', textAlign: 'center', marginTop: 60, paddingHorizontal: 30 },
});
