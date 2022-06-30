import { VoidExpression } from "typescript";
import create from "zustand";
//Enable redux devtools in browser
import { devtools, persist } from "zustand/middleware";

// NEEDED OTHERWISE TypeScript complains
// we should consider moving all types/interfaces to a global interface file like in the server

type MyStore = {
  show: string;
  counter: number;
  profile: boolean;
  // toggleShow: () => void;
  setReset: () => void;
  setReg: () => void;
  setLogin: () => void;
  setProfile: () => void;
  setDashboard: () => void;
  setChat: () => void;
  setHelp: () => void;
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
  regUser: (uid: string, username: string, avatar: string) => void;
  setUser: (
    username: string,
    rating_total: Number,
    rating_count: Number,
    needHelp: Boolean,
    avatar?: string,
    help_request?: HelpReqSchema
  ) => void;
  setUserToken: (userAT: string) => void;
  setUserUid: (uid: string) => void;
};

const buttonsLogicStore = create<MyStore>()(
  devtools((set) => ({
    show: "dashboard",
    profile: true,
    counter: 1,
    // toggleShow: () => set((state) => ({ show: !state.show })),
    setDashboard: () => set({ show: "dashboard" }),
    setChat: () => set({ show: "chat" }),
    setHelp: () => set({ show: "help" }),
    setReset: () => set({ counter: 2 }),
    setProfile: () => set({ show: "profile" }),
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
    uid: "",
    userAT: "",
    username: "",
    avatar: "",
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
    help_request: {
      _id: "",
      username: "",
      title: "",
      description: "",
      hr_languages: [],
      time_created: "",
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
