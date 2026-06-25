import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function DashboardScreen({ navigation }) {
  const { username, logout } = useAuth();
  const [counts, setCounts] = useState({ equipos: 0, ciudades: 0 });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        try {
          const [eq, ci] = await Promise.all([api.get('/equipos'), api.get('/ciudades')]);
          if (active) setCounts({ equipos: eq.data.length, ciudades: ci.data.length });
        } catch (e) {
          // si falla, se quedan los contadores en 0, sin romper la pantalla
        }
      })();
      return () => { active = false; };
    }, [])
  );

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.content}>
      <Text style={styles.welcome}>Hola, {username} 👋</Text>

      <PrimaryButton title="Ver equipos" variant="navy" onPress={() => navigation.navigate('EquiposTab')} />
      <PrimaryButton title="Ver ciudades" variant="navy" onPress={() => navigation.navigate('CiudadesTab')} />

      <View style={styles.grid}>
        <View style={[styles.stat, { backgroundColor: colors.gold }]}>
          <Text style={styles.statNum}>{counts.equipos}</Text>
          <Text style={styles.statLabel}>Total equipos</Text>
        </View>
        <View style={[styles.stat, { backgroundColor: colors.danger }]}>
          <Text style={[styles.statNum, { color: '#fff' }]}>{counts.ciudades}</Text>
          <Text style={[styles.statLabel, { color: '#fff' }]}>Total ciudades</Text>
        </View>
      </View>

      <PrimaryButton title="Cerrar sesión" variant="danger" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark },
  content: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  welcome: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 20 },
  grid: { flexDirection: 'row', gap: 14, marginVertical: 20 },
  stat: { flex: 1, borderRadius: 14, padding: 18, alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: '800', color: '#0d1535' },
  statLabel: { fontSize: 13, fontWeight: '600', color: '#0d1535', marginTop: 4 },
});
