import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrisisStore } from '../store/crisisStore';

export default function Lobby() {
  const navigate = useNavigate();
  const { connectToGame } = useCrisisStore();
  
  const [playerName, setPlayerName] = useState('');
  const [role, setRole] = useState('');
  const [roomId, setRoomId] = useState('sala-1');

  const handleConnect = () => {
    if (!playerName || !role) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    connectToGame(playerName, role, roomId);
    
    // Navegar a la vista correspondiente
    if (role === 'monitor') {
      navigate('/ops/monitor');
    } else {
      navigate('/ops/bridge');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 border-2 border-cyan-500 rounded-lg p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2 text-center">
          🚨 CRISIS SYSTEM
        </h1>
        <p className="text-gray-400 text-center mb-8">Data Center Management</p>
        
        <div className="space-y-6">
          {/* Nombre del jugador */}
          <div>
            <label className="block text-cyan-400 font-semibold mb-2">
              👤 Nombre del Jugador
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Ej: Jorge"
              className="w-full bg-gray-700 border-2 border-cyan-500 text-white px-4 py-2 rounded focus:outline-none focus:border-cyan-300"
            />
          </div>

          {/* Seleccionar rol */}
          <div>
            <label className="block text-cyan-400 font-semibold mb-2">
              🎯 Selecciona tu Rol
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 border-gray-600 rounded cursor-pointer hover:border-cyan-500 hover:bg-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="monitor"
                  checked={role === 'monitor'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-3"
                />
                <span className="text-white">
                  👁️ Monitor - Solo observar
                </span>
              </label>
              
              <label className="flex items-center p-3 border-2 border-gray-600 rounded cursor-pointer hover:border-cyan-500 hover:bg-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="tecnico"
                  checked={role === 'tecnico'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-3"
                />
                <span className="text-white">
                  🔧 Técnico - Ejecutar acciones
                </span>
              </label>
            </div>
          </div>

          {/* ID de sala */}
          <div>
            <label className="block text-cyan-400 font-semibold mb-2">
              🏠 ID de Sala
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="sala-1"
              className="w-full bg-gray-700 border-2 border-cyan-500 text-white px-4 py-2 rounded focus:outline-none focus:border-cyan-300"
            />
          </div>

          {/* Botón conectar */}
          <button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 mt-8"
          >
            🚀 Conectar a Sala
          </button>
        </div>

        <p className="text-gray-500 text-sm text-center mt-6">
          Asegúrate de usar la misma sala ID con tu compañero
        </p>
      </div>
    </div>
  );
}
