import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState: { isVisible: false, modalData: null },
  reducers: {
    showModal: (state) => {
      state.isVisible = true;
    },
    hideModal: (state) => {
      state.isVisible = false;
    },
    saveModalData: (state) => {
      state.modalData = false;
    },
    
  },
});

export const { saveModalData } = modalSlice.actions;
export default modalSlice.reducer;
