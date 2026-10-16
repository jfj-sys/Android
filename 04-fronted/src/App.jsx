// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout />
      }> {/* Layout作为父路由 */}
        {/* 嵌套在Layout中的子路由 */}
        <Route index element={<DashboardPage />
        } /> {/* index表示父路径'/'的默认子路由 */}
        <Route path="login" element={<LoginPage />
        } />
        <Route path="register" element={<RegisterPage />
        } />
      </Route>
    </Routes>
  );
}
export default App;