import React from "react";
import logoWeaver from "./assets/WEAVER_logo.png";
import "./login.css";

function Login() {
    return (
        <div className="login-page min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full login-card rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-2xl p-8 space-y-8">
                {/* Logo / título */}
                <div className="text-center space-y-3">
                    <img
                        src={logoWeaver}
                        className="login-logo"
                        alt="Logo Weaver"
                        draggable="false"
                    />

                    <div className="inline-flex items-center justify-center rounded-full bg-slate-900/80 px-4 py-1 text-xs font-semibold text-violet-300 border border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                        WEAVER
                    </div>

                    <h1 className="text-xl font-semibold text-slate-50 tracking-[0.2em] uppercase">
                        Inicia sesión
                    </h1>

                    <p className="text-sm text-slate-400">
                        Entra al telar donde tus contactos se entrelazan como hilos.
                    </p>
                </div>

                {/* Formulario */}
                <form className="space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-200"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tejedor@hive.com"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Contraseña
                            </label>
                            <button
                                type="button"
                                className="text-xs text-violet-300 hover:text-violet-200"
                            >
                                ¿Olvidaste tu hilo?
                            </button>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500"
                            />
                            <span>Mantener mi hilo conectado</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-violet-500 hover:bg-violet-400 active:bg-violet-600 transition-colors text-slate-950 font-semibold py-2.5 text-sm shadow-[0_0_25px_rgba(139,92,246,0.6)]"
                    >
                        Entrar al telar
                    </button>
                </form>

                {/* Enlace a registro */}
                <p className="text-center text-xs text-slate-400">
                    ¿Aún no formas parte del tejido?{" "}
                    <a
                        href="#"
                        className="font-medium text-violet-300 hover:text-violet-200"
                    >
                        Crear cuenta
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
