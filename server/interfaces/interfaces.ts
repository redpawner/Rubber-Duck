interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  user_languages: string[];
  rating_total: Number;
  rating_count: Number;
  needHelp: Boolean;
  help_request: HelpReqSchema;
}

interface HelpReqSchema {
  _id: string;
  username: string;
  title: string;
  description: string;
  hr_languages: string[];
  time_created: Date;
}

export { User, HelpReqSchema };
