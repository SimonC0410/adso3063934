import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EquiposListScreen from '../screens/EquiposListScreen';
import EquipoDetailScreen from '../screens/EquipoDetailScreen';
import EquipoFormScreen from '../screens/EquipoFormScreen';
import CiudadesListScreen from '../screens/CiudadesListScreen';
import CiudadDetailScreen from '../screens/CiudadDetailScreen';
import CiudadFormScreen from '../screens/CiudadFormScreen';

import TopNavbar from '../components/TopNavbar';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

const AuthStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const EquiposStack = createNativeStackNavigator();
const CiudadesStack = createNativeStackNavigator();

function EquiposStackNavigator() {
  return (
    <EquiposStack.Navigator
      screenOptions={{
        header: (props) => <TopNavbar {...props} active="Equipos" />,
      }}
    >
      <EquiposStack.Screen name="EquiposList" component={EquiposListScreen} options={{ title: 'Equipos' }} />
      <EquiposStack.Screen name="EquipoDetail" component={EquipoDetailScreen} options={{ title: 'Equipo' }} />
      <EquiposStack.Screen name="EquipoForm" component={EquipoFormScreen} options={{ title: 'Equipo' }} />
    </EquiposStack.Navigator>
  );
}

function CiudadesStackNavigator() {
  return (
    <CiudadesStack.Navigator
      screenOptions={{
        header: (props) => <TopNavbar {...props} active="Ciudades" />,
      }}
    >
      <CiudadesStack.Screen name="CiudadesList" component={CiudadesListScreen} options={{ title: 'Ciudades' }} />
      <CiudadesStack.Screen name="CiudadDetail" component={CiudadDetailScreen} options={{ title: 'Ciudad' }} />
      <CiudadesStack.Screen name="CiudadForm" component={CiudadFormScreen} options={{ title: 'Ciudad' }} />
    </CiudadesStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="DashboardTab" component={DashboardScreen} options={{ title: 'Inicio' }} />
      <Tabs.Screen name="EquiposTab" component={EquiposStackNavigator} options={{ title: 'Equipos' }} />
      <Tabs.Screen name="CiudadesTab" component={CiudadesStackNavigator} options={{ title: 'Ciudades' }} />
    </Tabs.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default function AppNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.dark, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  return <NavigationContainer>{token ? <MainTabs /> : <AuthStackNavigator />}</NavigationContainer>;
}