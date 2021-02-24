import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reducers/appSlice';

export default configureStore({
  reducer: {
    app: appSlice,
  },
});
