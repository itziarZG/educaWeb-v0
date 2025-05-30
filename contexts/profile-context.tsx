"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { ChildProfile, ProfileContextType } from "@/types/profile"
import { profileStorage } from "@/lib/profile-storage"

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([])
  const [currentProfile, setCurrentProfile] = useState<ChildProfile | null>(null)

  useEffect(() => {
    const storedProfiles = profileStorage.getProfiles()
    const storedCurrentProfile = profileStorage.getCurrentProfile()

    setProfiles(storedProfiles)
    setCurrentProfile(storedCurrentProfile)
  }, [])

  const createProfile = (profileData: Omit<ChildProfile, "id" | "createdAt" | "lastUsed">) => {
    const newProfile: ChildProfile = {
      ...profileData,
      id: profileStorage.generateId(),
      createdAt: new Date(),
      lastUsed: new Date(),
    }

    const updatedProfiles = [...profiles, newProfile]
    setProfiles(updatedProfiles)
    profileStorage.saveProfiles(updatedProfiles)

    // Automatically select the new profile
    setCurrentProfile(newProfile)
    profileStorage.setCurrentProfile(newProfile)
  }

  const selectProfile = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId)
    if (profile) {
      const updatedProfile = { ...profile, lastUsed: new Date() }
      const updatedProfiles = profiles.map((p) => (p.id === profileId ? updatedProfile : p))

      setProfiles(updatedProfiles)
      setCurrentProfile(updatedProfile)
      profileStorage.saveProfiles(updatedProfiles)
      profileStorage.setCurrentProfile(updatedProfile)
    }
  }

  const updateProfile = (profileId: string, updates: Partial<ChildProfile>) => {
    const updatedProfiles = profiles.map((p) => (p.id === profileId ? { ...p, ...updates } : p))

    setProfiles(updatedProfiles)
    profileStorage.saveProfiles(updatedProfiles)

    if (currentProfile?.id === profileId) {
      const updatedCurrentProfile = { ...currentProfile, ...updates }
      setCurrentProfile(updatedCurrentProfile)
      profileStorage.setCurrentProfile(updatedCurrentProfile)
    }
  }

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter((p) => p.id !== profileId)
    setProfiles(updatedProfiles)
    profileStorage.saveProfiles(updatedProfiles)

    if (currentProfile?.id === profileId) {
      setCurrentProfile(null)
      profileStorage.setCurrentProfile(null)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        currentProfile,
        createProfile,
        selectProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
