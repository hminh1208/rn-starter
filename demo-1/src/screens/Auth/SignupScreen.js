import React, {useState} from 'react';
import {
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const SignUpScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Call API to submit form data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff'
    },
    title: {
      fontSize: 36, 
      fontWeight: 'bold',
      marginBottom: 24
    },
    input: {
      backgroundColor: '#f2f2f2',
      padding: 12,
      marginBottom: 16,
      borderRadius: 4 
    },
    button: {
      backgroundColor: '#008bff',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center' 
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600'
    }
  });

export default SignUpScreen;