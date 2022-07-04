type ArrivalMessage = {
  text: string;
  time: Date;
  language?: string;
  type?: string;
  mimeType?: string;
  body?: File;
  imgSource?: string;
  blob?: Blob;
  author: string;
};

type messageProps = {
  message: ArrivalMessage;
};

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
interface UserRole {
helper: string;
author: string;
}

interface HelpReqSchema {
  username: string;
  title: string;
  description: string;
  hr_languages: string[];
  time_created: string;
  url: string;
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
  setAvatar: (avatar: string) => void;
};

export type {
  ArrivalMessage,
  messageProps,
  User,
  HelpReqSchema,
  UserSettingsStore,
  MyStore,
  UserRole
};
