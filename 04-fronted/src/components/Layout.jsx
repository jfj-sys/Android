// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="app-layout">
            <nav style={{ background: '#eee', padding: '1rem' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>主页</Link>
                <Link to="/login" style={{ marginRight: '1rem' }}>登录</Link>
                <Link to="/register">注册</Link>
            </nav>

            <main style={{ padding: '1rem' }}>
                {/* Outlet 是一个占位符，子路由匹配的组件会在这里显示 */}
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;
