import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface PortfolioState {
  items: PortfolioItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  items: [], // Ensure this is an array
  isLoading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolioItems: (state, action: PayloadAction<PortfolioItem[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPortfolioItems, setLoading, setError } = portfolioSlice.actions;
export default portfolioSlice.reducer;