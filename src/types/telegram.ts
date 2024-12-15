export interface IChat {
  id: string;
  name: string;
  type: string;
  last_message: {
    id: 257379;
    text: string;
    date: string;
    sender_id: string;
    sender: string;
  };
}

export interface IMessage {
  id: string;
  text: string;
  sender_id: string;
  date: string;
}
