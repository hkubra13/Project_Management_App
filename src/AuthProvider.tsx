import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);


    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(import.meta.env.VITE_REACT_APP_API + "/Auth/LoginUser", {
                userName: username,
                passwordHash: password
            });

            if (response.data.authenticateResult) {
                localStorage.setItem("token", response.data.authToken);
                setIsAuthenticated(true);
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

