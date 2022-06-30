type ArrivalMessage = {
  text: string;
  time: Date;
  language?: string;
  type?: string;
  mimeType?: string;
  body?: File;
  imgSource?: string;
  blob?: Blob;
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

export type {
  ArrivalMessage,
  messageProps,
  User,
  HelpReqSchema,
  UserSettingsStore,
  MyStore,
};
