import React, {
  useContext,
  useState,
} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Input,
  Text,
} from 'react-native-elements';

import Spacer from '../components/spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { state, signup } = useContext(AuthContext);

    return (
        <>
            <View
                style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginBottom: 200 }}>
                <Spacer >
                    <Text
                        h3
                        style={{ textAlign: 'center' }}>
                        Sign Up
                    </Text>
                </Spacer>
                <Input
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={false} />
                <Spacer />
                <Input
                    label='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    autoCorrect={false} />

                {state.errorMessage ? <Text h5 style={{ color: 'red', marginHorizontal: 10, fontSize: 16 }}>{state.errorMessage}</Text> : null}

                <Spacer >
                    <Button
                        title='Sign Up'
                        onPress={() => signup({ email, password })} />
                </Spacer>

                <Spacer >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')} >
                        <Text style={{ fontSize: 16, color: 'blue', textAlign: 'center' }}>Already have an account? Sign In instead</Text>
                    </TouchableOpacity>
                </Spacer>
            </View>
        </>
    )
}

const styles = StyleSheet.create({})

export default SignUpScreen
