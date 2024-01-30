import supabaseClient from '../api/SupabaseClient';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_TRANSACTION":
            return action.payload;
        default:
            return state;
    }
};

const getTransactions = (dispath) => {
    return async () => {
        const { data, error } = await supabaseClient
            .from('transactions')
            .select();

        console.log(data);

        dispath({
            type: "GET_ALL_TRANSACTION",
            payload: { data: data.data, errorMessage: error?.message ?? "" }
        });
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    { getTransactions },
    { data: [], errorMessage: null });

