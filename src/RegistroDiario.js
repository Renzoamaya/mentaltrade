"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  Target,
  Heart,
  Award,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Trophy,
  Flame,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Smile,
  Frown,
  Meh,
  TrendingDown,
} from "lucide-react"

export default function ProgresoMental({ onBack }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("dashboard")
  const [meditationTimer, setMeditationTimer] = useState(300) // 5 minutos
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerDisplay, setTimerDisplay] = useState(300)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("semana")

  // Datos simulados de progreso mental
  const [mentalStats, setMentalStats] = useState({
    bienestarGeneral: 78,
    controlEmocional: 85,
    disciplina: 72,
    confianza: 80,
    estres: 35,
    motivacion: 88,
    rachaActual: 12,
    mejorRacha: 28,
    sesionesCompletadas: 45,
    tiempoMeditacion: 1250, // minutos
    objetivosSemana: 5,
    objetivosCompletados: 3,
  })

  const [dailyMood, setDailyMood] = useState([
    { fecha: "2024-01-15", mood: "happy", energia: 85, estres: 20 },
    { fecha: "2024-01-14", mood: "neutral", energia: 70, estres: 40 },
    { fecha: "2024-01-13", mood: "sad", energia: 60, estres: 60 },
    { fecha: "2024-01-12", mood: "happy", energia: 90, estres: 15 },
    { fecha: "2024-01-11", mood: "neutral", energia: 75, estres: 30 },
    { fecha: "2024-01-10", mood: "happy", energia: 88, estres: 25 },
    { fecha: "2024-01-09", mood: "happy", energia: 82, estres: 18 },
  ])

  const [exercises, setExercises] = useState([
    {
      id: 1,
      titulo: "Respiración 4-7-8",
      descripcion: "Técnica de respiración para reducir ansiedad",
      duracion: 5,
      categoria: "respiracion",
      completado: false,
      beneficios: ["Reduce ansiedad", "Mejora concentración", "Calma la mente"],
    },
    {
      id: 2,
      titulo: "Visualización de Éxito",
      descripcion: "Imagina tus trades exitosos en detalle",
      duracion: 10,
      categoria: "visualizacion",
      completado: true,
      beneficios: ["Aumenta confianza", "Mejora rendimiento", "Reduce miedo"],
    },
    {
      id: 3,
      titulo: "Mindfulness Trading",
      descripcion: "Mantén atención plena durante el trading",
      duracion: 15,
      categoria: "mindfulness",
      completado: false,
      beneficios: ["Mejora decisiones", "Reduce impulsividad", "Aumenta claridad"],
    },
    {
      id: 4,
      titulo: "Relajación Muscular",
      descripcion: "Libera tensión física acumulada",
      duracion: 12,
      categoria: "relajacion",
      completado: false,
      beneficios: ["Reduce tensión", "Mejora bienestar", "Aumenta energía"],
    },
  ])

  const moods = {
    happy: { icon: Smile, label: "Feliz", color: "text-green-400", bg: "bg-green-500/20" },
    neutral: { icon: Meh, label: "Neutral", color: "text-blue-400", bg: "bg-blue-500/20" },
    sad: { icon: Frown, label: "Triste", color: "text-red-400", bg: "bg-red-500/20" },
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Timer de meditación
  useEffect(() => {
    let interval
    if (isTimerRunning && timerDisplay > 0) {
      interval = setInterval(() => {
        setTimerDisplay((prev) => prev - 1)
      }, 1000)
    } else if (timerDisplay === 0) {
      setIsTimerRunning(false)
      if (soundEnabled) {
        // Aquí iría el sonido de finalización
        console.log("🔔 Sesión de meditación completada!")
      }
      // Actualizar estadísticas
      setMentalStats((prev) => ({
        ...prev,
        sesionesCompletadas: prev.sesionesCompletadas + 1,
        tiempoMeditacion: prev.tiempoMeditacion + meditationTimer / 60,
      }))
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timerDisplay, soundEnabled, meditationTimer])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimerDisplay(meditationTimer)
  }

  const completeExercise = (id) => {
    setExercises((prev) => prev.map((ex) => (ex.id === id ? { ...ex, completado: !ex.completado } : ex)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white relative overflow-hidden">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 rounded-xl border border-slate-600/30 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Dashboard</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  <option value="semana">Última semana</option>
                  <option value="mes">Último mes</option>
                  <option value="trimestre">Último trimestre</option>
                </select>
              </div>
              <div className="text-right">
                <p className="text-lg font-mono font-bold text-purple-400">{currentTime.toLocaleTimeString("es-AR")}</p>
                <p className="text-xs text-slate-400">Tiempo Real</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Progreso Mental
            </h1>
            <p className="text-slate-400 max-w-3xl">
              Centro de bienestar psicológico para traders. Monitorea tu salud mental, practica mindfulness y desarrolla
              disciplina emocional.
            </p>
          </div>

          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <MetricCard
              icon={Brain}
              label="Bienestar General"
              value={`${mentalStats.bienestarGeneral}%`}
              color="from-purple-500 to-pink-500"
              trend="up"
            />
            <MetricCard
              icon={Heart}
              label="Control Emocional"
              value={`${mentalStats.controlEmocional}%`}
              color="from-red-500 to-pink-500"
              trend="up"
            />
            <MetricCard
              icon={Target}
              label="Disciplina"
              value={`${mentalStats.disciplina}%`}
              color="from-blue-500 to-cyan-500"
              trend="stable"
            />
            <MetricCard
              icon={Flame}
              label="Racha Actual"
              value={`${mentalStats.rachaActual} días`}
              color="from-orange-500 to-red-500"
              trend="up"
            />
          </div>
        </header>

        {/* Navegación por tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-800/30 p-1 rounded-xl border border-slate-600/30 backdrop-blur-sm">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "meditacion", label: "Meditación", icon: Brain },
              { id: "ejercicios", label: "Ejercicios", icon: Activity },
              { id: "analisis", label: "Análisis", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido según tab */}
        {activeTab === "dashboard" && (
          <DashboardTab mentalStats={mentalStats} dailyMood={dailyMood} moods={moods} exercises={exercises} />
        )}

        {activeTab === "meditacion" && (
          <MeditacionTab
            timerDisplay={timerDisplay}
            isTimerRunning={isTimerRunning}
            meditationTimer={meditationTimer}
            setMeditationTimer={setMeditationTimer}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
            formatTime={formatTime}
            mentalStats={mentalStats}
          />
        )}

        {activeTab === "ejercicios" && <EjerciciosTab exercises={exercises} completeExercise={completeExercise} />}

        {activeTab === "analisis" && (
          <AnalisisTab mentalStats={mentalStats} dailyMood={dailyMood} moods={moods} selectedPeriod={selectedPeriod} />
        )}
      </div>
    </div>
  )
}

// Componente MetricCard
function MetricCard({ icon: Icon, label, value, color, trend }) {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Activity,
  }

  const TrendIcon = trendIcons[trend]

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div
            className={`p-1 rounded-lg ${
              trend === "up" ? "bg-green-500/20" : trend === "down" ? "bg-red-500/20" : "bg-blue-500/20"
            }`}
          >
            <TrendIcon
              className={`w-3 h-3 ${
                trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-blue-400"
              }`}
            />
          </div>
        )}
      </div>
      <p className="text-xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}

// Tab Dashboard
function DashboardTab({ mentalStats, dailyMood, moods, exercises }) {
  const completedExercises = exercises.filter((ex) => ex.completado).length
  const totalExercises = exercises.length

  return (
    <div className="space-y-6">
      {/* Estado actual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bienestar general */}
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-400 w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Estado Mental Actual</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Bienestar General</span>
              <span className="text-sm font-medium text-white">{mentalStats.bienestarGeneral}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${mentalStats.bienestarGeneral}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Control Emocional</span>
              <span className="text-sm font-medium text-white">{mentalStats.controlEmocional}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${mentalStats.controlEmocional}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Nivel de Estrés</span>
              <span className="text-sm font-medium text-white">{mentalStats.estres}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${mentalStats.estres}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Estado de ánimo semanal */}
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Smile className="text-yellow-400 w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Estado de Ánimo Semanal</h3>
          </div>

          <div className="space-y-3">
            {dailyMood.slice(0, 7).map((day, index) => (
              <div key={day.fecha} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16">
                    {new Date(day.fecha).toLocaleDateString("es-AR", { weekday: "short" })}
                  </span>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${moods[day.mood].bg}`}>
                    {React.createElement(moods[day.mood].icon, {
                      className: `w-4 h-4 ${moods[day.mood].color}`,
                    })}
                    <span className="text-xs text-white">{moods[day.mood].label}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-slate-700 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${day.energia}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400 w-8">{day.energia}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progreso de ejercicios */}
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="text-green-400 w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Progreso de Ejercicios</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              {exercises.filter((ex) => ex.completado).length}/{exercises.length}
            </p>
            <p className="text-xs text-slate-400">Completados hoy</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.slice(0, 4).map((exercise) => (
            <div
              key={exercise.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                exercise.completado ? "bg-green-500/20 border-green-500/50" : "bg-slate-700/30 border-slate-600/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white text-sm">{exercise.titulo}</h4>
                {exercise.completado && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              <p className="text-xs text-slate-400 mb-2">{exercise.descripcion}</p>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-400">{exercise.duracion} min</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-300">Beneficios:</h4>
                <ul className="space-y-1">
                  {exercise.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full mt-4 px-4 py-2 rounded-lg transition-all duration-300 ${
                  exercise.completado
                    ? "bg-green-500/20 text-green-400 cursor-default"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white"
                }`}
              >
                {exercise.completado ? "Completado ✓" : "Comenzar Ejercicio"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-600/30 backdrop-blur-sm text-center">
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white mb-2">{mentalStats.mejorRacha}</p>
          <p className="text-xs text-slate-400">Mejor racha</p>
        </div>
        <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-600/30 backdrop-blur-sm text-center">
          <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white mb-2">{mentalStats.sesionesCompletadas}</p>
          <p className="text-xs text-slate-400">Sesiones completadas</p>
        </div>
        <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-600/30 backdrop-blur-sm text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{Math.round(mentalStats.tiempoMeditacion / 60)}h</p>
          <p className="text-xs text-slate-400">Tiempo meditación</p>
        </div>
        <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-600/30 backdrop-blur-sm text-center">
          <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">
            {mentalStats.objetivosCompletados}/{mentalStats.objetivosSemana}
          </p>
          <p className="text-xs text-slate-400">Objetivos semana</p>
        </div>
      </div>
    </div>
  )
}

// Tab Meditación
function MeditacionTab({
  timerDisplay,
  isTimerRunning,
  meditationTimer,
  setMeditationTimer,
  soundEnabled,
  setSoundEnabled,
  startTimer,
  pauseTimer,
  resetTimer,
  formatTime,
  mentalStats,
}) {
  const presets = [
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "15 min", value: 900 },
    { label: "20 min", value: 1200 },
  ]

  return (
    <div className="space-y-6">
      {/* Timer principal */}
      <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Sesión de Meditación</h3>
          <p className="text-slate-400">Encuentra tu centro antes de tradear</p>
        </div>

        {/* Display del timer */}
        <div className="mb-8">
          <div className="w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="w-40 h-40 bg-slate-800/50 rounded-full flex items-center justify-center">
              <span className="text-4xl font-mono font-bold text-white">{formatTime(timerDisplay)}</span>
            </div>
            {/* Círculo de progreso */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-slate-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - (meditationTimer - timerDisplay) / meditationTimer)}`}
                className="text-purple-400 transition-all duration-1000"
              />
            </svg>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={isTimerRunning ? pauseTimer : startTimer}
            className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 rounded-full flex items-center justify-center transition-all duration-300"
          >
            {isTimerRunning ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-12 h-12 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <RotateCcw className="w-5 h-5 text-slate-400" />
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-12 h-12 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-slate-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Presets de tiempo */}
        <div className="flex justify-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setMeditationTimer(preset.value)
                setTimerDisplay(preset.value)
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                meditationTimer === preset.value
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Técnicas de meditación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Técnicas Recomendadas
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Respiración Consciente</h4>
              <p className="text-sm text-slate-400">Enfócate en tu respiración natural. Ideal para principiantes.</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Body Scan</h4>
              <p className="text-sm text-slate-400">Recorre mentalmente tu cuerpo liberando tensiones.</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Visualización</h4>
              <p className="text-sm text-slate-400">Imagina escenarios de trading exitosos y calmados.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Tu Progreso
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Sesiones completadas</span>
              <span className="text-lg font-bold text-white">{mentalStats.sesionesCompletadas}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Tiempo total</span>
              <span className="text-lg font-bold text-white">
                {Math.round(mentalStats.tiempoMeditacion / 60)}h {mentalStats.tiempoMeditacion % 60}m
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Racha actual</span>
              <span className="text-lg font-bold text-white">{mentalStats.rachaActual} días</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Mejor racha</span>
              <span className="text-lg font-bold text-white">{mentalStats.mejorRacha} días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tab Ejercicios
function EjerciciosTab({ exercises, completeExercise }) {
  const categorias = {
    respiracion: { label: "Respiración", color: "from-blue-500 to-cyan-500", icon: Activity },
    visualizacion: { label: "Visualización", color: "from-purple-500 to-pink-500", icon: Eye },
    mindfulness: { label: "Mindfulness", color: "from-green-500 to-emerald-500", icon: Brain },
    relajacion: { label: "Relajación", color: "from-orange-500 to-red-500", icon: Heart },
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`bg-slate-800/30 rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300 ${
              exercise.completado
                ? "border-green-500/50 bg-green-500/10"
                : "border-slate-600/30 hover:border-slate-500/50"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${categorias[exercise.categoria].color} rounded-xl flex items-center justify-center`}
                >
                  {React.createElement(categorias[exercise.categoria].icon, {
                    className: "w-6 h-6 text-white",
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{exercise.titulo}</h3>
                  <p className="text-sm text-slate-400">{categorias[exercise.categoria].label}</p>
                </div>
              </div>
              <button
                onClick={() => completeExercise(exercise.id)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  exercise.completado
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-300 mb-4">{exercise.descripcion}</p>

            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-400">{exercise.duracion} minutos</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Beneficios:</h4>
              <ul className="space-y-1">
                {exercise.beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    {beneficio}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full mt-4 px-4 py-2 rounded-lg transition-all duration-300 ${
                exercise.completado
                  ? "bg-green-500/20 text-green-400 cursor-default"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white"
              }`}
            >
              {exercise.completado ? "Completado ✓" : "Comenzar Ejercicio"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tab Análisis
function AnalisisTab({ mentalStats, dailyMood, moods, selectedPeriod }) {
  const promedioEnergia = dailyMood.reduce((acc, day) => acc + day.energia, 0) / dailyMood.length
  const promedioEstres = dailyMood.reduce((acc, day) => acc + day.estres, 0) / dailyMood.length

  const distribucionMood = dailyMood.reduce((acc, day) => {
    acc[day.mood] = (acc[day.mood] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Energía Promedio
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-2">{promedioEnergia.toFixed(0)}%</p>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${promedioEnergia}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Estrés Promedio
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-400 mb-2">{promedioEstres.toFixed(0)}%</p>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${promedioEstres}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            Bienestar General
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-pink-400 mb-2">{mentalStats.bienestarGeneral}%</p>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${mentalStats.bienestarGeneral}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribución de estados de ánimo */}
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          Distribución de Estados de Ánimo
        </h3>
        <div className="space-y-4">
          {Object.entries(distribucionMood).map(([mood, count]) => (
            <div key={mood} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {React.createElement(moods[mood].icon, {
                  className: `w-5 h-5 ${moods[mood].color}`,
                })}
                <span className="text-white font-medium">{moods[mood].label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      mood === "happy"
                        ? "bg-gradient-to-r from-green-500 to-emerald-400"
                        : mood === "neutral"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                          : "bg-gradient-to-r from-red-500 to-pink-400"
                    }`}
                    style={{ width: `${(count / dailyMood.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white font-bold w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights y recomendaciones */}
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-400" />
          Insights y Recomendaciones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Patrón Identificado</h4>
            <p className="text-sm text-slate-400">
              Tu energía es más alta los{" "}
              {dailyMood.filter((d) => d.energia > 80).length > 3 ? "primeros días de la semana" : "fines de semana"}.
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Recomendación</h4>
            <p className="text-sm text-slate-400">
              {promedioEstres > 50
                ? "Considera aumentar las sesiones de meditación para reducir el estrés."
                : "Mantén tu rutina actual, tu nivel de estrés está controlado."}
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Objetivo Sugerido</h4>
            <p className="text-sm text-slate-400">
              Intenta mantener tu energía por encima del 75% durante toda la semana.
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Próximo Hito</h4>
            <p className="text-sm text-slate-400">
              Te faltan {30 - mentalStats.rachaActual} días para alcanzar una racha de 30 días.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
