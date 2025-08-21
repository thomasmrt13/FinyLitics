import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface User {
    id: number;
    email: string;
    name: string;
    createdAt: string;
  }

export function useAuth () {
    const [user,setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const data = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        localStorage.setItem("token", data.token);
        setUser(data.user);
        router.push("/dashboard");
    }

    const register = async (name: string, email: string, password: string) => {
        const data = await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        setUser(data.user);
        router.push("/dashboard");

    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/auth");
      };

    return { user, loading, login, register, logout, isAuthenticated: !!user };
}