import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoWeaver from "./assets/WEAVER_logo.png";
import "./login.css";
import { useAuth } from "./AuthContext";

export default function Register() {
  const API_BASE_URL = "http://127.0.0.1:8000";
  const REGISTER_ENDPOINT = "/user/";

  const navigate = useNavigate();
  const { login } = useAuth();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirm: false,
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // --------------------
  // HANDLERS
  // --------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleKeyDown = (nextRef) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef.current) nextRef.current.focus();
    }
  };

  // --------------------
  // VALIDACIONES FRONTEND
  // --------------------
  const isUsernameValid = form.username.trim().length >= 2;
  const isEmailValid = form.email.includes("@") && form.email.includes(".");
  const isPasswordValid = form.password.length >= 6;
  const isConfirmValid =
    form.password === form.confirm && form.confirm.length > 0;
  const isTermsValid = termsAccepted;

  const isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid &&
    isTermsValid;

  // --------------------
  // SUBMIT
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setTouched({
        username: true,
        email: true,
        password: true,
        confirm: true,
        terms: true,
      });
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const res = await fetch(`${API_BASE_URL}${REGISTER_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
          status: "active",
          avatar_url: "",
        }),
      });

      if (!res.ok) {
        let message = "No se pudo crear la cuenta.";
        try {
          const data = await res.json();
          if (data?.message) message = data.message;
          if (data?.detail) message = data.detail;
        } catch { }
        throw new Error(message);
      }

      const data = await res.json();
      // Guardar el token JWT en el localStorage
      localStorage.setItem("token", data.token);


      if (!data.user || !data.token) {
        throw new Error("El backend no devolvió user + token correctamente.");
      }

      login(data.user, data.token);

      setSuccessMsg("Cuenta creada correctamente. Redirigiendo...");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="login-page min-h-screen flex items-center justify-center px-4 py-7">
      <div className="max-w-md w-full login-card rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-2xl p-6 space-y-6">

        {/* LOGO + TÍTULO */}
        <div className="text-center space-y-3">
          <img
            src={logoWeaver}
            className="login-logo"
            alt="Logo Weaver"
            draggable="false"
          />

          <h1 className="text-xl font-semibold text-slate-50 tracking-[0.2em] uppercase">
            Create your own thread
          </h1>

          <p className="text-sm text-slate-400">
            Start weaving your own web — share your profile with new people!
          </p>
        </div>

        {/* ERRORES Y ÉXITO */}
        {errorMsg && (
          <div className="text-xs text-rose-300 bg-rose-950/40 border border-rose-500/40 rounded-md px-3 py-2">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 rounded-md px-3 py-2">
            {successMsg}
          </div>
        )}

        {/* FORMULARIO */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>

          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm text-slate-200">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="skong"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown(emailRef)}
              ref={usernameRef}
            />
            {touched.username && !isUsernameValid && (
              <p className="text-xs text-rose-400">Min. 2 characters.</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tejedor@hive.com"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown(passwordRef)}
              ref={emailRef}
            />
            {touched.email && !isEmailValid && (
              <p className="text-xs text-rose-400">
                Please enter a valid email.
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown(confirmRef)}
              ref={passwordRef}
            />
            {touched.password && !isPasswordValid && (
              <p className="text-xs text-rose-400">
                Min. 6 characters required.
              </p>
            )}
          </div>

          {/* Confirm */}
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm text-slate-200">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Bind your password"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={confirmRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // intentar enviar el form si es válido
                  if (isFormValid) {
                    // dispara submit manual
                    e.target.form.requestSubmit?.();
                  }
                }
              }}
            />
            {touched.confirm && !isConfirmValid && (
              <p className="text-xs text-rose-400">Passwords do not match.</p>
            )}
          </div>

          {/* Terms */}
          <div className="text-xs text-slate-400">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-violet-500 cursor-pointer"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                onBlur={handleBlur}
              />
              <span>
                I accept the terms and conditions — Pay 50 rosaries.
              </span>
            </label>

            {touched.terms && !isTermsValid && (
              <p className="text-xs text-rose-400 mt-1">
                You must accept the terms.
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors
            ${isFormValid
                ? "bg-violet-500 hover: cursor-pointer text-slate-950 shadow-[0_0_25px_rgba(139,92,246,0.6)]"
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }`}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {/* Link a login */}
        <p className="text-center text-xs text-slate-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-violet-300 hover:text-violet-200"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
