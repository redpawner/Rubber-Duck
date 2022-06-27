import create from 'zustand';
//Enable redux devtools in browser
import { devtools, persist } from 'zustand/middleware';

// NEEDED OTHERWISE TypeScript complains
// we should consider moving all interfaces to a global interface file like in the server

type MyStore = {
  show: boolean;
  counter: number;
  toggleShow: () => void;
  setReset: () => void;
  setReg: () => void;
  setLogin: () => void;
};

type UserSettingsStore = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

type User = {
  userUID: string;
  userAT: string;
  username: string;
  setUser: (userUID: string, userAT: string) => void;
};

const useStore = create<MyStore>()(
  devtools((set) => ({
    show: false,
    counter: 1,
    toggleShow: () => set((state) => ({ show: !state.show })),
    setReset: () => set({ counter: 2 }),
    setReg: () => set({ counter: 0 }),
    setLogin: () => set({ counter: 1 }),
  }))
);

//In case we want to add the dark mode functionality or other user settings
const useUserSettingsStore = create<UserSettingsStore>()(
  devtools(
    persist((set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }))
  )
);

const userStore = create<User>()(
  devtools((set) => ({
    userUID: '',
    userAT: '',
    username: '',
    //console log below just useful for development and seeing current user details
    setUser: (userUID: string, userAT: string) => {
      set({ userUID: userUID, userAT: userAT });
    },
  }))
);

export { useStore, useUserSettingsStore, userStore };
