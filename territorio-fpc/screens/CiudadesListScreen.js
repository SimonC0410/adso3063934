import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';
import { API_URL } from '../config';
import { colors } from '../theme';

const PAGE_SIZE = 6;

function getImageUrl(imagenField) {
  if (!imagenField) return null;
  if (imagenField.startsWith('http')) return imagenField;
  return `${API_URL}${imagenField.startsWith('/') ? '' : '/'}${imagenField}`;
}

function InitialsBubble({ name, size = 110 }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <View style={[bubble.wrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={bubble.text}>{initials}</Text>
    </View>
  );
}

const bubble = StyleSheet.create({
  wrap: { backgroundColor: '#1a2e50', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 26, fontWeight: '700' },
});

function CiudadCard({ item, onPress }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(item.imagen);
  const hasImg = imageUrl && !imgError;

  return (
    <TouchableOpacity style={card.wrap} onPress={onPress} activeOpacity={0.85}>
      {hasImg ? (
        <Image
          source={{ uri: imageUrl }}
          style={card.img}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <InitialsBubble name={item.nombre} />
      )}
      <Text style={card.label} numberOfLines={1}>{item.nombre}</Text>
    </TouchableOpacity>
  );
}

const card = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', marginVertical: 12, marginHorizontal: 6 },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.gold,
  },
  label: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 120,
  },
});

export default function CiudadesListScreen({ navigation }) {
  const [ciudades, setCiudades] = useState([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [page, setPage]         = useState(0);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/ciudades')
      .then((res) => {
        console.log('✓ GET /ciudades success:', res.data);
        const data = Array.isArray(res.data) ? res.data : [];
        setCiudades(data);
        setPage(0);
      })
      .catch((err) => {
        console.error('✗ GET /ciudades error:', err.response?.status, err.response?.data || err.message);
        setCiudades([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleSearch = (text) => { setSearch(text); setPage(0); };

  const filtered = ciudades.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData   = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <View style={styles.root}>

      {/* ── Buscador ── */}
      <TextInput
        style={styles.search}
        placeholder="Buscar ciudad..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={handleSearch}
      />

      {/* ── Botón + centrado en su propia fila ── */}
      <View style={styles.fabRow}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('CiudadForm')}
          activeOpacity={0.85}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* ── Grid ── */}
      <FlatList
        data={pageData}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.list}
        onRefresh={load}
        refreshing={loading}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay ciudades todavía</Text>
        }
        renderItem={({ item }) => (
          <CiudadCard
            item={item}
            onPress={() => navigation.navigate('CiudadDetail', { id: item.id })}
          />
        )}
      />

      {/* ── Paginación ── */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={[styles.arrowBtn, page === 0 && styles.arrowDisabled]}
        >
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          {totalPages > 0 ? `${page + 1} / ${totalPages}` : '—'}
        </Text>

        <TouchableOpacity
          onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          style={[styles.arrowBtn, page >= totalPages - 1 && styles.arrowDisabled]}
        >
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },

  search: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
    fontSize: 13,
  },

  fabRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: { fontSize: 26, fontWeight: '700', color: '#0d1535', lineHeight: 30 },

  list: { paddingHorizontal: 14, paddingBottom: 10 },
  empty: { color: '#aaa', textAlign: 'center', marginTop: 40 },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a2e50',
  },
  arrowBtn: { padding: 8 },
  arrowDisabled: { opacity: 0.3 },
  arrow: { color: '#fff', fontSize: 24, fontWeight: '700' },
  pageIndicator: { color: '#aaa', fontSize: 13 },
});