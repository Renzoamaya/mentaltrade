"use client"

export default function DashboardMejorado() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

// Componente MetricCard mejorado
function MetricCard({ icon: Icon, title, value, subtitle, color, trend, pulse = false }) {
  return <div>MetricCard</div>
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
  return <div>ModuleCard</div>
}

// Componente ToolCard mejorado
function ToolCard({ icon: Icon, title, description, color, onClick, status }) {
  return <div>ToolCard</div>
}

// Componente ActivityItem mejorado
function ActivityItem({ icon: Icon, title, time, color, description }) {
  return <div>ActivityItem</div>
}

// Componente InsightCard para recomendaciones
function InsightCard({ type, title, description, action }) {
  return <div>InsightCard</div>
}

function TradingTimer({ isOpen, onClose }) {
  return null
}

function MonitorEmocional({ isOpen, onClose }) {
  return null
}

function ObjetivosDiarios({ isOpen, onClose }) {
  return null
}

function AnalyticsPro({ isOpen, onClose }) {
  return null
}
