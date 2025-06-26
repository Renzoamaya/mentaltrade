"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Brain,
  TrendingUp,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react"

interface AuthFormProps {
  mode?: "login" | "register"
}

export default function AuthForm({ mode = "login" }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(mode === "login")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    experience: "principiante",
    confirmPassword: "",
  })

  const { signIn, signUp, resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)

        if (error) {
          setMessage({ type: "error", text: getErrorMessage(error.message) })
        } else {
          setMessage({ type: "success", text: "¡Bienvenido de vuelta!" })
          setTimeout(() => router.push("/dashboard"), 1000)
        }
      } else {
        // Validaciones para registro
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: "error", text: "Las contraseñas no coinciden" })
          setLoading(false)
          return
        }

        if (formData.password.length < 6) {
          setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" })
          setLoading(false)
          return
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.experience)

        if (error) {
          setMessage({ type: "error", text: getErrorMessage(error.message) })
        } else {
          setMessage({
            type: "success",
            text: "¡Cuenta creada! Revisa tu email para confirmar tu cuenta.",
          })
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Ocurrió un error inesperado" })
    }

    setLoading(false)
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage({ type: "error", text: "Ingresa tu email primero" })
      return
    }

    setLoading(true)
    const { error } = await resetPassword(formData.email)

    if (error) {
      setMessage({ type: "error", text: getErrorMessage(error.message) })
    } else {
      setMessage({
        type: "success",
        text: "Te enviamos un email para restablecer tu contraseña",
      })
    }
    setLoading(false)
  }

  const getErrorMessage = (error: string) => {
    const errorMessages: { [key: string]: string } = {
      "Invalid login credentials": "Credenciales incorrectas",
      "User already registered": "Este email ya está registrado",
      "Password should be at least 6 characters": "La contraseña debe tener al menos 6 caracteres",
      "Invalid email": "Email inválido",
      "Email not confirmed": "Debes confirmar tu email antes de iniciar sesión",
    }

    return errorMessages[error] || "Ocurrió un error. Intenta nuevamente."
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Panel izquierdo - Información */}
        <div className="text-white space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  MentaLTrading Pro
                </h1>
                <p className="text-slate-400">Psicotrading de nueva generación</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                Domina tu mente,
                <br />
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  domina el mercado
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                La plataforma más avanzada para desarrollar tu psicología de trading y alcanzar la consistencia que
                buscas.
              </p>
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={Brain}
              title="Análisis Psicológico"
              description="Seguimiento avanzado de tu estado mental y emocional durante el trading"
              color="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Journal Inteligente"
              description="Registro detallado con insights automáticos y recomendaciones personalizadas"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Shield}
              title="Gestión de Riesgo"
              description="Herramientas para mantener la disciplina y controlar las emociones"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={Star}
              title="Progreso Medible"
              description="Métricas claras de tu evolución como trader profesional"
              color="from-yellow-500 to-orange-500"
            />
          </div>

          {/* Testimonial */}
          <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Carlos M.</p>
                <p className="text-sm text-slate-400">Trader Profesional</p>
              </div>
            </div>
            <p className="text-slate-300 italic">
              "Desde que uso MentaLTrading Pro, mi consistencia mejoró un 340%. El control emocional que desarrollé es
              invaluable."
            </p>
            <div className="flex items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-2xl">
            {/* Header del formulario */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h3>
              <p className="text-slate-400">
                {isLogin ? "Bienvenido de vuelta a tu journey de trading" : "Comienza tu transformación como trader"}
              </p>
            </div>

            {/* Mensaje de estado */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  message.type === "success"
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : "bg-red-500/20 border border-red-500/30 text-red-400"
                }`}
              >
                {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre completo (solo registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Experiencia en trading (solo registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Experiencia en Trading</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="principiante">Principiante (0-1 año)</option>
                    <option value="intermedio">Intermedio (1-3 años)</option>
                    <option value="avanzado">Avanzado (3-5 años)</option>
                    <option value="experto">Experto (5+ años)</option>
                  </select>
                </div>
              )}

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar contraseña (solo registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Confirma tu contraseña"
                    />
                  </div>
                </div>
              )}

              {/* Botón de submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* ¿Olvidaste tu contraseña? */}
              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}
            </form>

            {/* Cambiar entre login y registro */}
            <div className="mt-8 text-center">
              <p className="text-slate-400">
                {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setMessage(null)
                    setFormData({
                      email: "",
                      password: "",
                      fullName: "",
                      experience: "principiante",
                      confirmPassword: "",
                    })
                  }}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {isLogin ? "Crear cuenta" : "Iniciar sesión"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para las características
function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: any
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm hover:border-slate-500/50 transition-all duration-300 group">
      <div
        className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}
