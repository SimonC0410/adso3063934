import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField(props) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor="#999"
      {...props}
    />
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
});
