"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Calendar,
  TrendingUp,
  Target,
  Brain,
  DollarSign,
  Star,
  AlertTriangle,
  X,
  Search,
  Download,
  Eye,
  BarChart3,
  Smile,
  Frown,
  Meh,
  Zap,
  Shield,
} from "lucide-react"

export default function RegistroDiario({ onBack }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("hoy")
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("todos")
  const [selectedPeriod, setSelectedPeriod] = useState("semana")

  // Estados para nueva entrada
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    trades: [],
    emotions: {
      preSession: "neutral",
      postSession: "neutral",
      energy: 75,
      stress: 30,
      confidence: 70,
    },
    goals: [],
    learnings: "",
    improvements: "",
    gratitude: "",
    tomorrowPlan: "",
    marketConditions: "",
    sessionRating: 5,
  })

  // Datos simulados de entradas de journal
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "2024-01-15",
      trades: [
        { pair: "EUR/USD", type: "BUY", result: 45.5, emotion: "confident", time: "10:30" },
        { pair: "GBP/JPY", type: "SELL", result: -23.75, emotion: "frustrated", time: "14:15" },
      ],
      emotions: {
        preSession: "excited",
        postSession: "neutral",
        energy: 85,
        stress: 40,
        confidence: 75,
      },
      goals: ["Máximo 3 trades", "Respetar stop loss", "Meditar antes de tradear"],
      learnings:
        "Noté que cuando el mercado está muy volátil, tiendo a ser más impulsivo. Debo respirar más profundo antes de entrar.",
      improvements: "Implementar una pausa de 30 segundos antes de cada trade.",
      gratitude: "Agradecido por mantener la disciplina en el segundo trade a pesar de la pérdida.",
      tomorrowPlan: "Enfocarme en EUR/USD únicamente. Revisar análisis técnico antes de la sesión.",
      marketConditions: "Mercado volátil por noticias de BCE. Spreads más amplios de lo normal.",
      sessionRating: 7,
      totalPnL: 21.75,
      tradesCount: 2,
      winRate: 50,
    },
    {
      id: 2,
      date: "2024-01-14",
      trades: [
        { pair: "USD/JPY", type: "BUY", result: 67.25, emotion: "confident", time: "09:45" },
        { pair: "AUD/USD", type: "SELL", result: 89.1, emotion: "excited", time: "11:20" },
        { pair: "EUR/GBP", type: "BUY", result: -45.3, emotion: "anxious", time: "15:45" },
      ],
      emotions: {
        preSession: "confident",
        postSession: "satisfied",
        energy: 90,
        stress: 25,
        confidence: 85,
      },
      goals: ["Mantener win rate >70%", "No más de 3 trades", "Seguir plan estrictamente"],
      learnings:
        "Excelente día de trading. Mi análisis pre-mercado fue muy acertado. La clave fue esperar las confirmaciones.",
      improvements: "Continuar con la rutina actual. Tal vez aumentar ligeramente el tamaño de posición.",
      gratitude: "Muy agradecido por la paciencia mostrada en las primeras dos operaciones.",
      tomorrowPlan: "Mantener la misma estrategia. Buscar setups similares en las mismas sesiones.",
      marketConditions: "Tendencia clara en USD. Datos económicos favorables. Baja volatilidad.",
      sessionRating: 9,
      totalPnL: 111.05,
      tradesCount: 3,
      winRate: 67,
    },
  ])

  const emociones = {
    excited: { icon: Zap, label: "Emocionado", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    confident: { icon: Shield, label: "Confiado", color: "text-green-400", bg: "bg-green-500/20" },
    neutral: { icon: Meh, label: "Neutral", color: "text-blue-400", bg: "bg-blue-500/20" },
    anxious: { icon: AlertTriangle, label: "Ansioso", color: "text-orange-400", bg: "bg-orange-500/20" },
    frustrated: { icon: Frown, label: "Frustrado", color: "text-red-400", bg: "bg-red-500/20" },
    satisfied: { icon: Smile, label: "Satisfecho", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.learnings.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.improvements.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterBy === "todos") return matchesSearch
    if (filterBy === "profitable") return entry.totalPnL > 0 && matchesSearch
    if (filterBy === "loss") return entry.totalPnL < 0 && matchesSearch
    if (filterBy === "highRating") return entry.sessionRating >= 8 && matchesSearch

    return matchesSearch
  })

  const saveNewEntry = () => {
    const entry = {
      id: Date.now(),
      date: newEntry.date,
      trades: newEntry.trades,
      emotions: newEntry.emotions,
      goals: newEntry.goals,
      learnings: newEntry.learnings,
      improvements: newEntry.improvements,
      gratitude: newEntry.gratitude,
      tomorrowPlan: newEntry.tomorrowPlan,
      marketConditions: newEntry.marketConditions,
      sessionRating: newEntry.sessionRating,
      totalPnL: newEntry.trades.reduce((sum, trade) => sum + trade.result, 0),
      tradesCount: newEntry.trades.length,
      winRate:
        newEntry.trades.length > 0
          ? (newEntry.trades.filter((t) => t.result > 0).length / newEntry.trades.length) * 100
          : 0,
    }

    setJournalEntries((prev) => [entry, ...prev])
    setShowNewEntry(false)

    // Reset form
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      trades: [],
      emotions: {
        preSession: "neutral",
        postSession: "neutral",
        energy: 75,
        stress: 30,
        confidence: 70,
      },
      goals: [],
      learnings: "",
      improvements: "",
      gratitude: "",
      tomorrowPlan: "",
      marketConditions: "",
      sessionRating: 5,
    })
  }

  const addTrade = () => {
    setNewEntry((prev) => ({
      ...prev,
      trades: [
        ...prev.trades,
        {
          pair: "",
          type: "BUY",
          result: 0,
          emotion: "neutral",
          time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <button
                onClick={() => setShowNewEntry(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 rounded-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Entrada</span>
              </button>

              <div className="text-right">
                <p className="text-lg font-mono font-bold text-blue-400">{currentTime.toLocaleTimeString("es-AR")}</p>
                <p className="text-xs text-slate-400">{currentTime.toLocaleDateString("es-AR")}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Registro Diario de Trading
            </h1>
            <p className="text-slate-400 max-w-3xl">
              Tu journal personal de trading. Registra trades, emociones, aprendizajes y planifica tus próximas
              sesiones.
            </p>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-slate-400">Entradas</span>
              </div>
              <p className="text-2xl font-bold text-white">{journalEntries.length}</p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-400">PnL Promedio</span>
              </div>
              <p className="text-2xl font-bold text-green-400">
                $
                {(journalEntries.reduce((sum, entry) => sum + entry.totalPnL, 0) / journalEntries.length || 0).toFixed(
                  2,
                )}
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-slate-400">Win Rate</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">
                {Math.round(journalEntries.reduce((sum, entry) => sum + entry.winRate, 0) / journalEntries.length || 0)}
                %
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-slate-400">Rating Promedio</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">
                {(
                  journalEntries.reduce((sum, entry) => sum + entry.sessionRating, 0) / journalEntries.length || 0
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </header>

        {/* Navegación y filtros */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-800/30 p-1 rounded-xl border border-slate-600/30 backdrop-blur-sm">
              {[
                { id: "hoy", label: "Hoy", icon: Calendar },
                { id: "historial", label: "Historial", icon: BookOpen },
                { id: "analisis", label: "Análisis", icon: BarChart3 },
                { id: "insights", label: "Insights", icon: Brain },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Filtros y búsqueda */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar en entradas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none w-64"
                />
              </div>

              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="todos">Todas las entradas</option>
                <option value="profitable">Solo rentables</option>
                <option value="loss">Solo pérdidas</option>
                <option value="highRating">Rating alto (8+)</option>
              </select>

              <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Contenido según tab */}
        {activeTab === "hoy" && (
          <TodayTab journalEntries={journalEntries} emociones={emociones} onNewEntry={() => setShowNewEntry(true)} />
        )}

        {activeTab === "historial" && (
          <HistorialTab entries={filteredEntries} emociones={emociones} searchTerm={searchTerm} />
        )}

        {activeTab === "analisis" && (
          <AnalysisTab entries={journalEntries} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
        )}

        {activeTab === "insights" && <InsightsTab entries={journalEntries} emociones={emociones} />}
      </div>

      {/* Modal nueva entrada */}
      {showNewEntry && (
        <NewEntryModal
          entry={newEntry}
          setEntry={setNewEntry}
          emociones={emociones}
          onSave={saveNewEntry}
          onClose={() => setShowNewEntry(false)}
          addTrade={addTrade}
        />
      )}
    </div>
  )
}

// Tab de Hoy
function TodayTab({ journalEntries, emociones, onNewEntry }) {
  const today = new Date().toISOString().split("T")[0]
  const todayEntry = journalEntries.find((entry) => entry.date === today)

  if (!todayEntry) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No hay entrada para hoy</h3>
        <p className="text-slate-400 mb-6">Comienza registrando tu sesión de trading de hoy.</p>
        <button
          onClick={onNewEntry}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 rounded-xl transition-all duration-300 font-semibold"
        >
          Crear Entrada de Hoy
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <EntryCard entry={todayEntry} emociones={emociones} isToday={true} />
    </div>
  )
}

// Tab de Historial
function HistorialTab({ entries, emociones, searchTerm }) {
  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No se encontraron entradas</h3>
          <p className="text-slate-400">
            {searchTerm ? `No hay resultados para "${searchTerm}"` : "No hay entradas que coincidan con el filtro."}
          </p>
        </div>
      ) : (
        entries.map((entry) => <EntryCard key={entry.id} entry={entry} emociones={emociones} />)
      )}
    </div>
  )
}

// Tab de Análisis
function AnalysisTab({ entries, selectedPeriod, setSelectedPeriod }) {
  const totalEntries = entries.length
  const avgPnL = entries.reduce((sum, entry) => sum + entry.totalPnL, 0) / totalEntries || 0
  const avgWinRate = entries.reduce((sum, entry) => sum + entry.winRate, 0) / totalEntries || 0
  const avgRating = entries.reduce((sum, entry) => sum + entry.sessionRating, 0) / totalEntries || 0
  const profitableDays = entries.filter((entry) => entry.totalPnL > 0).length
  const profitableRate = (profitableDays / totalEntries) * 100 || 0

  return (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-6 h-6 text-green-400" />
            <h3 className="font-semibold text-white">PnL Promedio</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">${avgPnL.toFixed(2)}</p>
          <p className="text-sm text-slate-400 mt-1">Por sesión</p>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-white">Win Rate</h3>
          </div>
          <p className="text-3xl font-bold text-blue-400">{avgWinRate.toFixed(1)}%</p>
          <p className="text-sm text-slate-400 mt-1">Promedio</p>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-yellow-400" />
            <h3 className="font-semibold text-white">Rating</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{avgRating.toFixed(1)}/10</p>
          <p className="text-sm text-slate-400 mt-1">Autoevaluación</p>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-white">Días Rentables</h3>
          </div>
          <p className="text-3xl font-bold text-purple-400">{profitableRate.toFixed(1)}%</p>
          <p className="text-sm text-slate-400 mt-1">
            {profitableDays}/{totalEntries} días
          </p>
        </div>
      </div>

      {/* Gráfico de progreso emocional */}
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Evolución Emocional</h3>
        <div className="space-y-4">
          {entries
            .slice(0, 7)
            .reverse()
            .map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-400 w-20">
                  {new Date(entry.date).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Energía:</span>
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full"
                          style={{ width: `${entry.emotions.energy}%` }}
                        ></div>
                      </div>
                      <span className="text-white w-8">{entry.emotions.energy}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Estrés:</span>
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-400 h-full rounded-full"
                          style={{ width: `${entry.emotions.stress}%` }}
                        ></div>
                      </div>
                      <span className="text-white w-8">{entry.emotions.stress}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${entry.totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                    ${entry.totalPnL.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

// Tab de Insights
function InsightsTab({ entries, emociones }) {
  // Análisis de patrones
  const bestEmotionalState = entries.reduce((best, entry) => {
    return entry.totalPnL > (best?.totalPnL || Number.NEGATIVE_INFINITY) ? entry : best
  }, null)

  const emotionPerformance = {}
  entries.forEach((entry) => {
    const emotion = entry.emotions.preSession
    if (!emotionPerformance[emotion]) {
      emotionPerformance[emotion] = { total: 0, count: 0, winRate: 0 }
    }
    emotionPerformance[emotion].total += entry.totalPnL
    emotionPerformance[emotion].count++
    emotionPerformance[emotion].winRate += entry.winRate
  })

  Object.keys(emotionPerformance).forEach((emotion) => {
    emotionPerformance[emotion].avg = emotionPerformance[emotion].total / emotionPerformance[emotion].count
    emotionPerformance[emotion].avgWinRate = emotionPerformance[emotion].winRate / emotionPerformance[emotion].count
  })

  return (
    <div className="space-y-6">
      {/* Insights principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Estado Emocional Óptimo
          </h3>
          {bestEmotionalState && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {React.createElement(emociones[bestEmotionalState.emotions.preSession].icon, {
                  className: `w-6 h-6 ${emociones[bestEmotionalState.emotions.preSession].color}`,
                })}
                <span className="text-white font-medium">
                  {emociones[bestEmotionalState.emotions.preSession].label}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Tu mejor día fue cuando iniciaste{" "}
                {emociones[bestEmotionalState.emotions.preSession].label.toLowerCase()}y obtuviste $
                {bestEmotionalState.totalPnL.toFixed(2)} con un {bestEmotionalState.winRate.toFixed(0)}% de win rate.
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Patrón de Mejora
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Días rentables:</span>
              <span className="text-green-400 font-bold">
                {Math.round((entries.filter((e) => e.totalPnL > 0).length / entries.length) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Mejor racha:</span>
              <span className="text-blue-400 font-bold">5 días</span>
            </div>
            <p className="text-sm text-slate-400">Tu consistencia ha mejorado un 23% en las últimas 2 semanas.</p>
          </div>
        </div>
      </div>

      {/* Performance por estado emocional */}
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Performance por Estado Emocional Inicial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(emotionPerformance).map(([emotion, data]) => (
            <div key={emotion} className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                {React.createElement(emociones[emotion]?.icon || Meh, {
                  className: `w-5 h-5 ${emociones[emotion]?.color || "text-slate-400"}`,
                })}
                <span className="font-medium text-white">{emociones[emotion]?.label || emotion}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">PnL Promedio:</span>
                  <span className={`font-bold ${data.avg >= 0 ? "text-green-400" : "text-red-400"}`}>
                    ${data.avg.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Win Rate:</span>
                  <span className="text-blue-400 font-bold">{data.avgWinRate.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Sesiones:</span>
                  <span className="text-white">{data.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Recomendaciones Basadas en Datos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Fortalezas</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Tu mejor rendimiento ocurre cuando inicias confiado</li>
              <li>• Mantienes disciplina en la gestión de riesgo</li>
              <li>• Tus autoevaluaciones son realistas</li>
            </ul>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2">Áreas de Mejora</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Evita tradear cuando inicias ansioso</li>
              <li>• Implementa rutina pre-trading más sólida</li>
              <li>• Considera sesiones más cortas los días estresantes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente EntryCard
function EntryCard({ entry, emociones, isToday = false }) {
  const [isExpanded, setIsExpanded] = useState(isToday)

  return (
    <div
      className={`bg-slate-800/30 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
        isToday ? "border-blue-500/50 bg-blue-500/10" : "border-slate-600/30 hover:border-slate-500/50"
      }`}
    >
      {/* Header de la entrada */}
      <div className="p-6 border-b border-slate-600/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-white">
                {new Date(entry.date).toLocaleDateString("es-AR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              {isToday && <span className="text-xs text-blue-400 uppercase tracking-wide">Sesión de hoy</span>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className={`text-2xl font-bold ${entry.totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                {entry.totalPnL >= 0 ? "+" : ""}${entry.totalPnL.toFixed(2)}
              </div>
              <div className="text-sm text-slate-400">
                {entry.tradesCount} trades • {entry.winRate.toFixed(0)}% win rate
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < entry.sessionRating ? "text-yellow-400 fill-current" : "text-slate-600"}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Estados emocionales */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Pre-sesión:</span>
            <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${emociones[entry.emotions.preSession].bg}`}>
              {React.createElement(emociones[entry.emotions.preSession].icon, {
                className: `w-4 h-4 ${emociones[entry.emotions.preSession].color}`,
              })}
              <span className="text-xs text-white">{emociones[entry.emotions.preSession].label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Post-sesión:</span>
            <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${emociones[entry.emotions.postSession].bg}`}>
              {React.createElement(emociones[entry.emotions.postSession].icon, {
                className: `w-4 h-4 ${emociones[entry.emotions.postSession].color}`,
              })}
              <span className="text-xs text-white">{emociones[entry.emotions.postSession].label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Energía:</span>
              <div className="w-16 bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full"
                  style={{ width: `${entry.emotions.energy}%` }}
                ></div>
              </div>
              <span className="text-xs text-white">{entry.emotions.energy}%</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Estrés:</span>
              <div className="w-16 bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-400 h-full rounded-full"
                  style={{ width: `${entry.emotions.stress}%` }}
                ></div>
              </div>
              <span className="text-xs text-white">{entry.emotions.stress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Trades */}
          {entry.trades.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Trades del Día
              </h4>
              <div className="space-y-2">
                {entry.trades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400">{trade.time}</span>
                      <span className="font-medium text-white">{trade.pair}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          trade.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trade.type}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${emociones[trade.emotion].bg}`}>
                        {React.createElement(emociones[trade.emotion].icon, {
                          className: `w-3 h-3 ${emociones[trade.emotion].color}`,
                        })}
                        <span className="text-xs text-white">{emociones[trade.emotion].label}</span>
                      </div>
                    </div>
                    <span className={`font-bold ${trade.result >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {trade.result >= 0 ? "+" : ""}${trade.result.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Journal sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Aprendizajes del Día</h4>
              <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3">
                {entry.learnings || "No hay aprendizajes registrados."}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Áreas de Mejora</h4>
              <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3">
                {entry.improvements || "No hay mejoras registradas."}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Gratitud</h4>
              <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3">
                {entry.gratitude || "No hay notas de gratitud."}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Plan para Mañana</h4>
              <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3">
                {entry.tomorrowPlan || "No hay plan registrado."}
              </p>
            </div>
          </div>

          {/* Condiciones del mercado */}
          <div>
            <h4 className="font-semibold text-white mb-2">Condiciones del Mercado</h4>
            <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3">
              {entry.marketConditions || "No hay notas sobre condiciones del mercado."}
            </p>
          </div>

          {/* Objetivos */}
          {entry.goals.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3">Objetivos del Día</h4>
              <div className="flex flex-wrap gap-2">
                {entry.goals.map((goal, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Modal para nueva entrada
function NewEntryModal({ entry, setEntry, emociones, onSave, onClose, addTrade }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm p-6 border-b border-slate-600/30">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Nueva Entrada de Journal</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Fecha</label>
            <input
              type="date"
              value={entry.date}
              onChange={(e) => setEntry((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Estados emocionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Estado Pre-Sesión</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(emociones).map(([key, emotion]) => (
                  <button
                    key={key}
                    onClick={() => setEntry((prev) => ({ ...prev, emotions: { ...prev.emotions, preSession: key } }))}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                      entry.emotions.preSession === key
                        ? `border-blue-500 ${emotion.bg}`
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                    }`}
                  >
                    <emotion.icon className={`w-4 h-4 ${emotion.color}`} />
                    <span className="text-xs text-white">{emotion.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Estado Post-Sesión</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(emociones).map(([key, emotion]) => (
                  <button
                    key={key}
                    onClick={() => setEntry((prev) => ({ ...prev, emotions: { ...prev.emotions, postSession: key } }))}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                      entry.emotions.postSession === key
                        ? `border-blue-500 ${emotion.bg}`
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                    }`}
                  >
                    <emotion.icon className={`w-4 h-4 ${emotion.color}`} />
                    <span className="text-xs text-white">{emotion.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Niveles emocionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Nivel de Energía</label>
                <span className="text-sm text-white">{entry.emotions.energy}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={entry.emotions.energy}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    emotions: { ...prev.emotions, energy: Number.parseInt(e.target.value) },
                  }))
                }
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Nivel de Estrés</label>
                <span className="text-sm text-white">{entry.emotions.stress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={entry.emotions.stress}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    emotions: { ...prev.emotions, stress: Number.parseInt(e.target.value) },
                  }))
                }
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Nivel de Confianza</label>
                <span className="text-sm text-white">{entry.emotions.confidence}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={entry.emotions.confidence}
                onChange={(e) =>
                  setEntry((prev) => ({
                    ...prev,
                    emotions: { ...prev.emotions, confidence: Number.parseInt(e.target.value) },
                  }))
                }
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Trades */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-slate-300">Trades del Día</label>
              <button
                onClick={addTrade}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors text-blue-400 text-sm"
              >
                <Plus className="w-3 h-3" />
                Agregar Trade
              </button>
            </div>

            <div className="space-y-3">
              {entry.trades.map((trade, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <input
                    type="text"
                    placeholder="Par (EUR/USD)"
                    value={trade.pair}
                    onChange={(e) => {
                      const newTrades = [...entry.trades]
                      newTrades[index].pair = e.target.value
                      setEntry((prev) => ({ ...prev, trades: newTrades }))
                    }}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                  />

                  <select
                    value={trade.type}
                    onChange={(e) => {
                      const newTrades = [...entry.trades]
                      newTrades[index].type = e.target.value
                      setEntry((prev) => ({ ...prev, trades: newTrades }))
                    }}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>

                  <input
                    type="number"
                    step="0.01"
                    placeholder="Resultado ($)"
                    value={trade.result}
                    onChange={(e) => {
                      const newTrades = [...entry.trades]
                      newTrades[index].result = Number.parseFloat(e.target.value) || 0
                      setEntry((prev) => ({ ...prev, trades: newTrades }))
                    }}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                  />

                  <select
                    value={trade.emotion}
                    onChange={(e) => {
                      const newTrades = [...entry.trades]
                      newTrades[index].emotion = e.target.value
                      setEntry((prev) => ({ ...prev, trades: newTrades }))
                    }}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {Object.entries(emociones).map(([key, emotion]) => (
                      <option key={key} value={key}>
                        {emotion.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      const newTrades = entry.trades.filter((_, i) => i !== index)
                      setEntry((prev) => ({ ...prev, trades: newTrades }))
                    }}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Journal sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Aprendizajes del Día</label>
              <textarea
                value={entry.learnings}
                onChange={(e) => setEntry((prev) => ({ ...prev, learnings: e.target.value }))}
                placeholder="¿Qué aprendiste hoy? ¿Qué patrones notaste?"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Áreas de Mejora</label>
              <textarea
                value={entry.improvements}
                onChange={(e) => setEntry((prev) => ({ ...prev, improvements: e.target.value }))}
                placeholder="¿Qué puedes mejorar para la próxima sesión?"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Gratitud</label>
              <textarea
                value={entry.gratitude}
                onChange={(e) => setEntry((prev) => ({ ...prev, gratitude: e.target.value }))}
                placeholder="¿Por qué estás agradecido hoy?"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Plan para Mañana</label>
              <textarea
                value={entry.tomorrowPlan}
                onChange={(e) => setEntry((prev) => ({ ...prev, tomorrowPlan: e.target.value }))}
                placeholder="¿Cuál es tu plan para la próxima sesión?"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Condiciones del mercado y rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Condiciones del Mercado</label>
              <textarea
                value={entry.marketConditions}
                onChange={(e) => setEntry((prev) => ({ ...prev, marketConditions: e.target.value }))}
                placeholder="¿Cómo estaba el mercado hoy? Volatilidad, noticias, etc."
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Rating de la Sesión</label>
                <span className="text-sm text-white">{entry.sessionRating}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={entry.sessionRating}
                onChange={(e) => setEntry((prev) => ({ ...prev, sessionRating: Number.parseInt(e.target.value) }))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Muy malo</span>
                <span>Excelente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm p-6 border-t border-slate-600/30">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-white"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 rounded-lg transition-all duration-300 font-semibold text-white"
            >
              Guardar Entrada
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
