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
  avatar: string;
}

type User = {
  uid: string;
  userAT: string;
  username: string;
  avatar?: string;
  rating_total: number;
  rating_count: number;
  needHelp: boolean;
  help_request: HelpReqSchema;

  setUser: (
    username: string,
    rating_total: number,
    rating_count: number,
    needHelp: boolean,
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
  UserRole,
};
