import react from 'react';
import create from 'zustand';

// NEEDED OTHERWISE TypeScript complains
type MyStore = {
  show: boolean;
  toggleShow: () => void;
};

const useStore = create<MyStore>((set) => ({
  show: false,
  toggleShow: () => set((state) => ({ show: !state.show })),
}));

export default useStore;
