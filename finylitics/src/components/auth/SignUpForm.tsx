"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

type SignUpFormProps = {
	onSwitchToSignIn?: () => void;
	showMobileSwitch?: boolean;
};

export default function SignUpForm({ onSwitchToSignIn, showMobileSwitch = false }: SignUpFormProps) {
	const { register } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		
		try {
			await register(name, email, password);
		} catch (err: any) {
			setError(err.message || "Erreur lors de l'inscription");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<h2 className="text-3xl font-bold text-gray-800 mb-2">Inscription</h2>
			<p className="text-gray-500 mb-4">Bienvenue parmi nous.</p>
			
			{error && (
				<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
					{error}
				</div>
			)}
			
			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input 
					type="text" 
					placeholder="Nom complet" 
					value={name} 
					onChange={(e) => setName(e.target.value)} 
					className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
				<input 
					type="email" 
					placeholder="Email" 
					value={email} 
					onChange={(e) => setEmail(e.target.value)} 
					className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
				<input 
					type="password" 
					placeholder="Mot de passe" 
					value={password} 
					onChange={(e) => setPassword(e.target.value)} 
					className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
				<button 
					type="submit" 
					disabled={isLoading}
					className="mt-2 rounded-lg bg-purple-500 text-white px-4 py-2 hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? "Création en cours..." : "Créer le compte"}
				</button>
			</form>
			{showMobileSwitch && (
				<button onClick={onSwitchToSignIn} className="mt-3 text-sm text-purple-600 hover:underline md:hidden self-start">J'ai déjà un compte</button>
			)}
		</>
	);
}


