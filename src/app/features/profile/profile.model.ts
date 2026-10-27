// Respuesta (parcial) de GET /auth/me
export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  role: string;
  university: string;
  image: string;
  company: { name: string; title?: string; department?: string };
  address: { city: string; state?: string; country: string };
}
