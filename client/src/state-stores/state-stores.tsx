import react from "react";
import create from "zustand";
//Enable redux devtools in browser
import { devtools, persist } from "zustand/middleware";

// NEEDED OTHERWISE TypeScript complains
type MyStore = {
  show: boolean;
  counter: number;
  toggleShow: () => void;
  setReset: () => void;
  setReg: () => void;
  setLogin: () => void;
};

const useStore = create<MyStore>()(
  devtools((set) => ({
    show: false,
    counter: 1,
    toggleShow: () => set((state) => ({ show: !state.show })),
    setReset: () => set((state) => ({ counter: 2 })),
    setReg: () => set((state) => ({ counter: 0 })),
    setLogin: () => set((state) => ({ counter: 1 })),
  }))
);

//In case we want to add the dark mode functionality or other user settings
type UserSettingsStore = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
const useUserSettingsStore = create<UserSettingsStore>()(
  devtools(
    persist((set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }))
  )
);

export { useStore, useUserSettingsStore };
