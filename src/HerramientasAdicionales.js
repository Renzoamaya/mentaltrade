"use client"

import React, { useState, useEffect } from "react"
import {
  Activity,
  Target,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  X,
  Volume2,
  TrendingUp,
  Eye,
  Brain,
  Heart,
  Star,
  AlertTriangle,
  Trophy,
} from "lucide-react"

// Timer de Trading con técnica Pomodoro
export function TradingTimer({ isOpen, onClose }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutos
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState("work") // work, shortBreak, longBreak
  const [sessions, setSessions] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const modes = {
    work: { duration: 25 * 60, label: "Sesión de Trading", color: "from-blue-500 to-cyan-500" },
    shortBreak: { duration: 5 * 60, label: "Descanso Corto", color: "from-green-500 to-emerald-500" },
    longBreak: { duration: 15 * 60, label: "Descanso Largo", color: "from-purple-500 to-pink-500" },
  }

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (soundEnabled) {
        // Sonido de finalización
        console.log("🔔 Sesión completada!")
      }

      // Auto-cambio de modo
      if (mode === "work") {
        setSessions((prev) => prev + 1)
        const nextMode = sessions > 0 && (sessions + 1) % 4 === 0 ? "longBreak" : "shortBreak"
        setMode(nextMode)
        setTimeLeft(modes[nextMode].duration)
      } else {
        setMode("work")
        setTimeLeft(modes.work.duration)
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode, sessions, soundEnabled])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => setIsRunning(!isRunning)
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(modes[mode].duration)
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setTimeLeft(modes[newMode].duration)
    setIsRunning(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/30 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Timer de Trading</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Selector de modo */}
        <div className="flex gap-2 mb-6">
          {Object.entries(modes).map(([key, modeData]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                mode === key
                  ? `bg-gradient-to-r ${modeData.color} text-white`
                  : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50"
              }`}
            >
              {modeData.label}
            </button>
          ))}
        </div>

        {/* Timer display */}
        <div className="text-center mb-6">
          <div
            className={`w-32 h-32 bg-gradient-to-r ${modes[mode].color} rounded-full flex items-center justify-center mx-auto mb-4 relative`}
          >
            <div className="w-28 h-28 bg-slate-800/80 rounded-full flex items-center justify-center">
              <span className="text-2xl font-mono font-bold text-white">{formatTime(timeLeft)}</span>
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
                strokeDashoffset={`${2 * Math.PI * 45 * (timeLeft / modes[mode].duration)}`}
                className="text-white transition-all duration-1000"
              />
            </svg>
          </div>
          <p className="text-slate-400">{modes[mode].label}</p>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`w-12 h-12 bg-gradient-to-r ${modes[mode].color} hover:brightness-110 rounded-full flex items-center justify-center transition-all duration-300`}
          >
            {isRunning ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <Volume2 className={`w-4 h-4 ${soundEnabled ? "text-blue-400" : "text-slate-400"}`} />
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{sessions}</p>
            <p className="text-xs text-slate-400">Sesiones hoy</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{Math.floor((sessions * 25) / 60)}h</p>
            <p className="text-xs text-slate-400">Tiempo total</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Monitor Emocional en tiempo real
export function MonitorEmocional({ isOpen, onClose }) {
  const [currentMood, setCurrentMood] = useState("neutral")
  const [energyLevel, setEnergyLevel] = useState(75)
  const [stressLevel, setStressLevel] = useState(30)
  const [notes, setNotes] = useState("")
  const [moodHistory, setMoodHistory] = useState([])

  const moods = {
    excited: { icon: Star, label: "Emocionado", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    confident: { icon: CheckCircle, label: "Confiado", color: "text-green-400", bg: "bg-green-500/20" },
    neutral: { icon: Activity, label: "Neutral", color: "text-blue-400", bg: "bg-blue-500/20" },
    anxious: { icon: AlertTriangle, label: "Ansioso", color: "text-orange-400", bg: "bg-orange-500/20" },
    frustrated: { icon: X, label: "Frustrado", color: "text-red-400", bg: "bg-red-500/20" },
  }

  const saveMoodEntry = () => {
    const entry = {
      id: Date.now(),
      mood: currentMood,
      energy: energyLevel,
      stress: stressLevel,
      notes,
      timestamp: new Date().toISOString(),
    }

    setMoodHistory((prev) => [entry, ...prev.slice(0, 9)]) // Mantener últimas 10 entradas
    setNotes("")

    // Aquí podrías guardar en localStorage o enviar a una API
    console.log("Estado emocional guardado:", entry)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/30 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Monitor Emocional</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Estado actual */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-300 mb-3">¿Cómo te sientes ahora?</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(moods).map(([key, mood]) => (
              <button
                key={key}
                onClick={() => setCurrentMood(key)}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                  currentMood === key
                    ? `border-blue-500 ${mood.bg}`
                    : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                }`}
              >
                <mood.icon className={`w-4 h-4 ${mood.color}`} />
                <span className="text-sm text-white">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Niveles de energía y estrés */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">Nivel de Energía</label>
              <span className="text-sm text-white">{energyLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">Nivel de Estrés</label>
              <span className="text-sm text-white">{stressLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Notas */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Notas (opcional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="¿Qué está influyendo en tu estado emocional?"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Botón guardar */}
        <button
          onClick={saveMoodEntry}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 rounded-lg transition-all duration-300 font-semibold text-white mb-6"
        >
          Registrar Estado
        </button>

        {/* Historial reciente */}
        {moodHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Historial Reciente</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {moodHistory.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    {React.createElement(moods[entry.mood].icon, {
                      className: `w-4 h-4 ${moods[entry.mood].color}`,
                    })}
                    <span className="text-sm text-white">{moods[entry.mood].label}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(entry.timestamp).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Sistema de Objetivos Diarios
export function ObjetivosDiarios({ isOpen, onClose }) {
  const [objetivos, setObjetivos] = useState([
    { id: 1, texto: "Completar máximo 3 trades", completado: false, categoria: "trading" },
    { id: 2, texto: "Meditar 10 minutos", completado: true, categoria: "bienestar" },
    { id: 3, texto: "Respetar todos los stop loss", completado: false, categoria: "disciplina" },
    { id: 4, texto: "Registrar emociones post-trading", completado: true, categoria: "psicologia" },
  ])

  const [nuevoObjetivo, setNuevoObjetivo] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("trading")

  const categorias = {
    trading: { label: "Trading", color: "from-blue-500 to-cyan-500", icon: BarChart3 },
    disciplina: { label: "Disciplina", color: "from-red-500 to-pink-500", icon: Target },
    bienestar: { label: "Bienestar", color: "from-green-500 to-emerald-500", icon: Heart },
    psicologia: { label: "Psicología", color: "from-purple-500 to-pink-500", icon: Brain },
  }

  const toggleObjetivo = (id) => {
    setObjetivos((prev) => prev.map((obj) => (obj.id === id ? { ...obj, completado: !obj.completado } : obj)))
  }

  const agregarObjetivo = () => {
    if (nuevoObjetivo.trim()) {
      const objetivo = {
        id: Date.now(),
        texto: nuevoObjetivo,
        completado: false,
        categoria: categoriaSeleccionada,
      }
      setObjetivos((prev) => [...prev, objetivo])
      setNuevoObjetivo("")
    }
  }

  const eliminarObjetivo = (id) => {
    setObjetivos((prev) => prev.filter((obj) => obj.id !== id))
  }

  const objetivosCompletados = objetivos.filter((obj) => obj.completado).length
  const porcentajeCompletado = (objetivosCompletados / objetivos.length) * 100

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/30 max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Objetivos Diarios</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Progreso general */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Progreso del día</span>
            <span className="text-sm font-medium text-white">
              {objetivosCompletados}/{objetivos.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${porcentajeCompletado}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">{porcentajeCompletado.toFixed(0)}% completado</p>
        </div>

        {/* Lista de objetivos */}
        <div className="space-y-3 mb-6">
          {objetivos.map((objetivo) => (
            <div
              key={objetivo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                objetivo.completado ? "bg-green-500/20 border-green-500/50" : "bg-slate-700/30 border-slate-600/30"
              }`}
            >
              <button
                onClick={() => toggleObjetivo(objetivo.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                  objetivo.completado ? "bg-green-500 border-green-500" : "border-slate-500 hover:border-slate-400"
                }`}
              >
                {objetivo.completado && <CheckCircle className="w-3 h-3 text-white" />}
              </button>

              <div className="flex-1">
                <p className={`text-sm ${objetivo.completado ? "text-green-300 line-through" : "text-white"}`}>
                  {objetivo.texto}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {React.createElement(categorias[objetivo.categoria].icon, {
                    className: "w-3 h-3 text-slate-500",
                  })}
                  <span className="text-xs text-slate-500">{categorias[objetivo.categoria].label}</span>
                </div>
              </div>

              <button
                onClick={() => eliminarObjetivo(objetivo.id)}
                className="p-1 hover:bg-red-500/20 rounded transition-colors duration-300"
              >
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Agregar nuevo objetivo */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
            >
              {Object.entries(categorias).map(([key, categoria]) => (
                <option key={key} value={key}>
                  {categoria.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={nuevoObjetivo}
              onChange={(e) => setNuevoObjetivo(e.target.value)}
              placeholder="Nuevo objetivo..."
              className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && agregarObjetivo()}
            />
          </div>
          <button
            onClick={agregarObjetivo}
            disabled={!nuevoObjetivo.trim()}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-300 font-semibold text-white"
          >
            Agregar Objetivo
          </button>
        </div>

        {/* Motivación */}
        {porcentajeCompletado === 100 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-green-300 font-semibold">¡Felicitaciones!</p>
            <p className="text-sm text-green-400">Has completado todos tus objetivos del día</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Analytics Pro
export function AnalyticsPro({ isOpen, onClose }) {
  const [selectedPeriod, setSelectedPeriod] = useState("semana")
  const [selectedMetric, setSelectedMetric] = useState("rendimiento")

  // Datos simulados
  const analytics = {
    rendimiento: {
      winRate: 68,
      profitFactor: 1.45,
      sharpeRatio: 1.23,
      maxDrawdown: 12.5,
      avgWin: 85.5,
      avgLoss: 45.2,
      totalTrades: 156,
      profitableTrades: 106,
    },
    psicologia: {
      controlEmocional: 78,
      disciplina: 85,
      consistencia: 72,
      gestionRiesgo: 90,
      paciencia: 65,
      confianza: 82,
    },
    patrones: {
      mejorHora: "10:00-11:00",
      peorHora: "15:00-16:00",
      mejorDia: "Martes",
      peorDia: "Viernes",
      pairMasRentable: "EUR/USD",
      pairMenosRentable: "GBP/JPY",
    },
  }

  const metricas = {
    rendimiento: { label: "Rendimiento", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    psicologia: { label: "Psicología", icon: Brain, color: "from-purple-500 to-pink-500" },
    patrones: { label: "Patrones", icon: Eye, color: "from-blue-500 to-cyan-500" },
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/30 max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Analytics Pro</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="semana">Última semana</option>
            <option value="mes">Último mes</option>
            <option value="trimestre">Último trimestre</option>
            <option value="año">Último año</option>
          </select>

          <div className="flex gap-1 bg-slate-700/30 p-1 rounded-lg">
            {Object.entries(metricas).map(([key, metrica]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`flex items-center gap-2 px-3 py-1 rounded transition-all duration-300 ${
                  selectedMetric === key
                    ? `bg-gradient-to-r ${metrica.color} text-white`
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <metrica.icon className="w-4 h-4" />
                <span className="text-sm">{metrica.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido según métrica seleccionada */}
        {selectedMetric === "rendimiento" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalyticsCard
                title="Win Rate"
                value={`${analytics.rendimiento.winRate}%`}
                subtitle={`${analytics.rendimiento.profitableTrades}/${analytics.rendimiento.totalTrades} trades`}
                color="from-green-500 to-emerald-500"
                icon={Target}
              />
              <AnalyticsCard
                title="Profit Factor"
                value={analytics.rendimiento.profitFactor}
                subtitle="Ganancia/Pérdida"
                color="from-blue-500 to-cyan-500"
                icon={TrendingUp}
              />
              <AnalyticsCard
                title="Sharpe Ratio"
                value={analytics.rendimiento.sharpeRatio}
                subtitle="Riesgo ajustado"
                color="from-purple-500 to-pink-500"
                icon={BarChart3}
              />
              <AnalyticsCard
                title="Max Drawdown"
                value={`${analytics.rendimiento.maxDrawdown}%`}
                subtitle="Pérdida máxima"
                color="from-red-500 to-pink-500"
                icon={AlertTriangle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Análisis de Trades</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ganancia promedio:</span>
                    <span className="text-green-400">${analytics.rendimiento.avgWin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pérdida promedio:</span>
                    <span className="text-red-400">${analytics.rendimiento.avgLoss}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total trades:</span>
                    <span className="text-white">{analytics.rendimiento.totalTrades}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Distribución de Resultados</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">Trades ganadores</span>
                      <span className="text-green-400">{analytics.rendimiento.winRate}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full"
                        style={{ width: `${analytics.rendimiento.winRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">Trades perdedores</span>
                      <span className="text-red-400">{100 - analytics.rendimiento.winRate}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-400 h-full rounded-full"
                        style={{ width: `${100 - analytics.rendimiento.winRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === "psicologia" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analytics.psicologia).map(([key, value]) => (
                <div key={key} className="bg-slate-700/30 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-white capitalize">{key.replace(/([A-Z])/g, " $1")}</h4>
                    <span className="text-lg font-bold text-white">{value}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        value >= 80
                          ? "bg-gradient-to-r from-green-500 to-emerald-400"
                          : value >= 60
                            ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                            : "bg-gradient-to-r from-red-500 to-pink-400"
                      }`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-700/30 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Recomendaciones Personalizadas</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">
                    Tu nivel de paciencia está por debajo del promedio. Considera practicar técnicas de mindfulness.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">Excelente gestión de riesgo. Mantén esta disciplina.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">Tu consistencia puede mejorar. Revisa tu plan de trading.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === "patrones" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Patrones Temporales</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mejor hora:</span>
                    <span className="text-green-400">{analytics.patrones.mejorHora}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peor hora:</span>
                    <span className="text-red-400">{analytics.patrones.peorHora}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mejor día:</span>
                    <span className="text-green-400">{analytics.patrones.mejorDia}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peor día:</span>
                    <span className="text-red-400">{analytics.patrones.peorDia}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Instrumentos</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Más rentable:</span>
                    <span className="text-green-400">{analytics.patrones.pairMasRentable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Menos rentable:</span>
                    <span className="text-red-400">{analytics.patrones.pairMenosRentable}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Insights Avanzados</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-600/30 rounded-lg">
                  <h5 className="font-medium text-white mb-1">Patrón Detectado</h5>
                  <p className="text-sm text-slate-400">Tus mejores trades ocurren los martes entre 10:00-11:00 AM</p>
                </div>
                <div className="p-3 bg-slate-600/30 rounded-lg">
                  <h5 className="font-medium text-white mb-1">Oportunidad</h5>
                  <p className="text-sm text-slate-400">Evita tradear EUR/USD los viernes después de las 15:00</p>
                </div>
                <div className="p-3 bg-slate-600/30 rounded-lg">
                  <h5 className="font-medium text-white mb-1">Fortaleza</h5>
                  <p className="text-sm text-slate-400">
                    Tu disciplina mejora significativamente después de sesiones de meditación
                  </p>
                </div>
                <div className="p-3 bg-slate-600/30 rounded-lg">
                  <h5 className="font-medium text-white mb-1">Área de Mejora</h5>
                  <p className="text-sm text-slate-400">Considera reducir el tamaño de posición en GBP/JPY</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente AnalyticsCard
function AnalyticsCard({ title, value, subtitle, color, icon: Icon }) {
  return (
    <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-slate-400">{title}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  )
}
