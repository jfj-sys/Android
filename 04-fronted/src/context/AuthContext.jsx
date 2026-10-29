// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token')); // 1. 从localStorage初始化token
    const [user, setUser] = useState(null); // 可以在这里保存解码后的用户信息

    useEffect(() => {
        if (token) {
            // 当token变化时，更新localStorage
            localStorage.setItem('token', token);
            // 可以在这里解码token获取用户信息，并设置user state
            // 暂时简化处理
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    // 2. 将 state 和函数通过 value prop 提供出去
    const value = { token, user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. 创建一个自定义Hook，方便其他组件使用
export function useAuth() {
    return useContext(AuthContext);
}
