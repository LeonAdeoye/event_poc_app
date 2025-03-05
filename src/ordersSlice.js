import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    orders: [],
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        addOrder: (state, action) =>
        {
            state.orders.push(action.payload);
        },
        clearAll: (state) => {
            state.orders = [];
        }
    }
});

export default ordersSlice.reducer;
export const { addOrder, clearAll } = ordersSlice.actions;
