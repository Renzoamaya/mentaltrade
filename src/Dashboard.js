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
  ArrowRight,
  ChevronRight,
  Star,
  Trophy,
  CheckCircle,
  TrendingDown,
  AlertTriangle,
} from "lucide-react"

// Importar los módulos mejorados
import RegistroDiario from "./RegistroDiario"
import PruebaDeFondeoCompleto from "./PruebaDeFondeo"
import ProgresoMental from "./ProgresoMental"
import { TradingTimer, MonitorEmocional, ObjetivosDiarios, AnalyticsPro } from "./HerramientasAdicionales"

export default function DashboardMejorado() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeModule, setActiveModule] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [showMonitor, setShowMonitor] = useState(false)
  const [showObjetivos, setShowObjetivos] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  // Estados mejorados del dashboard
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
    journalStreak: 12, // Nueva métrica para registro diario
    meditationMinutes: 45, // Nueva métrica para progreso mental
    lastJournalEntry: "Ayer", // Última entrada del journal
    mentalHealthTrend: "up", // Tendencia del bienestar mental
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
    }, 15000)
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
      {/* Elementos de fondo animados mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-indigo-500/8 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Grid de puntos de fondo mejorado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header mejorado */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Brain className="w-6 h-6 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MentaLTrading Pro</h1>
                <p className="text-slate-400">Estrategia + Psicotrading = Rentabilidad</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Herramientas rápidas mejoradas */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTimer(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group relative"
                  title="Timer de Trading"
                >
                  <Timer className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-75"></div>
                </button>
                <button
                  onClick={() => setShowMonitor(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group relative"
                  title="Monitor Emocional"
                >
                  <Heart className="w-5 h-5 text-slate-400 group-hover:text-pink-400" />
                </button>
                <button
                  onClick={() => setShowObjetivos(true)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 group relative"
                  title="Objetivos Diarios"
                >
                  <Target className="w-5 h-5 text-slate-400 group-hover:text-green-400" />
                  {dashboardStats.objetivosCompletados < dashboardStats.objetivosTotal && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
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
                <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-300 relative">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
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

          {/* Métricas principales mejoradas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={DollarSign}
              title="Balance Total"
              value={`$${dashboardStats.balanceTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`}
              subtitle={`+$${dashboardStats.gananciaDiaria.toFixed(2)} hoy`}
              color="from-green-500 to-emerald-500"
              trend="up"
              pulse={dashboardStats.gananciaDiaria > 0}
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
              trend={dashboardStats.mentalHealthTrend}
            />
          </div>

          {/* Alerta de estado mejorada */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-4 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
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
                <div className="w-16 bg-slate-700 rounded-full h-2 mt-1">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(dashboardStats.objetivosCompletados / dashboardStats.objetivosTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Módulos principales DIFERENCIADOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Prueba de Fondeo */}
          <ModuleCard
            icon={Trophy}
            title="Prueba de Fondeo"
            description="Monitoreo avanzado de tu evaluación con seguimiento psicológico en tiempo real y análisis de patrones emocionales"
            color="from-yellow-500 to-orange-500"
            stats={[
              { label: "Progreso", value: "46%" },
              { label: "Días restantes", value: "18" },
              { label: "Estado psico", value: "Óptimo" },
            ]}
            onClick={() => handleModuleClick("fondeo")}
            featured
            badge="Activo"
          />

          {/* Registro Diario - COMPLETAMENTE DIFERENTE */}
          <ModuleCard
            icon={BookOpen}
            title="Registro Diario"
            description="Journal completo de trading con análisis emocional, registro de trades, aprendizajes y planificación de sesiones futuras"
            color="from-blue-500 to-indigo-500"
            stats={[
              { label: "Entradas", value: "24" },
              { label: "Racha actual", value: `${dashboardStats.journalStreak} días` },
              { label: "Última entrada", value: dashboardStats.lastJournalEntry },
            ]}
            onClick={() => handleModuleClick("registro")}
            badge="Journaling"
            improvements={[
              "✨ Seguimiento detallado de trades",
              "📊 Análisis de patrones emocionales",
              "🎯 Planificación de objetivos diarios",
              "💭 Registro de aprendizajes y mejoras",
            ]}
          />

          {/* Progreso Mental - ENFOCADO EN BIENESTAR */}
          <ModuleCard
            icon={Brain}
            title="Progreso Mental"
            description="Centro de bienestar psicológico con meditación guiada, ejercicios de mindfulness, análisis de estado mental y técnicas de relajación"
            color="from-purple-500 to-pink-500"
            stats={[
              { label: "Bienestar", value: "82%" },
              { label: "Sesiones", value: "45" },
              { label: "Tiempo hoy", value: `${dashboardStats.meditationMinutes}min` },
            ]}
            onClick={() => handleModuleClick("progreso")}
            badge="Mindfulness"
            improvements={[
              "🧘 Meditación con timer personalizable",
              "💪 Ejercicios de fortalecimiento mental",
              "📈 Análisis de evolución emocional",
              "🎯 Técnicas de control de estrés",
            ]}
          />
        </div>

        {/* Sección de herramientas adicionales mejorada */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Herramientas de Psicotrading</h2>
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300">
              <span className="text-sm">Ver todas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard
              icon={Timer}
              title="Timer de Trading"
              description="Técnica Pomodoro adaptada para sesiones de trading enfocadas y productivas"
              color="from-green-500 to-emerald-500"
              onClick={() => setShowTimer(true)}
              status="Listo para usar"
            />
            <ToolCard
              icon={Heart}
              title="Monitor Emocional"
              description="Seguimiento en tiempo real de tu estado emocional durante las sesiones"
              color="from-pink-500 to-red-500"
              onClick={() => setShowMonitor(true)}
              status="Monitoreo activo"
            />
            <ToolCard
              icon={Target}
              title="Objetivos Diarios"
              description="Gestión inteligente de metas diarias con seguimiento de progreso automático"
              color="from-blue-500 to-purple-500"
              onClick={() => setShowObjetivos(true)}
              status={`${dashboardStats.objetivosCompletados}/${dashboardStats.objetivosTotal} completados`}
            />
            <ToolCard
              icon={BarChart3}
              title="Analytics Pro"
              description="Análisis avanzado de rendimiento, patrones psicológicos y métricas de trading"
              color="from-orange-500 to-yellow-500"
              onClick={() => setShowAnalytics(true)}
              status="Datos actualizados"
            />
          </div>
        </div>

        {/* Resumen de actividad reciente mejorado */}
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
                icon={BookOpen}
                title="Entrada de journal completada"
                time="Hace 1 hora"
                color="text-blue-400"
                description="Registrados 2 trades con análisis emocional completo"
              />
              <ActivityItem
                icon={Brain}
                title="Sesión de meditación de 15 min"
                time="Hace 2 horas"
                color="text-purple-400"
                description="Técnica de respiración consciente completada"
              />
              <ActivityItem
                icon={TrendingUp}
                title="Trade exitoso en EUR/USD"
                time="Hace 3 horas"
                color="text-green-400"
                description="+$67.50 • Estado emocional: Confiado"
              />
              <ActivityItem
                icon={Target}
                title="Objetivo diario alcanzado"
                time="Hace 4 horas"
                color="text-yellow-400"
                description="Respetados todos los stop loss del día"
              />
            </div>
          </div>

          {/* Insights y recomendaciones */}
          <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Insights Psicológicos</h3>
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                <Brain className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <InsightCard
                type="positive"
                title="Patrón Detectado"
                description="Tu rendimiento mejora 34% cuando meditas antes de tradear"
                action="Continuar rutina"
              />
              <InsightCard
                type="warning"
                title="Alerta de Comportamiento"
                description="Tendencia a overtradear los viernes después de las 15:00"
                action="Establecer límite"
              />
              <InsightCard
                type="neutral"
                title="Sugerencia de Mejora"
                description="Considera aumentar tiempo de análisis pre-mercado a 10 minutos"
                action="Implementar mañana"
              />
              <InsightCard
                type="positive"
                title="Fortaleza Identificada"
                description="Excelente control emocional en trades perdedores (-2% estrés promedio)"
                action="Mantener disciplina"
              />
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

// Componente MetricCard mejorado
function MetricCard({ icon: Icon, title, value, subtitle, color, trend, pulse = false }) {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Activity,
  }

  const TrendIcon = trendIcons[trend]

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group relative overflow-hidden ${pulse ? "animate-pulse" : ""}`}
    >
      {pulse && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse"></div>
      )}
      <div className="relative z-10">
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
    </div>
  )
}

// Componente ModuleCard mejorado con diferenciación clara
function ModuleCard({
  icon: Icon,
  title,
  description,
  color,
  stats,
  onClick,
  featured = false,
  badge,
  improvements = [],
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer group hover:scale-105 relative overflow-hidden ${
        featured
          ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
          : "border-slate-600/30 hover:border-slate-500/50"
      }`}
    >
      {/* Efectos de fondo */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        {/* Badge superior */}
        <div className="flex items-center justify-between mb-4">
          {(featured || badge) && (
            <div className="flex items-center gap-2 mb-2">
              {featured && <Star className="w-4 h-4 text-yellow-400" />}
              <span
                className={`text-xs font-medium uppercase tracking-wide ${featured ? "text-yellow-400" : "text-blue-400"}`}
              >
                {featured ? "Destacado" : badge}
              </span>
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
        </div>

        {/* Icono principal */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>

        {/* Mejoras específicas del módulo */}
        {improvements.length > 0 && (
          <div className="mb-4">
            <div className="space-y-1">
              {improvements.slice(0, 2).map((improvement, index) => (
                <p key={index} className="text-xs text-slate-500 flex items-center gap-1">
                  <span>{improvement}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente ToolCard mejorado
function ToolCard({ icon: Icon, title, description, color, onClick, status }) {
  return (
    <div
      onClick={onClick}
      className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 relative overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        <div
          className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h4 className="font-semibold text-white mb-2">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">{description}</p>

        {status && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">{status}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente ActivityItem mejorado
function ActivityItem({ icon: Icon, title, time, color, description }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-300">
      <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-slate-400 mt-1">{time}</p>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>
    </div>
  )
}

// Componente InsightCard para recomendaciones
function InsightCard({ type, title, description, action }) {
  const typeStyles = {
    positive: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: CheckCircle,
      iconColor: "text-green-400",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      icon: AlertTriangle,
      iconColor: "text-yellow-400",
    },
    neutral: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: Brain,
      iconColor: "text-blue-400",
    },
  }

  const style = typeStyles[type]
  const IconComponent = style.icon

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-3`}>
      <div className="flex items-start gap-3">
        <IconComponent className={`w-4 h-4 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
          <p className="text-xs text-slate-400 mb-2">{description}</p>
          <button className={`text-xs ${style.iconColor} hover:underline`}>{action}</button>
        </div>
      </div>
    </div>
  )
}
