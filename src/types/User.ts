export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  id: number;
  name: string;
  email: string;
  token_type: string;
  permissions: string[];
};