import { create } from 'zustand'
import { createJSONStorage, devtools, persist, PersistStorage } from 'zustand/middleware';

interface BalanceState {
  balance: number
  setBal: (bal: number) => void
}

// const dummyStorage: PersistStorage<BalanceState> = {
//     getItem: () => null,
//     setItem: () => { },
//     removeItem: () => { }
// };

export const useBalanceStore = create<BalanceState>()(devtools(
  persist(
    (set) => ({
      balance: 0,
      setBal: (bal: number) => set(() => ({ balance: bal })),
    }),
    { name: 'balanceStore' }
  ))
);
