export interface CreateBaseUser {
  fullName: string
  email: string
  password: string
  birthday: Date
  gender: string
}

export interface CreateAthleteRequest extends CreateBaseUser {
  trainingDays: string[]
  trainingExperience: string
  languages: string[]
}
