
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSignIn, useSignUp, useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

import api from '../utils/api';

export default function AuthScreen() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)/map');
    }
  }, [isSignedIn, router]);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
    React.useEffect(() => {
      // Log login status in terminal
      // eslint-disable-next-line no-console
      console.log('User logged in:', isSignedIn);
    }, [isSignedIn]);
  const signIn = useSignIn();
  const signUp = useSignUp();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      if (!signIn.isLoaded) throw new Error('SignIn not loaded');
      const res = await signIn.signIn.create({ identifier: email, password });
      if (res.status === 'complete') {
        await signIn.setActive({ session: res.createdSessionId });
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

  const registerUserInBackend = async (clerkId: string, name: string, email: string) => {
    try {
      await api.post('/api/users', {
        clerk_id: clerkId,
        name,
        email
      });
    } catch {
      // Optionally handle error
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      if (!signUp.isLoaded) throw new Error('SignUp not loaded');
      const res = await signUp.signUp.create({ emailAddress: email, password });
      if (res.status === 'complete') {
        await signUp.setActive({ session: res.createdSessionId });
        // Register user in backend with entered name/email
        await registerUserInBackend(res.createdUserId || user?.id || '', name, email);
      } else if (res.status === 'missing_requirements') {
        await signUp.signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setPendingVerification(true);
      } else {
        setError('Sign up failed.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || err?.message || 'Sign up error');
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      if (!signUp.isLoaded) throw new Error('SignUp not loaded');
      const res = await signUp.signUp.attemptEmailAddressVerification({ code: verificationCode });
      if (res.status === 'complete') {
        await signUp.setActive({ session: res.createdSessionId });
        setPendingVerification(false);
        // Register user in backend after verification with correct name/email
        await registerUserInBackend(res.createdUserId || user?.id || '', name, email);
      } else {
        setError('Verification failed.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || err?.message || 'Verification error');
    }
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#b8edf6ff", "#96d3eaff", "#3aafd9ff"]} style={styles.gradientBg}>
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
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
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
          {pendingVerification && !isLogin ? (
            <>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Verification Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter code from email"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={[styles.loginBtn, loading && { opacity: 0.7 }]}
                onPress={handleVerify}
                disabled={loading || !verificationCode}
              >
                <Text style={styles.loginBtnText}>Verify</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.loginBtn, loading && { opacity: 0.7 }]}
              onPress={isLogin ? handleLogin : handleSignUp}
              disabled={loading}
            >
              <Text style={styles.loginBtnText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: '#59bbf5ff',
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
    backgroundColor: '#59bbf5ff',
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
