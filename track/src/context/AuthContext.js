import supabaseClient from '../api/SupabaseClient';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGN_UP":
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
                errorMessage: action.payload.errorMessage
            };
        case "SIGN_IN":
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
                errorMessage: action.payload.errorMessage
            };
        case "SIGN_OUT":
            return {
                ...state,
                isSignedIn: false
            };
        default:
            return state;
    }
};

const signup = (dispath) => {
    return async ({ email, password }) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email.trim(),
            password: password,
        });

        dispath({
            type: "SIGN_UP",
            payload: { isSignedIn: (data ? false : true), errorMessage: error?.message }
        });
    }
}

const signin = (dispath) => {
    return async ({ email, password }) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password,
        });

        dispath({
            type: "SIGN_IN",
            payload: { isSignedIn: (data?.session?.access_token ? false : true), errorMessage: error?.message }
        });
    }
}

const signout = (dispath) => {
    return () => {
        supabaseClient.auth.signOut();

        dispath({ type: "SIGN_OUT" });
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { isSignedIn: false });

