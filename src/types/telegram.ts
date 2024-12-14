export interface IChat {
  id: string;
  name: string;
  type: string;
}

export interface IMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}
