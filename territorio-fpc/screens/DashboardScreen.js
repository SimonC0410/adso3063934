import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

const CHART_H = 120;
const BAR_COLORS = ['#e53e3e', '#38a169', '#6b46c1', '#f6ad55', '#3b82f6', '#ec4899'];

// ── Bar chart con datos reales ─────────────────────────────────────────────
function BarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <View style={chart.wrapper}>
        <Text style={chart.title}>Títulos por equipo</Text>
        <Text style={chart.empty}>Sin datos de títulos</Text>
      </View>
    );
  }

  const maxVal = Math.max(...data.map(d => d.value), 1);
  // Y-axis ticks: 4 steps from 0 to maxVal
  const step = Math.ceil(maxVal / 4);
  const ticks = [step * 4, step * 3, step * 2, step];

  return (
    <View style={chart.wrapper}>
      <Text style={chart.title}>Títulos por equipo</Text>
      <View style={chart.body}>
        {/* Y-axis */}
        <View style={chart.yAxis}>
          {ticks.map(v => (
            <Text key={v} style={chart.yLabel}>{v}</Text>
          ))}
        </View>
        {/* Bars area */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[chart.barsArea, { width: Math.max(data.length * 56, 200) }]}>
            {ticks.map(v => (
              <View
                key={v}
                style={[chart.gridLine, { bottom: (v / (step * 4)) * CHART_H }]}
              />
            ))}
            <View style={chart.bars}>
              {data.map((d, i) => (
                <View key={d.label} style={chart.barCol}>
                  <Text style={chart.barNum}>{d.value}</Text>
                  <View
                    style={[
                      chart.bar,
                      {
                        height: Math.max((d.value / (step * 4)) * CHART_H, d.value > 0 ? 4 : 0),
                        backgroundColor: BAR_COLORS[i % BAR_COLORS.length],
                      },
                    ]}
                  />
                  <Text style={chart.xLabel} numberOfLines={2}>{d.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <Text style={chart.yTitle}>Títulos</Text>
    </View>
  );
}

// ── Main screen ────────────────────────────────────────────────────────────
export default function DashboardScreen({ navigation }) {
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [counts, setCounts] = useState({ equipos: 0, catA: 0, catB: 0, ciudades: 0 });
  const [chartData, setChartData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        try {
          const [eq, ci] = await Promise.all([
            api.get('/equipos'),
            api.get('/ciudades'),
          ]);
          if (!active) return;

          const equipos = eq.data ?? [];
          const ciudades = ci.data ?? [];

          setCounts({
            equipos: equipos.length,
            catA: equipos.filter(e => e.categoria === 'A').length,
            catB: equipos.filter(e => e.categoria === 'B').length,
            ciudades: ciudades.length,
          });

          // Gráfica: equipos con al menos 1 título, ordenados desc
          const conTitulos = equipos
            .filter(e => (e.titulos ?? 0) > 0)
            .sort((a, b) => b.titulos - a.titulos)
            .slice(0, 8) // máximo 8 barras para que quepa bien
            .map(e => ({ label: e.nombre, value: e.titulos }));

          setChartData(conTitulos);
        } catch (_) {}
      })();
      return () => { active = false; };
    }, [])
  );

  const stats = [
    { label: 'Total equipos', value: counts.equipos, bg: colors.gold,   textColor: '#0d1535' },
    { label: 'Primera A',     value: counts.catA,    bg: '#e53e3e',      textColor: '#fff'    },
    { label: 'Primera B',     value: counts.catB,    bg: '#38a169',      textColor: '#fff'    },
    { label: 'Ciudades',      value: counts.ciudades, bg: '#6b46c1',     textColor: '#fff'    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      {/* ── Navbar ── */}
      <View style={[styles.navbar, { paddingTop: 10 + insets.top }]}> 
        {/* Cambia la ruta del logo según donde tengas el archivo */}
        <Image
          source={require('../assets/logo.png')} // <- reemplaza con require('../assets/logo.png')
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Pills ── */}
        <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('EquiposTab')} activeOpacity={0.8}>
          <Text style={styles.pillText}>ver equipos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('CiudadesTab')} activeOpacity={0.8}>
          <Text style={styles.pillText}>ver ciudades</Text>
        </TouchableOpacity>

        {/* ── Stat grid ── */}
        <View style={styles.grid}>
          {stats.map(s => (
            <View key={s.label} style={[styles.stat, { backgroundColor: s.bg }]}>
              <Text style={[styles.statNum,   { color: s.textColor }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: s.textColor }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Chart ── */}
        <BarChart data={chartData} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gold,
    backgroundColor: colors.dark,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  logoutBtn: {
    backgroundColor: colors.gold,
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
  },
  logoutText: { color: '#0d1535', fontWeight: '700', fontSize: 14 },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  pill: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  pillText: { color: '#0d1535', fontSize: 15, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 10, marginBottom: 24 },
  stat: {
    width: '47%',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNum:   { fontSize: 28, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
});

const chart = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    paddingLeft: 44,
    paddingBottom: 32,
    position: 'relative',
    minHeight: 180,
  },
  title: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', textAlign: 'center', marginBottom: 10 },
  empty: { textAlign: 'center', color: '#999', marginTop: 20, fontSize: 13 },
  body:  { flexDirection: 'row', alignItems: 'flex-end' },
  yAxis: {
    position: 'absolute',
    left: 2,
    top: 36,
    bottom: 32,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 36,
  },
  yLabel: { fontSize: 9, color: '#666' },
  yTitle: {
    position: 'absolute',
    left: -18,
    top: '50%',
    fontSize: 9,
    color: '#666',
    transform: [{ rotate: '-90deg' }],
    width: 70,
    textAlign: 'center',
  },
  barsArea: {
    height: CHART_H + 40,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_H,
    paddingBottom: 0,
  },
  barCol:  { alignItems: 'center', width: 52, marginHorizontal: 2 },
  barNum:  { fontSize: 9, color: '#444', marginBottom: 2 },
  bar:     { width: 30, borderRadius: 3 },
  xLabel:  { fontSize: 8, color: '#444', marginTop: 4, textAlign: 'center', width: 52 },
});