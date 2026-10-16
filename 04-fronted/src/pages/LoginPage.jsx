// src/pages/LoginPage.jsx
import { useState } from 'react'; // 1. 引入 useState

function LoginPage() {
    // 2. 使用 useState 创建状态变量
    // email 是状态值，setEmail 是更新这个值的函数
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单默认的提交刷新行为
        console.log('正在尝试登录:', { email, password });
        // 下节课我们会在这里调用API
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
