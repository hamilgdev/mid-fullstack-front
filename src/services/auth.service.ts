import { httpApi } from "@/services/api/httpApi";

import type { User } from "@/interfaces/user.interface";

export const signInWithEmail = async () => {
  return httpApi.get<User[]>('/users')
}

export const refreshToken = async () => {
  return httpApi.get<User[]>('/users')
}
