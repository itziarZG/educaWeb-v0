"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useProfile } from "@/contexts/profile-context"
import { User, Heart, Brain, Zap, Star } from "lucide-react"

const INTERESTS = [
  "Animales",
  "Ciencias",
  "Matemáticas",
  "Historia",
  "Arte",
  "Música",
  "Deportes",
  "Tecnología",
  "Naturaleza",
  "Espacio",
  "Dinosaurios",
  "Cuentos",
]

const AVATARS = ["🧒", "👧", "🧑", "👦", "🧒🏽", "👧🏽", "🧑🏽", "👦🏽", "🧒🏿", "👧🏿"]

interface ProfileCreationFormProps {
  onComplete: () => void
  onCancel: () => void
}

export function ProfileCreationForm({ onComplete, onCancel }: ProfileCreationFormProps) {
  const { createProfile } = useProfile()
  const [formData, setFormData] = useState({
    name: "",
    age: 6,
    grade: "",
    interests: [] as string[],
    learningStyle: "visual" as const,
    difficultyLevel: "beginner" as const,
    assistantPersonality: "fun" as const,
    avatar: "🧒",
  })

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.interests.length > 0) {
      createProfile(formData)
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-6 md:p-8 border-4 border-purple-300 rounded-3xl bg-white/90 backdrop-blur">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">¡Vamos a conocerte! 🌟</h1>
            <p className="text-purple-500">Cuéntanos sobre ti para crear tu asistente perfecto</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre y Avatar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-purple-700 font-semibold">
                  ¿Cómo te llamas?
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Tu nombre"
                  className="mt-1 border-2 border-purple-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label className="text-purple-700 font-semibold">Elige tu avatar</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, avatar }))}
                      className={`text-2xl p-2 rounded-full border-2 transition-all ${
                        formData.avatar === avatar
                          ? "border-purple-400 bg-purple-100 scale-110"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Edad y Curso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-purple-700 font-semibold">
                  ¿Cuántos años tienes?
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="3"
                  max="18"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                  className="mt-1 border-2 border-purple-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="grade" className="text-purple-700 font-semibold">
                  ¿En qué curso estás?
                </Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData((prev) => ({ ...prev, grade: e.target.value }))}
                  placeholder="Ej: 2º Primaria"
                  className="mt-1 border-2 border-purple-200 rounded-xl"
                />
              </div>
            </div>

            {/* Intereses */}
            <div>
              <Label className="text-purple-700 font-semibold">¿Qué te gusta aprender? (Elige al menos uno)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {INTERESTS.map((interest) => (
                  <Badge
                    key={interest}
                    variant={formData.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "border-purple-300 text-purple-600 hover:bg-purple-100"
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Estilo de Aprendizaje */}
            <div>
              <Label className="text-purple-700 font-semibold">¿Cómo prefieres aprender?</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, learningStyle: "visual" }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.learningStyle === "visual"
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <User className="mx-auto mb-2 text-blue-500" />
                  <div className="font-semibold text-blue-600">Visual</div>
                  <div className="text-sm text-blue-500">Con imágenes y dibujos</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, learningStyle: "auditory" }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.learningStyle === "auditory"
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <Heart className="mx-auto mb-2 text-green-500" />
                  <div className="font-semibold text-green-600">Auditivo</div>
                  <div className="text-sm text-green-500">Escuchando explicaciones</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, learningStyle: "kinesthetic" }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.learningStyle === "kinesthetic"
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <Zap className="mx-auto mb-2 text-orange-500" />
                  <div className="font-semibold text-orange-600">Kinestésico</div>
                  <div className="text-sm text-orange-500">Haciendo y practicando</div>
                </button>
              </div>
            </div>

            {/* Personalidad del Asistente */}
            <div>
              <Label className="text-purple-700 font-semibold">¿Cómo quieres que sea tu asistente?</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, assistantPersonality: "fun" }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.assistantPersonality === "fun"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 hover:border-yellow-300"
                  }`}
                >
                  <Star className="mx-auto mb-2 text-yellow-500" />
                  <div className="font-semibold text-yellow-600">Divertido</div>
                  <div className="text-sm text-yellow-500">Con chistes y juegos</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, assistantPersonality: "serious" }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.assistantPersonality === "serious"
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <Brain className="mx-auto mb-2 text-indigo-500" />
                  <div className="font-semibold text-indigo-600">Serio</div>
                  <div className="text-sm text-indigo-500">Directo y claro</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, assistantPersonality: "adventurous" }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.assistantPersonality === "adventurous"
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <Zap className="mx-auto mb-2 text-red-500" />
                  <div className="font-semibold text-red-600">Aventurero</div>
                  <div className="text-sm text-red-500">Con historias emocionantes</div>
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-2 border-gray-300 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!formData.name.trim() || formData.interests.length === 0}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
              >
                ¡Crear mi perfil! 🚀
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
