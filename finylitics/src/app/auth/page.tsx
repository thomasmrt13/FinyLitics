"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import SlidingPanel from "@/components/auth/SlidingPanel";

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
            <div className="relative w-full max-w-md md:w-2/3 md:max-w-4xl h-auto md:h-[520px] rounded-2xl shadow-xl bg-white overflow-hidden">
                {/* Deux colonnes: empilées en mobile, côte à côte en md+ */}
                <div className="flex h-full flex-col md:flex-row">
                    {/* Sign in (gauche) */}
                    <div className={`${isSignUp ? "hidden" : "flex"} md:flex w-full md:w-1/2 p-8 flex-col justify-center transition-opacity duration-500 ${isSignUp ? "md:opacity-40 md:pointer-events-none" : "md:opacity-100"}`}>
                        <SignInForm onSwitchToSignUp={() => setIsSignUp(true)} showMobileSwitch />
                    </div>

                    {/* Sign up (droite) */}
                    <div className={`${isSignUp ? "flex" : "hidden"} md:flex w-full md:w-1/2 p-8 flex-col justify-center transition-opacity duration-500 ${isSignUp ? "md:opacity-100" : "md:opacity-40 md:pointer-events-none"}`}>
                        <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} showMobileSwitch />
                    </div>
                </div>

                {/* Panneau violet overlay (visible uniquement en md+) */}
                <SlidingPanel isSignUp={isSignUp} onSignUp={() => setIsSignUp(true)} onSignIn={() => setIsSignUp(false)} />
            </div>
        </div>
    )
}
