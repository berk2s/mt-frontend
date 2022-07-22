import { JwtPayload } from 'jwt-decode'

export interface TokenResponse {
  accessToken: string
  expiresIn: number
}

export interface UserResponse {
  id?: any
  fullName?: string
  email?: string
  birthday?: Date
  gender?: string
  languages?: string[]
  workoutDays?: string[]
  experience?: string
  imageUrl?: string
}

export interface TokenPayload extends JwtPayload {
  userId: string
  fullName: string
  userType: 'ATHLETE' | 'PT' | 'NORMAL_USER'
}
