import create from 'zustand';
//Enable redux devtools in browser
import { devtools, persist } from 'zustand/middleware';
import { User, UserSettingsStore, HelpReqSchema } from '../interfaces';

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
      username: '',
      title: '',
      description: '',
      hr_languages: [],
      time_created: '',
      url: '',
      avatar: '',
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
    setAvatar: (avatar: string) => {
      set({ avatar: avatar });
    },
    setUserToken: (userAT: string) => {
      set({ userAT: userAT });
    },
  }))
);

export { useUserSettingsStore, userStore };
