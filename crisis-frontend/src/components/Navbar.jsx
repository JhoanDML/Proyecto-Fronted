import { useLocation, useNavigate } from 'react-router-dom';
import { useCrisisStore } from '../store/crisisStore';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerName, playerRole, disconnect } = useCrisisStore();

  // No mostrar navbar en lobby
  if (location.pathname === '/') {
    return null;
  }

  const handleAbort = () => {
    if (window.confirm('¿Estás seguro de que deseas abortar la misión?')) {
      disconnect();
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black border-b-2 border-cyan-500 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-cyan-400">🚨 CRISIS SYSTEM</h1>
          
          {playerName && (
            <div className="text-white">
              <p className="text-sm text-gray-400">Jugador</p>
              <p className="font-bold">{playerName}</p>
            </div>
          )}
          
          {playerRole && (
            <div className={`text-white px-4 py-2 rounded-lg ${playerRole === 'monitor' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              <p className="text-xs text-gray-200">Rol</p>
              <p className="font-bold">{playerRole === 'monitor' ? '👁️ Monitor' : '🔧 Técnico'}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleAbort}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105"
        >
          ❌ Abortar Misión
        </button>
      </div>
    </nav>
  );
}

export function Layout({ children }) {
  return (
    <div className="pt-20">
      <Navbar />
      {children}
    </div>
  );
}
