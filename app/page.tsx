import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Rocket, Stars, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-600 animate-bounce">¡Aprende con IA!</h1>
          <p className="text-xl text-pink-500 max-w-2xl mx-auto">
            Escoge tu asistente educativo favorito y comienza una aventura de aprendizaje
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Agente para edades 5-7 */}
            <Link href="/chat?agent=junior" className="block">
              <Card className="p-6 h-full border-4 border-green-400 bg-green-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center mb-4">
                    <BookOpen className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Pequeños Exploradores</h2>
                  <p className="text-green-700 mb-4">Para niños de 5 a 7 años</p>
                  <p className="text-green-600 flex-grow">
                    Aprende con juegos, cuentos y actividades divertidas para los más pequeños
                  </p>
                  <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                    ¡Vamos a jugar!
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Agente para edades 8-10 */}
            <Link href="/chat?agent=middle" className="block">
              <Card className="p-6 h-full border-4 border-blue-400 bg-blue-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center mb-4">
                    <Brain className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">Curiosos del Saber</h2>
                  <p className="text-blue-700 mb-4">Para niños de 8 a 10 años</p>
                  <p className="text-blue-600 flex-grow">
                    Descubre el mundo con explicaciones claras y experimentos fascinantes
                  </p>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                    ¡Descubrir!
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Agente para edades 11-13 */}
            <Link href="/chat?agent=senior" className="block">
              <Card className="p-6 h-full border-4 border-purple-400 bg-purple-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center mb-4">
                    <Rocket className="w-12 h-12 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-purple-600 mb-2">Jóvenes Científicos</h2>
                  <p className="text-purple-700 mb-4">Para niños de 11 a 13 años</p>
                  <p className="text-purple-600 flex-grow">
                    Profundiza en temas más avanzados con explicaciones detalladas y retos
                  </p>
                  <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6">
                    ¡Explorar!
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 flex items-center justify-center">
            <Sparkles className="mr-2 text-yellow-500" /> ¿Por qué aprender con nosotros?{" "}
            <Stars className="ml-2 text-yellow-500" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-4 bg-yellow-100 border-2 border-yellow-300 rounded-2xl">
              <h3 className="font-bold text-yellow-700 mb-2">Aprendizaje Personalizado</h3>
              <p className="text-yellow-800">Nuestros agentes se adaptan a tu ritmo y estilo de aprendizaje</p>
            </Card>

            <Card className="p-4 bg-pink-100 border-2 border-pink-300 rounded-2xl">
              <h3 className="font-bold text-pink-700 mb-2">Contenido Visual</h3>
              <p className="text-pink-800">Explicaciones visuales que hacen el aprendizaje más divertido</p>
            </Card>

            <Card className="p-4 bg-teal-100 border-2 border-teal-300 rounded-2xl">
              <h3 className="font-bold text-teal-700 mb-2">Guarda tus Lecciones</h3>
              <p className="text-teal-800">Imprime o guarda en PDF tus lecciones favoritas para repasar</p>
            </Card>
          </div>
        </div>
      </div>

      <footer className="mt-16 py-6 bg-indigo-100 text-center">
        <p className="text-indigo-600">Asistente Educativo con IA para niños • Aprende jugando</p>
      </footer>
    </main>
  )
}
