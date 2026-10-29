// src/pages/LoginPage.jsx
import { useState } from 'react'; // 1. 引入 useState
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { useAuth } from '../context/AuthContext'; // 引入useAuth
import apiClient from '../api'; // 引入 apiClient

function LoginPage() {
    const { login } = useAuth(); // 从Context中获取login函数（必须在组件内部调用）
    const navigate = useNavigate(); // 获取navigate函数
    // 2. 使用 useState 创建状态变量
    // email 是状态值，setEmail 是更新这个值的函数
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/users/login', { email, password });
            login(response.data.token); // 调用Context的login函数来更新全局token
            navigate('/'); // 登录成功后跳转到主页
        } catch (err) {
            console.error('登录失败:', err.response?.data || err.message); // 错误处理
        }
    };

    return (
        <div>
            <h1>登录</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>邮箱:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // 3. 监听输入，并用setEmail更新状态
                    />
                </div>
                <div>
                    <label>密码:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">登录</button>
            </form>
        </div>
    );
}
export default LoginPage;
