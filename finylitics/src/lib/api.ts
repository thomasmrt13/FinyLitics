const API_URL = process.env.API_URL || "http://localhost:9000";

export async function apiFetch (
    endpoint: string,
    options: RequestInit = {},
    withAuth: boolean = false
) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string> | undefined),
    };

    if (withAuth) {
        const token = localStorage.getItem("token");
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });
        
        const contentType = res.headers.get("content-type");
        let data;
        
        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            data = await res.text();
        }
        
        // Si la réponse n'est pas OK, lancer une erreur avec le message du backend
        if (!res.ok) {
            const errorMessage = data?.message || data?.error || `Erreur ${res.status}: ${res.statusText}`;
            const error = new Error(errorMessage);
            (error as any).status = res.status;
            (error as any).data = data;
            throw error;
        }
        
        return data;
    } catch (error) {
        // Si c'est déjà une erreur qu'on a créée, la relancer
        if (error instanceof Error && (error as any).status) {
            throw error;
        }
        
        // Sinon, c'est une erreur réseau ou autre
        console.error("Erreur API:", error);
        throw new Error("Erreur de connexion au serveur");
    }
}