import supabaseClient from '../api/SupabaseClient';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_CATEGORY":
            return action.payload;
        default:
            return state;
    }
};

const getCategories = (dispath) => {
    return async () => {
        const { data, error } = await supabaseClient
            .from('categories')
            .select();

        dispath({
            type: "GET_ALL_CATEGORY",
            payload: { data: data.data, errorMessage: error.message }
        });
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    { getCategories },
    { data: [], errorMessage: null });

