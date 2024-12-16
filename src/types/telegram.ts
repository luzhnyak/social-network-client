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
  sender: string;
  date: string;
}

export interface Chat {
  id: string;
  name: string;
}

export interface PhoneAuthRequest {
  phone_number: string;
}

export interface PhoneAuthResponse {
  phone_number: string;
  phone_code_hash: string;
  status: string;
  session_string: string;
}

export interface PhoneCodeVerifyRequest {
  phone_number: string;
  phone_code: string;
  phone_code_hash: string;
  session_string: string;
}

export interface PhoneCodeVerifyResponse {
  status: string;
  session_string: string;
}

export interface TwoFactorAuthRequest {
  password: string;
  session_string: string;
}

export interface TwoFactorAuthResponse {
  status: string;
  session_string: string;
}
