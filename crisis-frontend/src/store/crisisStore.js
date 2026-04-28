import { create } from 'zustand';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export const useCrisisStore = create((set) => ({
  // Estado del jugador
  playerName: '',
  playerRole: null,
  roomId: '',
  
  // Estado del juego
  temperature: 45,
  bandwidth: 60,
  ddosAttempts: 50,
  crisisLevel: 1,
  correctCode: '****',
  status: 'idle',
  
  // Socket
  socket: null,
  connected: false,
  
  // Acciones
  setPlayerName: (name) => set({ playerName: name }),
  setPlayerRole: (role) => set({ playerRole: role }),
  setRoomId: (roomId) => set({ roomId }),
  
  // Conectar al servidor
  connectToGame: (playerName, role, roomId) => {
    const socket = io(SOCKET_URL);
    
    socket.on('connect', () => {
      console.log('Conectado al servidor');
      set({ connected: true, socket });
      socket.emit('join-room', { roomId, role });
    });
    
    socket.on('game-state', (gameState) => {
      set({
        temperature: gameState.temperature,
        bandwidth: gameState.bandwidth,
        ddosAttempts: gameState.ddosAttempts,
        crisisLevel: gameState.crisisLevel,
        correctCode: gameState.correctCode,
        status: 'active',
      });
    });
    
    socket.on('metrics-update', (metrics) => {
      set({
        temperature: metrics.temperature,
        bandwidth: metrics.bandwidth,
        ddosAttempts: metrics.ddosAttempts,
        crisisLevel: metrics.crisisLevel,
        correctCode: metrics.correctCode,
      });
    });
    
    socket.on('action-result', (result) => {
      console.log('Acción:', result.message);
    });
    
    socket.on('game-over', (result) => {
      set({ status: result.success ? 'won' : 'lost' });
    });
    
    socket.on('disconnect', () => {
      set({ connected: false });
    });
    
    set({
      playerName,
      playerRole: role,
      roomId,
      socket,
    });
  },
  
  // Ejecutar acción (Técnico)
  executeAction: (action, code) => {
    const socket = (set as any).__getState?.().socket;
    if (socket) {
      socket.emit('execute-action', {
        roomId: (set as any).__getState?.().roomId,
        action,
        code,
      });
    }
  },
  
  // Desconectar
  disconnect: () => {
    const state = (set as any).__getState?.();
    if (state.socket) {
      state.socket.disconnect();
    }
    set({
      playerName: '',
      playerRole: null,
      roomId: '',
      temperature: 45,
      bandwidth: 60,
      ddosAttempts: 50,
      crisisLevel: 1,
      status: 'idle',
      connected: false,
      socket: null,
    });
  },
}));
