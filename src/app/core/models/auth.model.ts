// Cuerpo que se envía a POST /auth/login
export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

// Respuesta de POST /auth/login
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

// Datos básicos del usuario que guardamos en localStorage
export interface StoredUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}
