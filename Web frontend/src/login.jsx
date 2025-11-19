import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoWeaver from "./assets/WEAVER_logo.png";
import "./login.css";

function Login() {
    const navigate = useNavigate();
    const passwordRef = useRef(null);

    const handleEmailKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // evita que el form se envíe
            if (passwordRef.current) {
                passwordRef.current.focus(); // pasa el foco a la contraseña
            }
        }
    };

    return (
        <div className="login-page min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full login-card rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-2xl p-6 space-y-6">
                {/* Logo / título */}
                <div className="text-center space-y-3">
                    <img src={logoWeaver} className="login-logo" alt="Logo Weaver" draggable="false"/>

                    <h1 className="text-xl font-semibold text-slate-50 tracking-[0.2em] uppercase">
                        Log in
                    </h1>

                    <p className="text-sm text-slate-400">
                        Enter the web where your contacts intertwine like threads.
                    </p>
                </div>

                {/* Formulario */}
                <form className="space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-200"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="trobbio@weaver.com"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
                            onKeyDown={handleEmailKeyDown}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                className="text-xs text-violet-300 hover:text-violet-200 cursor-pointer"
                                onClick={() => navigate("/Not_ready")}
                            >
                                Forgot your password?
                            </button>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
                            ref={passwordRef}
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500 cursor-pointer"
                            />
                            <span>Keep my thread connected</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-violet-500 hover:bg-violet-400 cursor-pointer active:bg-violet-600 transition-colors text-slate-950 font-semibold py-2.5 text-sm shadow-[0_0_25px_rgba(139,92,246,0.6)]"
                        onClick={() => navigate("/")}
                    >
                        Enter to Weaver
                    </button>
                </form>

                {/* Enlace a registro */}
                <p className="text-center text-xs text-slate-400">
                    Are you not yet part of the web?{" "}
                    <a
                        href="#"
                        className="font-medium text-violet-300 hover:text-violet-200"
                        onClick={() => navigate("/Not_ready")}
                    >
                        Create account
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
