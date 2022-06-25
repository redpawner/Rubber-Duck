import react from "react";
import create from "zustand";
//Enable redux devtools in browser
import { devtools } from "zustand/middleware"

// NEEDED OTHERWISE TypeScript complains
type MyStore = {
  show: boolean;
  toggleShow: () => void;
};


const useStore = create<MyStore>()(devtools(set => ({
  show: false,
  toggleShow: () => set((state) => ({ show: !state.show }))
})));


export default useStore;