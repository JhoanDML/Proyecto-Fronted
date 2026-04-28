import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Navbar';
import Lobby from './pages/Lobby';
import Monitor from './pages/Monitor';
import Bridge from './pages/Bridge';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route 
          path="/ops/monitor" 
          element={
            <Layout>
              <Monitor />
            </Layout>
          } 
        />
        <Route 
          path="/ops/bridge" 
          element={
            <Layout>
              <Bridge />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
