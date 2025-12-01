import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoWeaver from "./assets/WEAVER_logo.png";
import "./login.css";

function Login() {
    const API_BASE_URL = "http://127.0.0.1:8000"; // url de tu backend
    const REGISTER_ENDPOINT = "/user/"; // api de registro de un nuevo usuario

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const passwordRef = useRef(null);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleEmailKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // evita que el form se envíe
            if (passwordRef.current) {
                passwordRef.current.focus(); // pasa el foco a la contraseña
            }
        }
    };

    // mismas validaciones que en Register
    const isEmailValid = form.email.includes("@") && form.email.includes(".");
    const isPasswordValid = form.password.length >= 6;

    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            // marcar campos como tocados para que salgan los mensajes rojos
            setTouched({ email: true, password: true });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(API_BASE_URL + REGISTER_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (!response.ok) {
                let message = "Correo o contraseña incorrectos.";
                try {
                    const data = await res.json();
                    if (data?.detail) message = data.detail;
                    if (data?.message) message = data.message;
                } catch {
                    // si no era JSON, dejamos el mensaje por defecto
                }
                throw new Error(message);
            }

            const data = await response.json();

            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
            }
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            // luego navegas al home
            navigate("/");
        } catch (error) {
            setErrorMsg(error.message || "Error desconocido. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full login-card rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-2xl p-6 space-y-6">
                {/* Logo / título */}
                <div className="text-center space-y-3">
                    <img
                        src={logoWeaver}
                        className="login-logo"
                        alt="Logo Weaver"
                        draggable="false"
                    />

                    <h1 className="text-xl font-semibold text-slate-50 tracking-[0.2em] uppercase">
                        Log in
                    </h1>

                    <p className="text-sm text-slate-400">
                        Enter the web where your contacts intertwine like threads.
                    </p>
                </div>

                {/* Formulario */}
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-200"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="trobbio@weaver.com"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
                            onKeyDown={handleEmailKeyDown}
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && !isEmailValid && (
                            <p className="text-xs text-rose-400 mt-1">
                                Introduce un correo válido.
                            </p>
                        )}
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
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
                            ref={passwordRef}
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && !isPasswordValid && (
                            <p className="text-xs text-rose-400 mt-1">
                                La contraseña debe tener al menos 6 caracteres.
                            </p>
                        )}
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
                        disabled={!isFormValid}
                        className={`w-full rounded-lg ${isFormValid
                            ? "bg-violet-500 hover:bg-violet-400 cursor-pointer active:bg-violet-600 text-slate-950 font-semibold shadow-[0_0_25px_rgba(139,92,246,0.6)]"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            } transition-colors py-2.5 text-sm`}
                    >
                        Enter to Weaver
                    </button>
                </form>

                {/* Enlace a registro */}
                <p className="text-center text-xs text-slate-400">
                    Are you not yet part of the web?{" "}
                    <a
                        href="/register"
                        className="font-medium text-violet-300 hover:text-violet-200"
                        onClick={() => navigate("/Register")}
                    >
                        Create account
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
