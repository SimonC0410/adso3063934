import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!username || !password) {
      Alert.alert('Faltan datos', 'Ingresa usuario y contraseña');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      await register(username, password);
      Alert.alert('Listo', 'Usuario registrado, ahora inicia sesión', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (err) {
      const msg = err.response?.data?.error || 'No se pudo registrar';
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
        <Text style={styles.title}>REGISTER</Text>
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
        <InputField
          placeholder="Repeat Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
        <PrimaryButton title="Register" onPress={handleRegister} loading={loading} style={{ marginTop: 10 }} />
        <Text style={styles.alt} onPress={() => navigation.navigate('Login')}>
          ¿Ya tienes cuenta? Inicia sesión
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
