import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function InputField({ style, secureTextEntry, ...props }) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style, secureTextEntry ? { paddingRight: 48 } : null]}
        placeholderTextColor="#999"
        secureTextEntry={hidden}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setHidden(!hidden)}
          activeOpacity={0.7}
          style={styles.eye}
        >
          <Text style={styles.eyeText}>{hidden ? '👁' : '🙈'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 13,
    fontSize: 14,
    color: '#111',
    marginBottom: 14,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    right: 14,
    top: 12,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeText: {
    fontSize: 18,
  },
});
