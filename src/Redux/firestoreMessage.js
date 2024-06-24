import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: 'firestoreMessage',
    initialState: {
        message: null,
        isSuccess: false,
    },
    reducers: {

        setUniversalMessage: (state, action) => {
            const { message, isSuccess } = action.payload;
            state.message = message;
            state.isSuccess = isSuccess;
        },
        clearMessage(state) {
            state.message = '';
            state.isSuccess = false;
          },
    },
});
export const { setUniversalMessage,clearMessage } = errorSlice.actions;
export default errorSlice.reducer;
