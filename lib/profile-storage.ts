import type { ChildProfile } from "@/types/profile"

const PROFILES_KEY = "child_profiles"
const CURRENT_PROFILE_KEY = "current_profile"

export const profileStorage = {
  getProfiles: (): ChildProfile[] => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(PROFILES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  saveProfiles: (profiles: ChildProfile[]): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
  },

  getCurrentProfile: (): ChildProfile | null => {
    if (typeof window === "undefined") return null
    try {
      const stored = localStorage.getItem(CURRENT_PROFILE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },

  setCurrentProfile: (profile: ChildProfile | null): void => {
    if (typeof window === "undefined") return
    if (profile) {
      localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(profile))
    } else {
      localStorage.removeItem(CURRENT_PROFILE_KEY)
    }
  },

  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },
}
