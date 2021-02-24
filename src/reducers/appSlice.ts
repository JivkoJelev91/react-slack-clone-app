import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
  },
  reducers: {
    enterRoom: (state, action: PayloadAction<{roomId: string}> | any) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state: { app: { roomId : string }; }): string => state.app.roomId;

export default appSlice.reducer;
