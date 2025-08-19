import React from "react";

type SignUpFormProps = {
	onSwitchToSignIn?: () => void;
	showMobileSwitch?: boolean;
};

export default function SignUpForm({ onSwitchToSignIn, showMobileSwitch = false }: SignUpFormProps) {
	return (
		<>
			<h2 className="text-3xl font-bold text-gray-800 mb-2">Inscription</h2>
			<p className="text-gray-500 mb-4">Bienvenue parmi nous.</p>
			<form className="flex flex-col gap-3">
				<input type="text" placeholder="Nom complet" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
				<input type="email" placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
				<input type="password" placeholder="Mot de passe" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
				<button type="submit" className="mt-2 rounded-lg bg-purple-500 text-white px-4 py-2 hover:bg-purple-600 transition-colors">Créer le compte</button>
			</form>
			{showMobileSwitch && (
				<button onClick={onSwitchToSignIn} className="mt-3 text-sm text-purple-600 hover:underline md:hidden self-start">J'ai déjà un compte</button>
			)}
		</>
	);
}


