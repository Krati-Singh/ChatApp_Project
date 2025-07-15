import { create } from 'zustand';
import { createAuthSlice } from './slice/auth-slice.js';

const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a)
}));

export default useAppStore; 