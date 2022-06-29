import create from 'zustand';
//Enable redux devtools in browser
import { devtools, persist } from 'zustand/middleware';

// NEEDED OTHERWISE TypeScript complains
// we should consider moving all types/interfaces to a global interface file like in the server

type MyStore = {
  show: boolean;
  counter: number;
  profile: boolean;
  toggleShow: () => void;
  setReset: () => void;
  setReg: () => void;
  setLogin: () => void;
  setProfile: () => void;
};

type UserSettingsStore = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
interface HelpReqSchema {
  _id: string;
  username: string;
  title: string;
  description: string;
  hr_languages: string[];
  time_created: string;
}

type User = {
  uid: string;
  userAT: string;
  username: string;
  avatar?: string;
  rating_total: Number;
  rating_count: Number;
  needHelp: Boolean;
  help_request: HelpReqSchema;
  setUser: (userUID: string, userAT: string) => void;
};

const buttonsLogicStore = create<MyStore>()(
  devtools((set) => ({
    show: false,
    profile: true,
    counter: 1,
    toggleShow: () => set((state) => ({ show: !state.show })),
    setReset: () => set({ counter: 2 }),
    setReg: () => set({ counter: 0 }),
    setLogin: () => set({ counter: 1 }),
    setProfile: () => set((state) => ({ profile: !state.profile })),
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
    uid: '',
    userAT: '',
    username: '',
    avatar: '',
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
    help_request: {
      _id: '',
      username: '',
      title: '',
      description: '',
      hr_languages: [],
      time_created: '',
    },
    //console log below just useful for development and seeing current user details
    setUser: (uid: string, userAT: string) => {
      set({ uid: uid, userAT: userAT });
    },
  }))
);

export { buttonsLogicStore, useUserSettingsStore, userStore };
