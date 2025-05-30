"use client"
import { Card } from "@/components/ui/card"
import { useProfile } from "@/contexts/profile-context"
import { Plus } from "lucide-react"

interface ProfileSelectorProps {
  onCreateNew: () => void
  onProfileSelected: () => void
}

export function ProfileSelector({ onCreateNew, onProfileSelected }: ProfileSelectorProps) {
  const { profiles, selectProfile } = useProfile()

  const handleProfileSelect = (profileId: string) => {
    selectProfile(profileId)
    onProfileSelected()
  }

  const getAgeGroup = (age: number) => {
    if (age <= 7) return { color: "green", label: "Pequeño Explorador" }
    if (age <= 10) return { color: "blue", label: "Curioso del Saber" }
    return { color: "purple", label: "Joven Científico" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">¿Quién va a aprender hoy? 🌟</h1>
          <p className="text-xl text-pink-500">Selecciona tu perfil o crea uno nuevo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Botón para crear nuevo perfil */}
          <Card
            className="p-6 border-4 border-dashed border-purple-300 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer bg-purple-50"
            onClick={onCreateNew}
          >
            <div className="flex flex-col items-center text-center h-full justify-center min-h-[200px]">
              <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Crear Nuevo Perfil</h3>
              <p className="text-purple-500">¡Vamos a conocerte!</p>
            </div>
          </Card>

          {/* Perfiles existentes */}
          {profiles.map((profile) => {
            const ageGroup = getAgeGroup(profile.age)
            return (
              <Card
                key={profile.id}
                className={`p-6 border-4 border-${ageGroup.color}-400 bg-${ageGroup.color}-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer`}
                onClick={() => handleProfileSelect(profile.id)}
              >
                <div className="flex flex-col items-center text-center h-full min-h-[200px]">
                  <div className="text-4xl mb-3">{profile.avatar}</div>
                  <h3 className={`text-xl font-bold text-${ageGroup.color}-600 mb-1`}>{profile.name}</h3>
                  <p className={`text-${ageGroup.color}-500 mb-2`}>
                    {profile.age} años • {profile.grade || `${ageGroup.label}`}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {profile.interests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className={`text-xs px-2 py-1 bg-${ageGroup.color}-200 text-${ageGroup.color}-700 rounded-full`}
                      >
                        {interest}
                      </span>
                    ))}
                    {profile.interests.length > 3 && (
                      <span
                        className={`text-xs px-2 py-1 bg-${ageGroup.color}-200 text-${ageGroup.color}-700 rounded-full`}
                      >
                        +{profile.interests.length - 3}
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-auto bg-${ageGroup.color}-500 hover:bg-${ageGroup.color}-600 text-white rounded-full px-4 py-2 text-sm`}
                  >
                    ¡Empezar a aprender!
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {profiles.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg">No hay perfiles creados aún. ¡Crea el primero!</p>
          </div>
        )}
      </div>
    </div>
  )
}
