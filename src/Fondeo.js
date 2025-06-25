// Módulo: Prueba de Fondeo (pantalla principal)
import { Trophy, TrendingUp, XCircle, CheckCircle } from "lucide-react";

const Fondeo = ({ config, onBack }) => {
  return (
    <div className="p-6 text-white">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded">
        ← Volver
      </button>

      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Prueba de Fondeo Activa
      </h2>
      <p className="text-slate-400 mb-8">Seguimiento en tiempo real de tu desafío de fondeo</p>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FondeoCard
          icon={TrendingUp}
          label="Objetivo de Ganancia"
          value="$2,000 / $5,000"
          color="from-green-500 to-emerald-500"
        />
        <FondeoCard
          icon={XCircle}
          label="Drawdown Máximo"
          value="-$300 / -$500"
          color="from-red-500 to-pink-500"
        />
        <FondeoCard
          icon={Trophy}
          label="Días Restantes"
          value="12 días"
          color="from-yellow-500 to-orange-500"
        />
      </div>

      {/* Progreso general */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-white">Progreso General</h3>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[40%] transition-all duration-500"></div>
        </div>
        <p className="text-sm text-slate-400 mt-1">40% completado</p>
      </div>

      {/* Botón de prueba */}
      <div className="mt-10">
        <button
          onClick={() => alert("Simular avance o completar prueba")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Marcar avance
        </button>
      </div>
    </div>
  );
};

const FondeoCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <p className="text-xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-slate-400">{label}</p>
  </div>
);

export default Fondeo;
