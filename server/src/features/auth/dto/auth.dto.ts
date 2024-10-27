export interface LoginPayload {
  email: string;
  password: string;
  deviceId: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  deviceId: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
  deviceId: string;
}

export interface LogoutPayload {
  deviceId?: string;
}
