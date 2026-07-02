import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function TopNavbar({ navigation, active }) {
  const { logout } = useAuth();

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {/* Logo */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Pills */}
        <View style={styles.pills}>
          <TouchableOpacity
            style={[styles.pill, active === 'Dashboard' ? styles.pillActive : styles.pillInactive]}
            onPress={() => navigation.navigate('DashboardTab')}
          >
            <Text style={[styles.pillText, active === 'Dashboard' && styles.pillTextActive]}>
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pill, active === 'Ciudades' ? styles.pillActive : styles.pillInactive]}
            onPress={() => navigation.navigate('CiudadesTab')}
          >
            <Text style={[styles.pillText, active === 'Ciudades' && styles.pillTextActive]}>
              Ciudades
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pill, active === 'Equipos' ? styles.pillActive : styles.pillInactive]}
            onPress={() => navigation.navigate('EquiposTab')}
          >
            <Text style={[styles.pillText, active === 'Equipos' && styles.pillTextActive]}>
              Equipos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.dark,
    paddingTop: 18,
    paddingBottom: 6,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    minHeight: 90,
    flexWrap: 'nowrap',
  },
  logo: {
    width: 42,
    height: 42,
    marginRight: 6,
    borderRadius: 34 / 2,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.navy,
  },

  pills: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 4,
    flexShrink: 1,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 18,
    minHeight: 36,
    justifyContent: 'center',
  },
  pillActive: { backgroundColor: colors.gold },
  pillInactive: { backgroundColor: '#1a2e50' },
  pillText: { fontSize: 11.5, fontWeight: '700', color: '#fff' },
  pillTextActive: { color: '#0d1535' },

  logoutBtn: {
    backgroundColor: colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginLeft: 4,
    minHeight: 36,
    justifyContent: 'center',
  },
  logoutText: { color: '#0d1535', fontWeight: '700', fontSize: 12 },

  divider: { height: 1, backgroundColor: colors.gold, opacity: 0.4 },
});