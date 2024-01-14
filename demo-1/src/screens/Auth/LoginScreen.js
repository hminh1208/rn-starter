import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import supabaseClient from "../../services/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (data.session != null) {
            await AsyncStorage.setItem(
                "refresh_token",
                `${data.session.refresh_token}`
            );

            await AsyncStorage.setItem(
                "access_token",
                data.session.access_token
            );

            props.navigation.navigate("Home");
        } else {
            Toast.show({
                type: "error",
                text1: `${error.toJSON().name}`,
                text2: `${error.toJSON().message}`,
            });
        }
    };

    const handleNavigateSignup = () => {
        props.navigation.navigate("Signup");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateSignup}
            >
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <Toast config={toastConfig} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        backgroundColor: "#f2f2f2",
        padding: 12,
        marginBottom: 16,
        borderRadius: 4,
    },
    button: {
        backgroundColor: "#008bff",
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

const toastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "pink" }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: "400",
            }}
        />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17,
            }}
            text2Style={{
                fontSize: 15,
            }}
        />
    ),
    /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    ),
};

export default LoginScreen;
