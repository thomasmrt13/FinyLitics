import React from "react";

type SignInFormProps = {
	onSwitchToSignUp?: () => void;
	showMobileSwitch?: boolean;
};

export default function SignInForm({ onSwitchToSignUp, showMobileSwitch = false }: SignInFormProps) {

	return (
		<>
			<h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
			<p className="text-gray-500 mb-4">Ravis de vous revoir.</p>
			<form className="flex flex-col gap-3">
				<input type="email" placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
				<input type="password" placeholder="Mot de passe" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
				<button type="submit" className="mt-2 rounded-lg bg-purple-500 text-white px-4 py-2 hover:bg-purple-600 transition-colors">Se connecter</button>
			</form>
			{showMobileSwitch && (
				<button onClick={onSwitchToSignUp} className="mt-3 text-sm text-purple-600 hover:underline md:hidden self-start">Créer un compte</button>
			)}
		</>
	);
}


