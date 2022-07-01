import { VoidExpression } from 'typescript';
import create from 'zustand';
//Enable redux devtools in browser
import { devtools, persist } from 'zustand/middleware';
import { User, UserSettingsStore, MyStore, HelpReqSchema } from '../interfaces';

const buttonsLogicStore = create<MyStore>()(
  devtools((set) => ({
    show: 'dashboard',
    profile: true,
    counter: 1,
    // toggleShow: () => set((state) => ({ show: !state.show })),
    setDashboard: () => set({ show: 'dashboard' }),
    setChat: () => set({ show: 'chat' }),
    setHelp: () => set({ show: 'help' }),
    setReset: () => set({ counter: 2 }),
    setProfile: () => set({ show: 'profile' }),
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
    regUser: (uid: string, username: string, avatar: string) => {
      set({ uid: uid, username: username, avatar: avatar });
    },
    setUser: (
      username: string,
      rating_total: Number,
      rating_count: Number,
      needHelp: Boolean,
      avatar?: string,
      help_request?: HelpReqSchema
    ) => {
      set({
        username: username,
        rating_total: rating_total,
        rating_count: rating_count,
        needHelp: needHelp,
        avatar: avatar,
        help_request: help_request,
      });
    },
    setUserUid: (uid: string) => {
      set({ uid: uid });
    },
    setUserToken: (userAT: string) => {
      set({ userAT: userAT });
    },
  }))
);

export { buttonsLogicStore, useUserSettingsStore, userStore };
