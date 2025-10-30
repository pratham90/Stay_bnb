
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSignIn, useSignUp, useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)');
    }
  }, [isSignedIn]);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const signUp = useSignUp();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      if (!signIn.isLoaded) throw new Error('SignIn not loaded');
      const res = await signIn.signIn.create({ identifier: email, password });
      if (res.status === 'complete') {
        // Only set active if not already active
        if (signIn.sessionId !== res.createdSessionId) {
          await signIn.setActive({ session: res.createdSessionId });
        }
      } else {
        setError('Login failed.');
      }
    } catch (err: any) {
      // If error is session already exists, ignore and continue
      if (err?.message?.includes('session already exists')) {
        setError('You are already logged in.');
      } else {
        setError(err?.errors?.[0]?.message || err?.message || 'Login error');
      }
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      if (!signUp.isLoaded) throw new Error('SignUp not loaded');
      const res = await signUp.signUp.create({ emailAddress: email, password });
      if (res.status === 'complete') {
        await signUp.setActive({ session: res.createdSessionId });
      } else {
        setError('Sign up failed.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || err?.message || 'Sign up error');
    }
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#06b6d4", "#14b8a6"]} style={styles.gradientBg}>
      <View style={styles.logoWrap}>
        <View style={styles.logoCircle}>
          <Image source={require('../assets/images/icon.png')} style={styles.logoIcon} />
        </View>
        <Text style={styles.appName}>StayNest</Text>
        <Text style={styles.appTag}>Find your perfect stay</Text>
      </View>
      <View style={styles.authCard}>
        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.tabBtn, isLogin && styles.tabActive]} onPress={() => setIsLogin(true)}>
            <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabBtn, !isLogin && styles.tabActive]} onPress={() => setIsLogin(false)}>
            <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12 }}>
          {!isLogin && (
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.loginBtn, loading && { opacity: 0.7 }]}
            onPress={isLogin ? handleLogin : handleSignUp}
            disabled={loading}
          >
            <Text style={styles.loginBtnText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 15,
    color: '#888',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  loginBtn: {
    backgroundColor: '#14b8a6',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gradientBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  appTag: {
    color: '#e0f2fe',
    fontSize: 15,
    marginBottom: 8,
  },
  authCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: '#14b8a6',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
  },
  termsText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 18,
  },
});
