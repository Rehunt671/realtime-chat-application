import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "stores/store";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loading;
export default loadingSlice.reducer;
