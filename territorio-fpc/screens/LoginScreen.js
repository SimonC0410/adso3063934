import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert('Faltan datos', 'Ingresa usuario y contraseña');
      return;
    }
    setLoading(true);
    try {
      await login(username, password);
      // El RootNavigator cambia de pantalla solo al detectar el token
    } catch (err) {
      const msg = err.response?.data?.error || 'No se pudo iniciar sesión';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.bg}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>LOGIN</Text>
        <InputField
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PrimaryButton title="Sign in" onPress={handleLogin} loading={loading} />
        <Text style={styles.alt} onPress={() => navigation.navigate('Register')}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.navy,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: 32,
    padding: 28,
  },
  title: { fontSize: 32, fontWeight: '700', letterSpacing: 4, textAlign: 'center', marginBottom: 28, color: '#fff' },
  alt: { textAlign: 'center', fontSize: 13, color: '#fff', marginTop: 4 },
});
