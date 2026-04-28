# 🚨 Crisis Management System - Frontend

Frontend moderno en React para el sistema de gestión de crisis en tiempo real.

## 🛠️ Tecnologías

- **React 18** - UI Library
- **React Router v7** - Enrutamiento
- **Zustand** - State Management
- **Socket.io** - Comunicación en tiempo real
- **Tailwind CSS** - Estilos
- **Vite** - Build tool

## 📦 Instalación

### 1. Clonar o descargar

```bash
git clone https://github.com/tu-usuario/crisis-frontend.git
cd crisis-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar conexión con backend

Edita `src/store/crisisStore.js` y asegúrate de que la URL del socket es correcta:

```javascript
const SOCKET_URL = 'http://localhost:3000';
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## 🚀 Funcionalidades

### Lobby (`/`)
- Registro del jugador
- Selección de rol (Monitor/Técnico)
- Entrada a sala específica

### Monitor (`/ops/monitor`)
- Gráficas de temperatura, ancho de banda y DDoS
- Nivel de crisis en tiempo real
- Código de seguridad visible
- Solo lectura - observa las acciones del técnico

### Técnico (`/ops/bridge`)
- Ingreso de código de seguridad
- Botones de acciones (5 disponibles)
- Terminal de comandos para logs
- Ejecución de órdenes validadas

## 📁 Estructura

```
crisis-frontend/
├── src/
│   ├── pages/
│   │   ├── Lobby.jsx      # Registro e inicio
│   │   ├── Monitor.jsx    # Panel de monitoreo
│   │   └── Bridge.jsx     # Consola del técnico
│   ├── components/
│   │   └── Navbar.jsx     # Navbar y Layout
│   ├── store/
│   │   └── crisisStore.js # Zustand + Socket.io
│   ├── App.jsx            # Rutas principales
│   ├── main.jsx           # Entrada React
│   └── index.css          # Estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔌 Socket.io Events

### Emitidos (Cliente → Servidor)

```javascript
socket.emit('join-room', { roomId, role });
socket.emit('execute-action', { roomId, action, code });
```

### Escuchados (Servidor → Cliente)

```javascript
socket.on('game-state', (gameState) => {});
socket.on('metrics-update', (metrics) => {});
socket.on('action-result', (result) => {});
socket.on('game-over', (result) => {});
```

## 🎮 Cómo Jugar

1. Abre http://localhost:5173 en DOS pestañas
2. **Pestaña 1**: Monitor con rol "Monitor"
3. **Pestaña 2**: Técnico con rol "Técnico"
4. Monitor ve código → Técnico lo ingresa y presiona acciones
5. Las métricas actualizan en tiempo real

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 🐛 Solución de Problemas

### WebSocket no conecta
- Verifica que el servidor backend está corriendo en `http://localhost:3000`
- Comprueba la consola del navegador (F12)
- Revisa la URL de Socket en `crisisStore.js`

### Estilos no cargan
- Corre `npm install` nuevamente
- Limpia la cache con Ctrl+Shift+R

### Código no sincroniza
- Asegúrate que Monitor y Técnico están en la MISMA sala
- Recarga ambas pestañas

## 📝 Entrega

Incluye en tu entrega:
- ✅ Enlace del repositorio de backend
- ✅ Enlace del repositorio de frontend
- ✅ Instrucciones de instalación
- ✅ Video demostrativo (opcional)

## 📞 Contacto

Para problemas técnicos:
1. Revisa los logs del navegador (F12)
2. Verifica la conexión Socket.io
3. Asegúrate que ambos proyectos están corriendo

---

**Creado para**: Electiva - Sistemas de Tiempo Real  
**Temática**: Gestión de Data Center  
**Stack**: React + Vite + Zustand + Socket.io
