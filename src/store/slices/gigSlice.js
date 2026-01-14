import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
    gigs: [],
    gig: null,
    loading: false,
    error: null,
    success: false,
};

export const fetchGigs = createAsyncThunk(
    'gigs/fetchAll',
    async (keyword = '', { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/gigs?keyword=${keyword}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const createGig = createAsyncThunk(
    'gigs/create',
    async (gigData, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`, // Note: We use HTTP Only cookie, but good practice to have auth header if needed, though middleware checks cookie. Actually middleware checks cookie. logic: token = req.cookies.jwt
                },
            };

            // Since we use cookies, we don't strictly need the Authorization header if the backend checks cookies.
            // However, usually axios needs { withCredentials: true } for cookies to be sent.
            // I added proxy in vite.config.js, so same origin should work.
            // But verify global axios config.

            const { data } = await api.post('/gigs', gigData, config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const fetchGigById = createAsyncThunk(
    'gigs/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/gigs/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const fetchMyGigs = createAsyncThunk(
    'gigs/fetchMyGigs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/gigs/my');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

const gigSlice = createSlice({
    name: 'gigs',
    initialState,
    reducers: {
        resetGigState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.gig = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGigs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGigs.fulfilled, (state, action) => {
                state.loading = false;
                state.gigs = action.payload;
            })
            .addCase(fetchGigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createGig.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createGig.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.gigs.unshift(action.payload);
            })
            .addCase(createGig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyGigs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyGigs.fulfilled, (state, action) => {
                state.loading = false;
                state.gigs = action.payload;
            })
            .addCase(fetchMyGigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchGigById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGigById.fulfilled, (state, action) => {
                state.loading = false;
                state.gig = action.payload;
            })
            .addCase(fetchGigById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetGigState } = gigSlice.actions;

export default gigSlice.reducer;
