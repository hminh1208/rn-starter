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
            .from('Category')
            .select()
            .eq('deleted', false)
            .order('is_income', { ascending: false })
            .order('name', { ascending: true });

        dispath({
            type: "GET_ALL_CATEGORY",
            payload: { data: data ?? [], errorMessage: error?.message }
        });
    }
}

const deleteCategory = (dispath) => {
    return async (id) => {
        const { error } = await supabaseClient
            .from('Category')
            .update({ deleted: true })
            .eq('id', id);
    }
}

const saveCategory = (dispath) => {
    return async (category, navigation) => {
        const { error } = await supabaseClient
            .from('Category')
            .update({ name: category.name, is_income: category.is_income })
            .eq('id', category.id);

        navigation.goBack();
    }
}

const createCategory = (dispath) => {
    return async (name, isIncome, navigation) => {
        const userId = (await supabaseClient.auth.getUser()).data.user.id;

        const { error } = await supabaseClient
            .from('Category')
            .insert({ name: name, is_income: isIncome, user_id: userId });

        navigation.goBack();
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { getCategories, deleteCategory, saveCategory, createCategory },
    { data: [], errorMessage: null });

