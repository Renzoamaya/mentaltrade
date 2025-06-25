"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  TrendingUp,
  Target,
  Brain,
  BookOpen,
  Settings,
  Bell,
  User,
  Activity,
  DollarSign,
  Flame,
  Eye,
  Timer,
  Heart,
  Plus,
  ArrowRight,
  ChevronRight,
  Star,
  Trophy,
  CheckCircle,
  TrendingDown,
} from "lucide-react"

// Importar los nuevos módulos
import PruebaDeFondeoCompleto from "./PruebaDeFondeo"
import RegistroDiario from "./RegistroDiario"
import ProgresoMental from "./ProgresoMental"
import { TradingTimer, MonitorEmocional, ObjetivosDiarios, AnalyticsPro } from "./HerramientasAdicionales"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeModule, setActiveModule] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [showMonitor, setShowMonitor] = useState(false)
  const [showObjetivos, setShowObjetivos] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  // Estados simulados del dashboard
  const [dashboardStats, setDashboardStats] = useState({
    balanceTotal: 12450.75,
    gananciaDiaria: 234.5,
    winRate: 68,
    tradesHoy: 3,
    rachaActual: 7,
    nivelEstres: 25,
    bienestarMental: 82,
    objetivosCompletados: 4,
    objetivosTotal: 6,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardStats((prev) => ({
        ...prev,
        balanceTotal: prev.balanceTotal + (Math.random() - 0.5) * 10,
        gananciaDiaria: prev.gananciaDiaria + (Math.random() - 0.5) * 5,
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleModuleClick = (module) => {
    setActiveModule(module)
  }

  const handleBackToDashboard = () => {
    setActiveModule(null)
  }

  // Renderizar módulo activo
  if (activeModule === "fondeo") {
    return <PruebaDeFondeoCompleto onBack={handleBackToDashboard} />
  }

  if (activeModule === "registro") {
    return <RegistroDiario onBack={handleBackToDashboard} />
  }

  if (activeModule === "progreso") {
    return <ProgresoMental onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid de puntos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MentaLTrading Pro </h1>
                <p className="text-slate-400">Estrategia + Psicotrading = Rentabilidad</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Herramientas rápidas */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTimer(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group"
                  title="Timer de Trading"
                >
                  <Timer className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                </button>
                <button
                  onClick={() => setShowMonitor(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group"
                  title="Monitor Emocional"
                >
                  <Heart className="w-5 h-5 text-slate-400 group-hover:text-pink-400" />
                </button>
                <button
                  onClick={() => setShowObjetivos(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group"
                  title="Objetivos Diarios"
                >
                  <Target className="w-5 h-5 text-slate-400 group-hover:text-green-400" />
                </button>
                <button
                  onClick={() => setShowAnalytics(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group"
                  title="Analytics Pro"
                >
                  <BarChart3 className="w-5 h-5 text-slate-400 group-hover:text-purple-400" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-mono font-bold text-blue-400">{currentTime.toLocaleTimeString("es-AR")}</p>
                <p className="text-xs text-slate-400">{currentTime.toLocaleDateString("es-AR")}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300">
                  <Bell className="w-5 h-5 text-slate-400" />
                </button>
                <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300">
                  <Settings className="w-5 h-5 text-slate-400" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={DollarSign}
              title="Balance Total"
              value={`$${dashboardStats.balanceTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`}
              subtitle={`+$${dashboardStats.gananciaDiaria.toFixed(2)} hoy`}
              color="from-green-500 to-emerald-500"
              trend="up"
            />
            <MetricCard
              icon={Target}
              title="Win Rate"
              value={`${dashboardStats.winRate}%`}
              subtitle={`${dashboardStats.tradesHoy} trades hoy`}
              color="from-blue-500 to-cyan-500"
              trend="up"
            />
            <MetricCard
              icon={Flame}
              title="Racha Actual"
              value={`${dashboardStats.rachaActual} días`}
              subtitle="Días consecutivos positivos"
              color="from-orange-500 to-red-500"
              trend="up"
            />
            <MetricCard
              icon={Brain}
              title="Bienestar Mental"
              value={`${dashboardStats.bienestarMental}%`}
              subtitle={`Estrés: ${dashboardStats.nivelEstres}%`}
              color="from-purple-500 to-pink-500"
              trend="stable"
            />
          </div>

          {/* Alerta de estado */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Estado Óptimo para Trading</h3>
                  <p className="text-sm text-slate-300">
                    Tu nivel de estrés está bajo control y tu concentración es alta. ¡Buen momento para tradear!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Objetivos del día</p>
                <p className="text-lg font-bold text-white">
                  {dashboardStats.objetivosCompletados}/{dashboardStats.objetivosTotal}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Módulos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Prueba de Fondeo */}
          <ModuleCard
            icon={Trophy}
            title="Prueba de Fondeo"
            description="Monitoreo avanzado de tu evaluación con seguimiento psicológico en tiempo real"
            color="from-yellow-500 to-orange-500"
            stats={[
              { label: "Progreso", value: "46%" },
              { label: "Días restantes", value: "18" },
              { label: "Estado", value: "Activo" },
            ]}
            onClick={() => handleModuleClick("fondeo")}
            featured
          />

          {/* Registro Diario */}
          <ModuleCard
            icon={BookOpen}
            title="Registro Diario"
            description="Journal personal con análisis emocional y seguimiento de patrones de comportamiento"
            color="from-purple-500 to-pink-500"
            stats={[
              { label: "Entradas", value: "12" },
              { label: "Racha", value: "5 días" },
              { label: "Promedio", value: "4.2★" },
            ]}
            onClick={() => handleModuleClick("registro")}
          />

          {/* Progreso Mental */}
          <ModuleCard
            icon={Brain}
            title="Progreso Mental"
            description="Centro de bienestar psicológico con meditación, ejercicios y análisis de estado mental"
            color="from-blue-500 to-cyan-500"
            stats={[
              { label: "Bienestar", value: "82%" },
              { label: "Sesiones", value: "45" },
              { label: "Tiempo", value: "21h" },
            ]}
            onClick={() => handleModuleClick("progreso")}
          />
        </div>

        {/* Sección de herramientas adicionales */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Herramientas Adicionales</h2>
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300">
              <span className="text-sm">Ver todas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard
              icon={Timer}
              title="Timer de Trading"
              description="Técnica Pomodoro para sesiones enfocadas"
              color="from-green-500 to-emerald-500"
              onClick={() => setShowTimer(true)}
            />
            <ToolCard
              icon={Heart}
              title="Monitor Emocional"
              description="Seguimiento en tiempo real de tu estado emocional"
              color="from-pink-500 to-red-500"
              onClick={() => setShowMonitor(true)}
            />
            <ToolCard
              icon={Target}
              title="Objetivos Diarios"
              description="Gestión de metas y seguimiento de progreso"
              color="from-blue-500 to-purple-500"
              onClick={() => setShowObjetivos(true)}
            />
            <ToolCard
              icon={BarChart3}
              title="Analytics Pro"
              description="Análisis avanzado de rendimiento y patrones"
              color="from-orange-500 to-yellow-500"
              onClick={() => setShowAnalytics(true)}
            />
          </div>
        </div>

        {/* Resumen de actividad reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Actividad reciente */}
          <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                <Eye className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <ActivityItem
                icon={CheckCircle}
                title="Sesión de meditación completada"
                time="Hace 2 horas"
                color="text-green-400"
              />
              <ActivityItem
                icon={TrendingUp}
                title="Trade exitoso en EUR/USD"
                time="Hace 3 horas"
                color="text-blue-400"
              />
              <ActivityItem
                icon={BookOpen}
                title="Entrada de journal registrada"
                time="Hace 5 horas"
                color="text-purple-400"
              />
              <ActivityItem
                icon={Target}
                title="Objetivo diario completado"
                time="Hace 6 horas"
                color="text-orange-400"
              />
            </div>
          </div>

          {/* Próximos recordatorios */}
          <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Próximos Recordatorios</h3>
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <ReminderItem title="Sesión de trading matutina" time="En 30 minutos" type="trading" />
              <ReminderItem title="Meditación de 10 minutos" time="En 2 horas" type="wellness" />
              <ReminderItem title="Revisar objetivos semanales" time="Mañana a las 9:00" type="planning" />
              <ReminderItem title="Análisis de rendimiento semanal" time="Viernes a las 18:00" type="analysis" />
            </div>
          </div>
        </div>
      </div>

      {/* Modales de herramientas */}
      <TradingTimer isOpen={showTimer} onClose={() => setShowTimer(false)} />
      <MonitorEmocional isOpen={showMonitor} onClose={() => setShowMonitor(false)} />
      <ObjetivosDiarios isOpen={showObjetivos} onClose={() => setShowObjetivos(false)} />
      <AnalyticsPro isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} />
    </div>
  )
}

// Componente MetricCard
function MetricCard({ icon: Icon, title, value, subtitle, color, trend }) {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Activity,
  }

  const TrendIcon = trendIcons[trend]

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div
            className={`p-1 rounded-lg ${
              trend === "up" ? "bg-green-500/20" : trend === "down" ? "bg-red-500/20" : "bg-blue-500/20"
            }`}
          >
            <TrendIcon
              className={`w-4 h-4 ${
                trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-blue-400"
              }`}
            />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-slate-400 mb-3">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  )
}

// Componente ModuleCard
function ModuleCard({ icon: Icon, title, description, color, stats, onClick, featured = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer group hover:scale-105 ${
        featured
          ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
          : "border-slate-600/30 hover:border-slate-500/50"
      }`}
    >
      {featured && (
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-medium text-yellow-400 uppercase tracking-wide">Destacado</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente ToolCard
function ToolCard({ icon: Icon, title, description, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer group hover:scale-105"
    >
      <div
        className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

// Componente ActivityItem
function ActivityItem({ icon: Icon, title, time, color }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
      <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  )
}

// Componente ReminderItem
function ReminderItem({ title, time, type }) {
  const typeColors = {
    trading: "from-blue-500 to-cyan-500",
    wellness: "from-green-500 to-emerald-500",
    planning: "from-purple-500 to-pink-500",
    analysis: "from-orange-500 to-red-500",
  }

  const typeIcons = {
    trading: BarChart3,
    wellness: Heart,
    planning: Target,
    analysis: Eye,
  }

  const Icon = typeIcons[type]

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
      <div className={`w-8 h-8 bg-gradient-to-r ${typeColors[type]} rounded-lg flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
      <button className="p-1 hover:bg-slate-600/50 rounded transition-colors duration-300">
        <Bell className="w-3 h-3 text-slate-400" />
      </button>
    </div>
  )
}
