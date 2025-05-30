"use client"

import { useState, useEffect } from "react"
import { useProfile } from "@/contexts/profile-context"
import { ProfileSelector } from "@/components/profile-selector"
import { ProfileCreationForm } from "@/components/profile-creation-form"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Rocket, Stars, Sparkles } from "lucide-react"

type ViewState = "loading" | "selector" | "creation" | "homepage"

export default function HomePage() {
  const { profiles, currentProfile } = useProfile()
  const [viewState, setViewState] = useState<ViewState>("loading")

  useEffect(() => {
    // Small delay to ensure context is loaded
    const timer = setTimeout(() => {
      if (currentProfile) {
        setViewState("homepage")
      } else if (profiles.length > 0) {
        setViewState("selector")
      } else {
        setViewState("creation")
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [profiles, currentProfile])

  if (viewState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🌟</div>
          <p className="text-purple-600 text-xl">Cargando...</p>
        </div>
      </div>
    )
  }

  if (viewState === "creation") {
    return <ProfileCreationForm onComplete={() => setViewState("homepage")} onCancel={() => setViewState("selector")} />
  }

  if (viewState === "selector") {
    return (
      <ProfileSelector
        onCreateNew={() => setViewState("creation")}
        onProfileSelected={() => setViewState("homepage")}
      />
    )
  }

  // Homepage personalizada
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">{currentProfile?.avatar}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-purple-600">¡Hola {currentProfile?.name}!</h1>
          </div>
          <p className="text-lg md:text-xl text-pink-500 max-w-2xl mx-auto">
            ¿Qué quieres aprender hoy? Tu asistente{" "}
            {currentProfile?.assistantPersonality === "fun"
              ? "divertido"
              : currentProfile?.assistantPersonality === "serious"
                ? "serio"
                : "aventurero"}{" "}
            te está esperando
          </p>
          <button
            onClick={() => setViewState("selector")}
            className="mt-4 text-purple-500 hover:text-purple-700 underline"
          >
            Cambiar perfil
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Agente personalizado basado en edad */}
            {currentProfile && currentProfile.age <= 7 && (
              <Link href={`/chat?agent=junior&profile=${currentProfile.id}`} className="block no-underline">
                <Card className="p-4 md:p-6 h-full border-4 border-green-400 bg-green-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-green-200 flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-green-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-2">Tu Explorador Personal</h2>
                    <p className="text-green-700 mb-2 md:mb-4">Perfecto para {currentProfile.name}</p>
                    <p className="text-green-600 flex-grow text-sm md:text-base">
                      Aprende sobre {currentProfile.interests.slice(0, 2).join(" y ")} con juegos divertidos
                    </p>
                    <div className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-4 md:px-6 py-2 inline-block">
                      ¡Vamos a jugar!
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {currentProfile && currentProfile.age > 7 && currentProfile.age <= 10 && (
              <Link href={`/chat?agent=middle&profile=${currentProfile.id}`} className="block no-underline">
                <Card className="p-4 md:p-6 h-full border-4 border-blue-400 bg-blue-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-200 flex items-center justify-center mb-4">
                      <Brain className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Tu Asistente Curioso</h2>
                    <p className="text-blue-700 mb-2 md:mb-4">Adaptado para {currentProfile.name}</p>
                    <p className="text-blue-600 flex-grow text-sm md:text-base">
                      Descubre {currentProfile.interests.slice(0, 2).join(" y ")} con experimentos fascinantes
                    </p>
                    <div className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 md:px-6 py-2 inline-block">
                      ¡Descubrir!
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {currentProfile && currentProfile.age > 10 && (
              <Link href={`/chat?agent=senior&profile=${currentProfile.id}`} className="block no-underline">
                <Card className="p-4 md:p-6 h-full border-4 border-purple-400 bg-purple-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-purple-200 flex items-center justify-center mb-4">
                      <Rocket className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-purple-600 mb-2">Tu Científico Personal</h2>
                    <p className="text-purple-700 mb-2 md:mb-4">Diseñado para {currentProfile.name}</p>
                    <p className="text-purple-600 flex-grow text-sm md:text-base">
                      Profundiza en {currentProfile.interests.slice(0, 2).join(" y ")} con retos avanzados
                    </p>
                    <div className="mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full px-4 md:px-6 py-2 inline-block">
                      ¡Explorar!
                    </div>
                  </div>
                </Card>
              </Link>
            )}
          </div>
        </div>

        {/* Sección de intereses personalizados */}
        {currentProfile && currentProfile.interests.length > 0 && (
          <div className="mt-12 md:mt-16 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-4 md:mb-6 flex items-center justify-center">
              <Sparkles className="mr-2 text-yellow-500" /> Tus temas favoritos{" "}
              <Stars className="ml-2 text-yellow-500" />
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {currentProfile.interests.map((interest, index) => {
                const colors = ["yellow", "pink", "teal", "orange", "green", "blue"]
                const color = colors[index % colors.length]
                return (
                  <Card key={interest} className={`p-4 bg-${color}-100 border-2 border-${color}-300 rounded-2xl`}>
                    <h3 className={`font-bold text-${color}-700 text-sm md:text-base`}>{interest}</h3>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 md:mt-16 py-4 md:py-6 bg-indigo-100 text-center">
        <p className="text-indigo-600">Asistente Educativo Personalizado • Aprende a tu ritmo</p>
      </footer>
    </main>
  )
}
