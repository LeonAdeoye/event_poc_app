import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
}

const orderDialogSlice = createSlice({
    name: 'orderDialog',
    initialState: initialState,
    reducers: {
        openOrderDialog: (state) =>
        {
            state.isOpen = true;
        },
        closeOrderDialog: (state) => {
            state.isOpen = false;
        }
    }
});

export default orderDialogSlice.reducer;
export const { openOrderDialog, closeOrderDialog } = orderDialogSlice.actions;
