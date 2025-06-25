"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Trophy,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  DollarSign,
  Calendar,
  Settings,
  Plus,
  Brain,
  Heart,
  Smile,
  Frown,
  Meh,
  X,
  AlertCircle,
  FrownIcon as Sad,
  AngryIcon as Excited,
} from "lucide-react"

export default function PruebaDeFondeoCompleto({ onBack }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)

  const [fondeoConfig, setFondeoConfig] = useState({
    gananciaMeta: 5000,
    perdidaMaxima: 2500,
    duracionDias: 30,
    tradesRecomendadosPorDia: 3,
    cuentaInicial: 10000,
  })

  const [fondeoStats, setFondeoStats] = useState({
    gananciaActual: 2300,
    perdidaActual: 450,
    diasRestantes: 18,
    diasTranscurridos: 12,
    progreso: 46,
    estado: "activo",
    ultimaOperacion: "2 horas",
    tradesHoy: 2,
    progresoEmocional: 75,
    estadoEmocionalPromedio: "neutral",
  })

  const [trades, setTrades] = useState([
    {
      id: 1,
      time: "14:30",
      pair: "EUR/USD",
      type: "BUY",
      result: 45,
      emotion: "confident",
      description: "Setup perfecto, seguí mi plan",
      date: new Date().toDateString(),
    },
    {
      id: 2,
      time: "13:15",
      pair: "GBP/JPY",
      type: "SELL",
      result: -23,
      emotion: "frustrated",
      description: "No respete mi stop loss",
      date: new Date().toDateString(),
    },
  ])

  const [newTrade, setNewTrade] = useState({
    pair: "",
    type: "BUY",
    result: "",
    emotion: "neutral",
    description: "",
  })

  const [activeTab, setActiveTab] = useState("resumen")

  const emociones = {
    excited: { icon: Excited, label: "Emocionado", color: "text-yellow-400", value: 100 },
    confident: { icon: Smile, label: "Confiado", color: "text-green-400", value: 80 },
    neutral: { icon: Meh, label: "Neutral", color: "text-blue-400", value: 60 },
    anxious: { icon: AlertCircle, label: "Ansioso", color: "text-orange-400", value: 40 },
    frustrated: { icon: Frown, label: "Frustrado", color: "text-red-400", value: 20 },
    fearful: { icon: Sad, label: "Temeroso", color: "text-purple-400", value: 10 },
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Calcular progreso emocional basado en trades
  useEffect(() => {
    if (trades.length > 0) {
      const tradesHoy = trades.filter((trade) => trade.date === new Date().toDateString())
      const promedioEmocional =
        tradesHoy.reduce((acc, trade) => acc + emociones[trade.emotion].value, 0) / tradesHoy.length

      setFondeoStats((prev) => ({
        ...prev,
        tradesHoy: tradesHoy.length,
        progresoEmocional: promedioEmocional || 75,
        estadoEmocionalPromedio:
          tradesHoy.length > 0
            ? Object.keys(emociones).find((key) => emociones[key].value === Math.round(promedioEmocional / 20) * 20) ||
              "neutral"
            : "neutral",
      }))
    }
  }, [trades])

  const progressPercentage = (fondeoStats.gananciaActual / fondeoConfig.gananciaMeta) * 100
  const riskPercentage = (fondeoStats.perdidaActual / fondeoConfig.perdidaMaxima) * 100
  const tradesExcedidos = fondeoStats.tradesHoy > fondeoConfig.tradesRecomendadosPorDia

  const handleConfigSave = () => {
    setIsConfigured(true)
    setShowConfigModal(false)
    // Aquí podrías guardar en localStorage
    localStorage.setItem("fondeoConfig", JSON.stringify(fondeoConfig))
  }

  const handleTradeSubmit = () => {
    if (!newTrade.pair || !newTrade.result) return

    const trade = {
      id: Date.now(),
      time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      pair: newTrade.pair,
      type: newTrade.type,
      result: Number.parseFloat(newTrade.result),
      emotion: newTrade.emotion,
      description: newTrade.description,
      date: new Date().toDateString(),
    }

    setTrades((prev) => [trade, ...prev])

    // Actualizar stats
    setFondeoStats((prev) => ({
      ...prev,
      gananciaActual: prev.gananciaActual + trade.result,
      perdidaActual: trade.result < 0 ? prev.perdidaActual + Math.abs(trade.result) : prev.perdidaActual,
    }))

    setNewTrade({
      pair: "",
      type: "BUY",
      result: "",
      emotion: "neutral",
      description: "",
    })
    setShowTradeModal(false)
  }

  const getRecomendacionPsicologica = () => {
    const { tradesHoy } = fondeoStats
    const { tradesRecomendadosPorDia } = fondeoConfig

    if (tradesHoy === 0) {
      return {
        mensaje: "¡Perfecto momento para comenzar! Mantén la calma y sigue tu plan.",
        color: "text-green-400",
        icon: CheckCircle,
      }
    } else if (tradesHoy < tradesRecomendadosPorDia) {
      return {
        mensaje: `Vas bien. Puedes hacer ${tradesRecomendadosPorDia - tradesHoy} trade(s) más hoy.`,
        color: "text-blue-400",
        icon: Target,
      }
    } else if (tradesHoy === tradesRecomendadosPorDia) {
      return {
        mensaje: "¡Excelente! Has alcanzado tu límite diario. Considera descansar.",
        color: "text-yellow-400",
        icon: Trophy,
      }
    } else {
      return {
        mensaje: "⚠️ Has excedido tu límite. El overtrading puede afectar tu psicología.",
        color: "text-red-400",
        icon: AlertTriangle,
      }
    }
  }

  const recomendacion = getRecomendacionPsicologica()

  if (!isConfigured) {
    return (
      <ConfiguracionInicial
        config={fondeoConfig}
        setConfig={setFondeoConfig}
        onSave={handleConfigSave}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid de puntos de fondo */}
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
                onClick={() => setShowConfigModal(true)}
                className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors duration-300"
              >
                <Settings className="w-4 h-4 text-blue-400" />
              </button>
              <div className="text-right">
                <p className="text-lg font-mono font-bold text-blue-400">{currentTime.toLocaleTimeString("es-AR")}</p>
                <p className="text-xs text-slate-400">Tiempo Real</p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  fondeoStats.estado === "activo"
                    ? "bg-green-500/20 border-green-500/50"
                    : "bg-yellow-500/20 border-yellow-500/50"
                }`}
              >
                <Activity
                  className={`w-6 h-6 ${
                    fondeoStats.estado === "activo" ? "text-green-400 animate-pulse" : "text-yellow-400"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Prueba de Fondeo
            </h1>
            <p className="text-slate-400 max-w-3xl">
              Monitoreo avanzado con enfoque en psicotrading. Seguimiento emocional y recomendaciones personalizadas.
            </p>
          </div>

          {/* Recomendación psicológica */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <recomendacion.icon className={`w-5 h-5 ${recomendacion.color}`} />
                  <span className="text-sm font-medium text-slate-300">RECOMENDACIÓN PSICOLÓGICA</span>
                </div>
                <div className={`text-sm ${recomendacion.color}`}>{recomendacion.mensaje}</div>
              </div>
              <button
                onClick={() => setShowTradeModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-colors duration-300"
              >
                <Plus className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Registrar Trade</span>
              </button>
            </div>
          </div>
        </header>

        {/* Navegación por tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-800/30 p-1 rounded-xl border border-slate-600/30 backdrop-blur-sm">
            {[
              { id: "resumen", label: "Resumen", icon: BarChart3 },
              { id: "psicologia", label: "Psicología", icon: Brain },
              { id: "metricas", label: "Métricas", icon: TrendingUp },
              { id: "historial", label: "Historial", icon: Calendar },
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
        </div>

        {/* Contenido según tab activo */}
        {activeTab === "resumen" && (
          <div className="space-y-8">
            {/* Cards principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Target}
                title="Objetivo de Ganancia"
                value={`$${fondeoStats.gananciaActual.toLocaleString()}`}
                subtitle={`/ $${fondeoConfig.gananciaMeta.toLocaleString()}`}
                progress={progressPercentage}
                color="from-green-500 to-emerald-500"
                trend="up"
              />
              <MetricCard
                icon={AlertTriangle}
                title="Drawdown Actual"
                value={`$${fondeoStats.perdidaActual.toLocaleString()}`}
                subtitle={`/ $${fondeoConfig.perdidaMaxima.toLocaleString()}`}
                progress={riskPercentage}
                color="from-red-500 to-pink-500"
                trend="down"
              />
              <MetricCard
                icon={Activity}
                title="Trades Hoy"
                value={`${fondeoStats.tradesHoy}`}
                subtitle={`/ ${fondeoConfig.tradesRecomendadosPorDia} recomendados`}
                progress={(fondeoStats.tradesHoy / fondeoConfig.tradesRecomendadosPorDia) * 100}
                color={tradesExcedidos ? "from-red-500 to-pink-500" : "from-blue-500 to-cyan-500"}
                alert={tradesExcedidos}
              />
              <MetricCard
                icon={Brain}
                title="Estado Psicológico"
                value={`${fondeoStats.progresoEmocional.toFixed(0)}%`}
                subtitle={emociones[fondeoStats.estadoEmocionalPromedio].label}
                progress={fondeoStats.progresoEmocional}
                color="from-purple-500 to-pink-500"
              />
            </div>

            {/* Progreso detallado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progreso financiero */}
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="text-green-400 w-5 h-5" />
                  <h3 className="text-xl font-bold text-white">Progreso Financiero</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Objetivo de Ganancia</span>
                      <span className="text-sm font-medium text-white">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Nivel de Riesgo</span>
                      <span className="text-sm font-medium text-white">{riskPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-red-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(riskPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progreso psicológico */}
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="text-purple-400 w-5 h-5" />
                  <h3 className="text-xl font-bold text-white">Estado Psicológico</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Bienestar Emocional</span>
                      <span className="text-sm font-medium text-white">
                        {fondeoStats.progresoEmocional.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${fondeoStats.progresoEmocional}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Control de Trades</span>
                      <span className={`text-sm font-medium ${tradesExcedidos ? "text-red-400" : "text-green-400"}`}>
                        {tradesExcedidos ? "Excedido" : "Controlado"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          tradesExcedidos
                            ? "bg-gradient-to-r from-red-500 to-pink-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-400"
                        }`}
                        style={{
                          width: `${Math.min((fondeoStats.tradesHoy / fondeoConfig.tradesRecomendadosPorDia) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "psicologia" && (
          <PsychologyTab trades={trades} emociones={emociones} fondeoStats={fondeoStats} fondeoConfig={fondeoConfig} />
        )}

        {activeTab === "metricas" && <MetricsTab trades={trades} fondeoStats={fondeoStats} />}

        {activeTab === "historial" && <HistorialTab trades={trades} emociones={emociones} />}
      </div>

      {/* Modal de configuración */}
      {showConfigModal && (
        <ConfigModal
          config={fondeoConfig}
          setConfig={setFondeoConfig}
          onClose={() => setShowConfigModal(false)}
          onSave={handleConfigSave}
        />
      )}

      {/* Modal de registro de trade */}
      {showTradeModal && (
        <TradeModal
          trade={newTrade}
          setTrade={setNewTrade}
          emociones={emociones}
          onClose={() => setShowTradeModal(false)}
          onSave={handleTradeSubmit}
          tradesHoy={fondeoStats.tradesHoy}
          limite={fondeoConfig.tradesRecomendadosPorDia}
        />
      )}
    </div>
  )
}

// Componente de configuración inicial
function ConfiguracionInicial({ config, setConfig, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center p-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Configurar Prueba de Fondeo
          </h2>
          <p className="text-slate-400">Personaliza tu evaluación según tus objetivos y perfil psicológico</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Cuenta Inicial ($)</label>
              <input
                type="number"
                value={config.cuentaInicial}
                onChange={(e) => setConfig((prev) => ({ ...prev, cuentaInicial: Number.parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Meta de Ganancia ($)</label>
              <input
                type="number"
                value={config.gananciaMeta}
                onChange={(e) => setConfig((prev) => ({ ...prev, gananciaMeta: Number.parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pérdida Máxima ($)</label>
              <input
                type="number"
                value={config.perdidaMaxima}
                onChange={(e) => setConfig((prev) => ({ ...prev, perdidaMaxima: Number.parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duración (días)</label>
              <input
                type="number"
                value={config.duracionDias}
                onChange={(e) => setConfig((prev) => ({ ...prev, duracionDias: Number.parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Trades Recomendados por Día (Psicotrading)
            </label>
            <select
              value={config.tradesRecomendadosPorDia}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, tradesRecomendadosPorDia: Number.parseInt(e.target.value) }))
              }
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
            >
              <option value={1}>1 trade - Conservador (Menos estrés)</option>
              <option value={2}>2 trades - Moderado (Balance ideal)</option>
              <option value={3}>3 trades - Activo (Requiere disciplina)</option>
              <option value={5}>5 trades - Agresivo (Alto riesgo psicológico)</option>
            </select>
            <p className="text-xs text-slate-400 mt-2">
              Recomendamos máximo 3 trades diarios para mantener claridad mental y evitar overtrading.
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 rounded-xl transition-all duration-300 font-semibold"
          >
            Iniciar Prueba
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal de configuración
function ConfigModal({ config, setConfig, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Configuración</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Meta de Ganancia ($)</label>
            <input
              type="number"
              value={config.gananciaMeta}
              onChange={(e) => setConfig((prev) => ({ ...prev, gananciaMeta: Number.parseInt(e.target.value) }))}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Trades por Día</label>
            <select
              value={config.tradesRecomendadosPorDia}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, tradesRecomendadosPorDia: Number.parseInt(e.target.value) }))
              }
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value={1}>1 trade</option>
              <option value={2}>2 trades</option>
              <option value={3}>3 trades</option>
              <option value={5}>5 trades</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal de registro de trade
function TradeModal({ trade, setTrade, emociones, onClose, onSave, tradesHoy, limite }) {
  const excedeLimite = tradesHoy >= limite

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Registrar Trade</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {excedeLimite && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">¡Atención! Has alcanzado tu límite diario</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              Hacer más trades puede afectar tu estado psicológico y rendimiento.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Par de Divisas</label>
              <input
                type="text"
                placeholder="EUR/USD"
                value={trade.pair}
                onChange={(e) => setTrade((prev) => ({ ...prev, pair: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tipo</label>
              <select
                value={trade.type}
                onChange={(e) => setTrade((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Resultado ($)</label>
            <input
              type="number"
              step="0.01"
              placeholder="45.50 o -23.75"
              value={trade.result}
              onChange={(e) => setTrade((prev) => ({ ...prev, result: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">¿Cómo te sentiste?</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(emociones).map(([key, emotion]) => (
                <button
                  key={key}
                  onClick={() => setTrade((prev) => ({ ...prev, emotion: key }))}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                    trade.emotion === key
                      ? "border-blue-500 bg-blue-500/20"
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Descripción del Trade</label>
            <textarea
              placeholder="¿Qué pasó? ¿Seguiste tu plan? ¿Qué aprendiste?"
              value={trade.description}
              onChange={(e) => setTrade((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={!trade.pair || !trade.result}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  )
}

// Tab de Psicología
function PsychologyTab({ trades, emociones, fondeoStats, fondeoConfig }) {
  const tradesHoy = trades.filter((trade) => trade.date === new Date().toDateString())
  const distribucionEmocional = {}

  tradesHoy.forEach((trade) => {
    distribucionEmocional[trade.emotion] = (distribucionEmocional[trade.emotion] || 0) + 1
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado emocional actual */}
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-400 w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Estado Emocional Actual</h3>
          </div>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(emociones[fondeoStats.estadoEmocionalPromedio].icon, {
                className: "w-10 h-10 text-white",
              })}
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">
              {emociones[fondeoStats.estadoEmocionalPromedio].label}
            </h4>
            <p className="text-slate-400">Basado en tus últimos trades</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Bienestar General</span>
              <span className="text-sm font-medium text-white">{fondeoStats.progresoEmocional.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${fondeoStats.progresoEmocional}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Distribución emocional */}
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-blue-400 w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Distribución Emocional Hoy</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(distribucionEmocional).map(([emotion, count]) => (
              <div key={emotion} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {React.createElement(emociones[emotion].icon, {
                    className: `w-4 h-4 ${emociones[emotion].color}`,
                  })}
                  <span className="text-sm text-white">{emociones[emotion].label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500`}
                      style={{
                        width: `${(count / tradesHoy.length) * 100}%`,
                        background: emociones[emotion].color.includes("green")
                          ? "#10b981"
                          : emociones[emotion].color.includes("red")
                            ? "#ef4444"
                            : emociones[emotion].color.includes("blue")
                              ? "#3b82f6"
                              : emociones[emotion].color.includes("yellow")
                                ? "#f59e0b"
                                : emociones[emotion].color.includes("purple")
                                  ? "#8b5cf6"
                                  : "#6b7280",
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-400 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recomendaciones psicológicas */}
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="text-purple-400 w-5 h-5" />
          <h3 className="text-xl font-bold text-white">Recomendaciones Psicológicas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Control de Trades</h4>
            <p className="text-sm text-slate-400">
              {fondeoStats.tradesHoy > fondeoConfig.tradesRecomendadosPorDia
                ? "Has excedido tu límite. Considera tomar un descanso para mantener la claridad mental."
                : "Mantienes un buen control. Sigue respetando tus límites diarios."}
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Estado Emocional</h4>
            <p className="text-sm text-slate-400">
              {fondeoStats.progresoEmocional > 70
                ? "Tu estado emocional es estable. Mantén esta disciplina."
                : "Considera técnicas de relajación antes de tu próximo trade."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tab de Métricas
function MetricsTab({ trades, fondeoStats }) {
  const tradesHoy = trades.filter((trade) => trade.date === new Date().toDateString())
  const winRate = tradesHoy.length > 0 ? (tradesHoy.filter((t) => t.result > 0).length / tradesHoy.length) * 100 : 0
  const avgWin =
    tradesHoy.filter((t) => t.result > 0).reduce((acc, t) => acc + t.result, 0) /
      tradesHoy.filter((t) => t.result > 0).length || 0
  const avgLoss =
    Math.abs(
      tradesHoy.filter((t) => t.result < 0).reduce((acc, t) => acc + t.result, 0) /
        tradesHoy.filter((t) => t.result < 0).length,
    ) || 0

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Métricas de Trading Hoy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-400">Win Rate</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{winRate.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-400">Ganancia Promedio</span>
            </div>
            <p className="text-2xl font-bold text-green-400">${avgWin.toFixed(2)}</p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-400">Pérdida Promedio</span>
            </div>
            <p className="text-2xl font-bold text-red-400">${avgLoss.toFixed(2)}</p>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-400">Total Trades</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">{tradesHoy.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tab de Historial
function HistorialTab({ trades, emociones }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Historial de Trades</h3>
        <div className="space-y-3">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">{trade.time}</span>
                  <span className="font-medium text-white">{trade.pair}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      trade.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {trade.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {React.createElement(emociones[trade.emotion].icon, {
                    className: `w-4 h-4 ${emociones[trade.emotion].color}`,
                  })}
                  <span className="text-xs text-slate-400">{emociones[trade.emotion].label}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${trade.result > 0 ? "text-green-400" : "text-red-400"}`}>
                  {trade.result > 0 ? "+" : ""}${trade.result}
                </span>
                {trade.description && (
                  <p className="text-xs text-slate-400 mt-1 max-w-xs truncate">{trade.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente MetricCard (reutilizado del código anterior)
function MetricCard({ icon: Icon, title, value, subtitle, progress, color, trend, alert }) {
  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 group ${
        alert ? "border-red-500/50 animate-pulse" : "border-slate-600/30 hover:border-slate-500/50"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`p-1 rounded-lg ${trend === "up" ? "bg-green-500/20" : "bg-red-500/20"}`}>
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </div>
        )}
        {alert && (
          <div className="p-1 rounded-lg bg-red-500/20">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-slate-400 mb-3">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>

      {/* Barra de progreso mini */}
      <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${color} h-full rounded-full transition-all duration-1000`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  )
}
