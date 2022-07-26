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
  trainingDays?: string[]
  trainingExperience?: string
  imageUrl?: string
  gym?: string
}

export interface TokenPayload extends JwtPayload {
  userId?: string
  fullName?: string
  userType?: 'ATHLETE' | 'PT' | 'NORMAL_USER'
}

export interface AthleteResponse extends UserResponse {
  trainingExperience?: string
  trainingDays?: string[]
}

export interface CreateBaseUser {
  fullName: string
  email: string
  password: string
  birthday: Date
  gender: string
  languages: string[]
}

export interface CreateAthleteRequest extends CreateBaseUser {
  trainingDays: string[]
  trainingExperience: string
}

export interface UpdateUserRequest {
  fullName: string
  email: string
  birthday: Date
  gender: string
  languages: string[]
}

export interface UpdateAthleteRequest extends UpdateUserRequest {
  trainingDays: string[]
  trainingExperience: string
}

export interface GymResponse {
  id?: string
  name?: string
}

export interface UserMeta {
  id: string
  imageUrl: string
  name: string
  age: string
  level: string
  languages: string[]
  trainingDays: string[]
}

export interface ChatPerson {
  id: string
  fullName: string
  avatar: string
  subText: string
  chatId: string
  matchingId: string
}

export interface MyChatsResponse {
  chatId?: any
  matchingId?: string
  participants?:
    | {
        _id: any
        fullName: string
        imageUrl: string
      }[]
    | any
  status?: string
  createdAt?: Date
}

export interface MessageResponse {
  id: any
  senderId: string
  chatId: string
  content: string
  createdAt: any
}

export interface UIMessage extends MessageResponse {
  isTemp?: boolean
}

export interface SendMessageRequest {
  content: string
}

export interface MatchingResponse {
  id: string
  interactedUserId: string
  interactingUserId: string
  status: string
  chatId: string
  createdAt: string
}

export interface InteractionResponse {
  id?: any
  userId: string
  toUserId: string
  interactionType: 'LIKED' | 'DISLIKED'
  createdAt: Date
  matching?: any
}
