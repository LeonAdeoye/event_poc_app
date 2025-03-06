import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
}

const orderDialogSlice = createSlice({
    name: 'orderDialog',
    initialState: initialState,
    reducers: {
        open: (state) =>
        {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        }
    }
});

export default orderDialogSlice.reducer;
export const { open, close } = orderDialogSlice.actions;
