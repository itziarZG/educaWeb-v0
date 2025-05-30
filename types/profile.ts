export interface ChildProfile {
  id: string
  name: string
  age: number
  grade: string
  interests: string[]
  learningStyle: "visual" | "auditory" | "kinesthetic"
  difficultyLevel: "beginner" | "intermediate" | "advanced"
  assistantPersonality: "fun" | "serious" | "adventurous"
  avatar: string
  createdAt: Date
  lastUsed: Date
}

export interface ProfileContextType {
  profiles: ChildProfile[]
  currentProfile: ChildProfile | null
  createProfile: (profile: Omit<ChildProfile, "id" | "createdAt" | "lastUsed">) => void
  selectProfile: (profileId: string) => void
  updateProfile: (profileId: string, updates: Partial<ChildProfile>) => void
  deleteProfile: (profileId: string) => void
}
