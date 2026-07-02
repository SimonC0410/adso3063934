import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';
import SweetAlert from '../components/SweetAlert';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    const normalizedUsername = username.trim();
    const normalizedPassword = password.trim();

    if (!normalizedUsername || !normalizedPassword) {
      Alert.alert('Faltan datos', 'Ingresa usuario y contraseña');
      return;
    }
    if (normalizedPassword !== confirm.trim()) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await register(normalizedUsername, normalizedPassword);
      setShowSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.error || 'No se pudo registrar';
      console.error('Register screen error:', msg);
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <SafeAreaView style={styles.bg}>
      <KeyboardAvoidingView
        style={styles.content}
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
        <SweetAlert
          visible={showSuccess}
          title="Listo"
          message="Usuario registrado, ahora inicia sesión"
          onConfirm={() => {
            setShowSuccess(false);
            navigation.navigate('Login');
          }}
        />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.dark },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
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
