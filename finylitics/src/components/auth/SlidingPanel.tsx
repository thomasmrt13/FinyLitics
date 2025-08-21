import React from "react";

type SlidingPanelProps = {
	isSignUp: boolean;
	onSignUp: () => void;
	onSignIn: () => void;
};

export default function SlidingPanel({ isSignUp, onSignUp, onSignIn }: SlidingPanelProps) {
	return (
		<div className={`hidden md:flex absolute inset-y-0 left-0 w-1/2 z-10 flex-col text-white justify-center items-center px-8 transition-transform duration-700 ease-in-out ${isSignUp ? "md:translate-x-0 bg-purple-600 rounded-r-xl" : "md:translate-x-[100%] bg-purple-500 rounded-l-xl"}`}>
			<h2 className="text-3xl font-bold mb-3">{isSignUp ? "Bon retour !" : "Bienvenue !"}</h2>
			<div className="w-20 border-2 border-white mb-4"></div>
			{isSignUp ? (
				<>
					<p className="mb-1">Vous avez déjà un compte ?</p>
					<p className="mb-4">Connectez-vous pour continuer.</p>
					<button onClick={onSignIn} className="border-2 border-white rounded-full px-10 py-2 hover:bg-white hover:text-purple-700 transition-colors">Se connecter</button>
				</>
			) : (
				<>
					<p className="mb-1">Pas encore de compte ?</p>
					<p className="mb-4">Inscrivez-vous en un clic.</p>
					<button onClick={onSignUp} className="border-2 border-white rounded-full px-10 py-2 hover:bg-white hover:text-purple-700 transition-colors">S'inscrire</button>
				</>
			)}
		</div>
	);
}


