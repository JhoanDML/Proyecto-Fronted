import { useState } from 'react';
import { useCrisisStore } from '../store/crisisStore';

export default function Bridge() {
  const { correctCode, crisisLevel, executeAction } = useCrisisStore();
  const [code, setCode] = useState('');
  const [terminal, setTerminal] = useState(['Sistema iniciado...']);

  const actions = [
    { id: 'enfriar-racks', label: '❄️ Enfriar Racks', effect: '-15°C' },
    { id: 'reiniciar-servidores', label: '🔄 Reiniciar Servidores', effect: '-BW -DDoS' },
    { id: 'activar-firewall', label: '🛡️ Activar Firewall', effect: '-DDoS' },
    { id: 'liberar-ancho-banda', label: '📤 Liberar Ancho de Banda', effect: '-BW' },
    { id: 'activar-modo-emergencia', label: '🚨 MODO EMERGENCIA', effect: 'Todas -' },
  ];

  const handleAction = (action) => {
    if (!code) {
      addTerminalLog('❌ ERROR: Ingresa el código primero');
      return;
    }

    if (code !== correctCode) {
      addTerminalLog(`❌ CÓDIGO INCORRECTO. Intento fallido.`);
      setCode('');
      return;
    }

    addTerminalLog(`✅ Ejecutando: ${action}`);
    executeAction(action, code);
    setCode('');
  };

  const addTerminalLog = (message) => {
    setTerminal((prev) => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">
          🔧 CONSOLA DEL TÉCNICO
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Código */}
          <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">🔐 CÓDIGO ACTUAL</h2>
            <div className="text-5xl font-bold text-green-400 font-mono mb-6 tracking-widest">
              {correctCode}
            </div>
            
            <label className="block text-green-400 font-bold mb-2">Ingresa el código:</label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="****"
              maxLength="4"
              className="w-full bg-gray-700 border-2 border-green-500 text-white text-3xl font-mono text-center px-4 py-3 rounded mb-4"
            />

            {/* Estado de Crisis */}
            <div className="bg-gray-700 rounded p-4 mt-4">
              <p className="text-gray-300 font-semibold">Estado de Crisis:</p>
              <p className={`text-2xl font-bold ${crisisLevel >= 4 ? 'text-red-500' : crisisLevel >= 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                {crisisLevel}/5
              </p>
            </div>
          </div>

          {/* Panel de Acciones */}
          <div className="lg:col-span-2 bg-gray-800 border-2 border-purple-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">⚡ ACCIONES DISPONIBLES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-lg transition transform hover:scale-105"
                >
                  <div className="text-lg">{action.label}</div>
                  <div className="text-xs text-purple-200">{action.effect}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-8 bg-gray-900 border-2 border-green-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">📡 TERMINAL DE COMANDOS</h2>
          <div className="bg-black rounded p-4 h-64 overflow-y-auto font-mono text-sm">
            {terminal.map((log, i) => (
              <div key={i} className="text-green-400">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
