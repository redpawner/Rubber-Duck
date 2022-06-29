type ArrivalMessage = {
  text: string;
  time: Date;
  language?: string;
  type?: string;
  mimeType?: string;
  body?: File;
  imgSource?: string;
  blob?: Blob
}

type messageProps = {
  message: ArrivalMessage;
}


export type { ArrivalMessage, messageProps };