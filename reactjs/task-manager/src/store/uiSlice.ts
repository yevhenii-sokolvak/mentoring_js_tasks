import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterStatus } from '../types/types';

interface UiState {
  searchQuery: string;
  filter: FilterStatus;
}

const initialState: UiState = {
  searchQuery: '',
  filter: 'all',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearchQuery, setFilter } = uiSlice.actions;
export default uiSlice.reducer;