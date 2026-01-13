import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    bids: [],
    loading: false,
    error: null,
    success: false,
};

export const placeBid = createAsyncThunk(
    'bids/placeBid',
    async ({ gigId, amount, message }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/bids', { gigId, amount, message });
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

export const fetchBidsByGig = createAsyncThunk(
    'bids/fetchByGig',
    async (gigId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/bids/${gigId}`);
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

export const hireFreelancer = createAsyncThunk(
    'bids/hire',
    async (bidId, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/api/bids/${bidId}/hire`);
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

export const fetchMyBids = createAsyncThunk(
    'bids/fetchMyBids',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/bids/my');
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

const bidSlice = createSlice({
    name: 'bids',
    initialState,
    reducers: {
        resetBidState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Place Bid
            .addCase(placeBid.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(placeBid.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(placeBid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Bids
            .addCase(fetchBidsByGig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBidsByGig.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchBidsByGig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchMyBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Hire Freelancer
            .addCase(hireFreelancer.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(hireFreelancer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // Update local state is tricky because multiple bids change. 
                // Ideally re-fetch or manuall update. 
                // We'll trust the component to re-fetch or simple update:
                const hiredBid = action.payload.bid;
                state.bids = state.bids.map(bid =>
                    bid._id === hiredBid._id
                        ? { ...bid, status: 'hired' }
                        : { ...bid, status: 'rejected' }
                );
            })
            .addCase(hireFreelancer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetBidState } = bidSlice.actions;

export default bidSlice.reducer;
