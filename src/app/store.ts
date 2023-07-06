import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { TypedUseSelectorHook, useDispatch,useSelector } from 'react-redux';
import deviceSlice from './deviceSlice';
import serviceSlice from './serviceSlice';
import roleSlice from './roleSlice';
import progressionSlice from './progressionSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    user:userSlice,
    devices:deviceSlice,
    service:serviceSlice,
    roleManage:roleSlice,
    progression:progressionSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;