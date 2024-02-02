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
    return async (fFromDate, fToDate, fCategoryId) => {
        let query = supabaseClient
            .from('Category')
            .select('id, name, Transaction(*)')
            .eq('deleted', false);

        console.log(fFromDate, fToDate, fCategoryId);

        if (fFromDate) {
            query = query.gte('Transaction.transaction_date', fFromDate.format("yyyy-MM-DD"))
        }

        if (fToDate) {
            query = query.lte('Transaction.transaction_date', fToDate.format("yyyy-MM-DD"))
        }

        if (fCategoryId) {
            query = query.eq('id', fCategoryId);
        }

        const { data, error } = await query;

        console.log(data);
        console.log(error);

        dispath({
            type: "GET_ALL_TRANSACTION",
            payload: { data: data ?? [], errorMessage: error?.message ?? "" }
        });
    }
}

const createTransaction = (dispatch) => {
    return async (transaction, navigation) => {
        const userId = (await supabaseClient.auth.getUser()).data.user.id;

        const { data, error } = await supabaseClient
            .from('Transaction')
            .insert({ ...transaction, user_id: userId, deleted: false });

        console.log(error);

        navigation.goBack();
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { getTransactions, createTransaction },
    { data: [], errorMessage: null });

