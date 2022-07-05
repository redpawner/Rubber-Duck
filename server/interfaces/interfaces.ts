interface User {
  uid: string;
  username: string;
  email: string;
  avatar?: string;
  rating_total: number;
  rating_count: number;
  needHelp: boolean;
  help_request: HelpReqSchema;
}

interface HelpReqSchema {
  _id: string;
  username: string;
  title: string;
  description: string;
  hr_languages: string[];
  time_created: Date;
  sandbox: string;
  url: string;
}

export { User, HelpReqSchema };
