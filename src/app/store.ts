import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { TypedUseSelectorHook, useDispatch,useSelector } from 'react-redux';
import deviceSlice from './deviceSlice';
import serviceSlice from './serviceSlice';
import roleSlice from './roleSlice';
import progressionSlice from './progressionSlice';

export const store = configureStore({
  reducer: {
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