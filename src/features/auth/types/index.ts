export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type RegisterUserInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type RegisterUserPayload = {
  access: string;
  refresh: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserPayload = {
  access: string;
  refresh: string;
};
