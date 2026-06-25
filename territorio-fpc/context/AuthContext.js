import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al abrir la app, revisa si ya había sesión guardada
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUsername] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('username'),
        ]);
        if (storedToken) setToken(storedToken);
        if (storedUsername) setUsername(storedUsername);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function login(user, password) {
    const { data } = await api.post('/login', { username: user, password });
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('username', user);
    setToken(data.token);
    setUsername(user);
  }

  async function register(user, password) {
    await api.post('/register', { username: user, password });
  }

  async function logout() {
    await AsyncStorage.multiRemove(['token', 'username']);
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
