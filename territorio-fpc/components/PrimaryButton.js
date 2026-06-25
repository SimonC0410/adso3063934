import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme';

export default function PrimaryButton({ title, onPress, loading, style, variant = 'gold' }) {
  const bg = variant === 'danger' ? colors.danger : variant === 'navy' ? colors.navy : colors.gold;
  const textColor = variant === 'gold' ? '#0d1535' : '#fff';

  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bg }, variant === 'navy' && styles.navyBorder, style]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  navyBorder: {
    borderWidth: 1,
    borderColor: colors.w40,
  },
  text: { fontSize: 15, fontWeight: '700' },
});
