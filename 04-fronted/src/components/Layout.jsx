// src/components/Layout.jsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout() {
    const { token, logout } = useAuth(); // 从全局状态获取 token 和 logout 函数
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // 清除 token
        navigate('/login'); // 退出后跳转到登录页
    };

    return (
        <div className="app-layout">
            <nav style={{ background: '#eee', padding: '1rem' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>主页</Link>

                {token ? (
                    // 已登录：只显示退出登录按钮，不显示登录/注册
                    <button onClick={handleLogout}>退出登录</button>
                ) : (
                    // 未登录：显示登录和注册链接
                    <>
                        <Link to="/login" style={{ marginRight: '1rem' }}>登录</Link>
                        <Link to="/register">注册</Link>
                    </>
                )}
            </nav>

            <main style={{ padding: '1rem' }}>
                {/* Outlet 是一个占位符，子路由匹配的组件会在这里显示 */}
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;
