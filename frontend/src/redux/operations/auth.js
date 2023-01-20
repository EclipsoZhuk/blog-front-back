import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUser = createAsyncThunk('auth/fetchUser', async params => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchUserMe = createAsyncThunk('auth/fetchUserMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async params => {
        const { data } = await axios.post('/auth/register', params);
        return data;
    },
);
