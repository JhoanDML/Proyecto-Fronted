import { useCrisisStore } from '../store/crisisStore';

export default function Monitor() {
  const { temperature, bandwidth, ddosAttempts, crisisLevel, correctCode } = useCrisisStore();

  const getTempColor = (temp) => {
    if (temp < 50) return 'bg-green-500';
    if (temp < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBWColor = (bw) => {
    if (bw < 60) return 'bg-green-500';
    if (bw < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          👁️ PANEL DE MONITOREO
        </h1>

        {/* Nivel de Crisis */}
        <div className="mb-8 bg-gray-800 border-2 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ NIVEL DE CRISIS</h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-xl transition ${
                  level <= crisisLevel
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                {level}
              </div>
            ))}
          </div>
          <p className="text-gray-300 mt-4">Crisis actual: <span className="text-red-400 font-bold">{crisisLevel}/5</span></p>
        </div>

        {/* Grid de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Temperatura */}
          <div className="bg-gray-800 border-2 border-cyan-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">🌡️ TEMPERATURA</h3>
            <div className="text-5xl font-bold text-white mb-2">
              {parseFloat(temperature).toFixed(1)}°C
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all ${getTempColor(temperature)}`}
                style={{ width: `${Math.min((temperature / 95) * 100, 100)}%` }}
              />
            </div>
            <p className="text-gray-400">Límite: 95°C</p>
          </div>

          {/* Ancho de Banda */}
          <div className="bg-gray-800 border-2 border-cyan-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">📊 ANCHO DE BANDA</h3>
            <div className="text-5xl font-bold text-white mb-2">
              {parseFloat(bandwidth).toFixed(1)}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all ${getBWColor(bandwidth)}`}
                style={{ width: `${Math.min(bandwidth, 100)}%` }}
              />
            </div>
            <p className="text-gray-400">Límite: 100%</p>
          </div>

          {/* DDoS */}
          <div className="bg-gray-800 border-2 border-cyan-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">🔓 INTENTOS DDoS</h3>
            <div className="text-5xl font-bold text-white mb-2">
              {ddosAttempts}
            </div>
            <p className="text-gray-400">Ataques detectados</p>
          </div>
        </div>

        {/* Código de seguridad */}
        <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4">🔐 CÓDIGO DE SEGURIDAD ACTUAL</h3>
          <div className="text-6xl font-bold text-green-400 tracking-widest font-mono">
            {correctCode}
          </div>
          <p className="text-gray-400 mt-4">
            El Técnico debe ingresar este código para validar acciones
          </p>
        </div>
      </div>
    </div>
  );
}
