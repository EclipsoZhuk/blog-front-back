import { createSlice } from '@reduxjs/toolkit';
import { fetchRegister, fetchUser, fetchUserMe } from '../operations/auth.js';

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null;
        },
    },
    extraReducers: {
        // Login
        [fetchUser.pending]: state => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = 'loaded';
        },
        [fetchUser.rejected]: state => {
            state.data = null;
            state.status = 'error';
        },

        // Me
        [fetchUserMe.pending]: state => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchUserMe.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = 'loaded';
        },
        [fetchUserMe.rejected]: state => {
            state.data = null;
            state.status = 'error';
        },

        // Register
        [fetchRegister.pending]: state => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchRegister.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = 'loaded';
        },
        [fetchRegister.rejected]: state => {
            state.data = null;
            state.status = 'error';
        },
    },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
