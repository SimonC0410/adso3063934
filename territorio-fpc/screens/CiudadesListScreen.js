import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';
import InitialsCircle from '../components/InitialsCircle';
import { colors } from '../theme';

export default function CiudadesListScreen({ navigation }) {
  const [ciudades, setCiudades] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get('/ciudades')
      .then((res) => setCiudades(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const filtered = ciudades.filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ciudades</Text>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CiudadForm')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Buscar ciudad..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.list}
        onRefresh={load}
        refreshing={loading}
        ListEmptyComponent={<Text style={styles.empty}>No hay ciudades todavía</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('CiudadDetail', { id: item.id })}
          >
            <InitialsCircle name={item.nombre} bg="#27496d" />
            <Text style={styles.itemLabel} numberOfLines={1}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 2,
    borderColor: colors.gold,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  fab: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  fabText: { fontSize: 22, fontWeight: '700', color: '#0d1535' },
  search: { backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 16, paddingVertical: 10, margin: 16, fontSize: 13 },
  list: { paddingHorizontal: 16, paddingBottom: 30 },
  item: { flex: 1, alignItems: 'center', margin: 10 },
  itemLabel: { color: '#fff', marginTop: 8, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  empty: { color: colors.w40, textAlign: 'center', marginTop: 40 },
});
