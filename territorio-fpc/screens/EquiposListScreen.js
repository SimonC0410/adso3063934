import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/client';
import { API_URL } from '../config';
import InitialsCircle from '../components/InitialsCircle';
import { colors } from '../theme';

const PAGE_SIZE = 6;
const CATEGORIAS = [
  { label: 'Todas', value: null },
  { label: 'Primera A', value: 'A' },
  { label: 'Primera B', value: 'B' },
];

function getImageUrl(imagenField) {
  if (!imagenField) return null;
  if (imagenField.startsWith('http')) return imagenField;
  return `${API_URL}${imagenField.startsWith('/') ? '' : '/'}${imagenField}`;
}

function EquipoCard({ item, onPress }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(item.imagen);
  const hasImg = Boolean(imageUrl) && !imgError;

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
        <InitialsCircle name={item.nombre} size={110} />
      )}
      <Text style={card.label} numberOfLines={1}>{item.nombre}</Text>
    </TouchableOpacity>
  );
}

const card = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', marginVertical: 12, marginHorizontal: 6 },
  img: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: colors.gold,
    backgroundColor: '#fff',
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

export default function EquiposListScreen({ navigation }) {
  const [equipos, setEquipos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [categoria, setCategoria] = useState(null); // null = todas
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/equipos')
      .then((res) => {
        const payload = Array.isArray(res.data)
          ? res.data
          : res.data?.equipos ?? res.data?.data ?? [];
        setEquipos(Array.isArray(payload) ? payload : []);
        setPage(0);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleSearch = (text) => { setSearch(text); setPage(0); };

  const selectCategoria = (value) => {
    setCategoria(value);
    setPage(0);
    setDropdownOpen(false);
  };

  const filtered = equipos.filter((e) => {
    const matchesSearch = e.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesCategoria = categoria ? e.categoria === categoria : true;
    return matchesSearch && matchesCategoria;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const selectedLabel = CATEGORIAS.find((c) => c.value === categoria)?.label ?? 'categoria';

  return (
    <SafeAreaView style={styles.root}>

      {/* ── Buscador ── */}
      <TextInput
        style={styles.search}
        placeholder="Buscar equipo..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={handleSearch}
      />

      {/* ── Título + filtro por categoría ── */}
      <View style={styles.topRow}>
        <View style={styles.fabCenterWrap} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('EquipoForm')}
            activeOpacity={0.85}
          >
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.brand}>FPC</Text>

        <View style={styles.filterWrap}>
          <View>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setDropdownOpen((v) => !v)}
              activeOpacity={0.85}
            >
              <Text style={styles.selectText}>{selectedLabel}</Text>
              <Text style={styles.selectArrow}>{dropdownOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {dropdownOpen && (
              <View style={styles.dropdown}>
                {CATEGORIAS.map((c) => (
                  <TouchableOpacity
                    key={c.label}
                    style={[
                      styles.dropdownItem,
                      categoria === c.value && styles.dropdownItemActive,
                    ]}
                    onPress={() => selectCategoria(c.value)}
                  >
                    <Text style={styles.dropdownItemText}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
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
          <Text style={styles.empty}>No hay equipos todavía</Text>
        }
        renderItem={({ item }) => (
          <EquipoCard
            item={item}
            onPress={() => navigation.navigate('EquipoDetail', { id: item.id })}
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

    </SafeAreaView>
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

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
    position: 'relative',
  },
  brand: { color: '#fff', fontSize: 26, fontWeight: '800' },

  filterWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  fab: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { fontSize: 20, fontWeight: '700', color: '#0d1535', lineHeight: 24 },

  fabCenterWrap: {
    position: 'absolute',
    left: '50%',
    marginLeft: -20,
    top: 6,
    zIndex: 20,
  },

  select: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2e50',
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  selectText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  selectArrow: { color: colors.gold, fontSize: 10 },

  dropdown: {
    position: 'absolute',
    top: 34,
    right: 0,
    backgroundColor: '#1a2e50',
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 120,
    elevation: 8,
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 10 },
  dropdownItemActive: { backgroundColor: colors.gold },
  dropdownItemText: { color: '#fff', fontSize: 13, fontWeight: '600' },

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