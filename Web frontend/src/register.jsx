import React, { useRef, useState } from "react";
import logoWeaver from "./assets/WEAVER_logo.png";
import "./login.css";

export default function Register() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirm: false
  });

  // handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleKeyDown = (nextRef) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) nextRef.current.focus();
    }
  };

  // validaciones simples en frontend
  const isUsernameValid = form.username.trim().length >= 2;
  const isEmailValid = form.email.includes("@") && form.email.includes(".");
  const isPasswordValid = form.password.length >= 6;
  const isConfirmValid = form.password === form.confirm && form.confirm.length > 0;

  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      // marcar todo como touched para mostrar errores
      setTouched({ username: true, email: true, password: true, confirm: true });
      return;
    }

    // Mock: aquí iría la llamada al backend
    alert("Cuenta creada (mock). Próximo: integrar con FastAPI cuando esté listo.");
    // opcional: redirigir / limpiar form / mostrar modal, etc.
  };

  return (
    <div className="login-page min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full login-card rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-2xl p-6 space-y-6">
        {/* Logo / título */}
        <div className="text-center space-y-3">
          <img src={logoWeaver} className="login-logo" alt="Logo Weaver" draggable="false" />

          <h1 className="text-xl font-semibold text-slate-50 tracking-[0.2em] uppercase">
            Create your own thread
          </h1>

          <p className="text-sm text-slate-400">
            Start weaving your own web — share your profile to new people!
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="skong"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown(emailRef)}
              ref={usernameRef}
            />
            {touched.username && !isUsernameValid && (
              <p className="text-xs text-rose-400 mt-1">El username debe tener al menos 2 caracteres.</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tejedor@hive.com"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown(passwordRef)}
              ref={emailRef}
            />
            {touched.email && !isEmailValid && (
              <p className="text-xs text-rose-400 mt-1">Introduce un correo válido.</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown(confirmRef)}
              ref={passwordRef}
            />
            {touched.password && !isPasswordValid && (
              <p className="text-xs text-rose-400 mt-1">La contraseña debe tener al menos 6 caracteres.</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <label htmlFor="confirm" className="block text-sm font-medium text-slate-200">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Bind your password"
              className="block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-inner"
              value={form.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // intentar enviar el form si es válido
                  if (isFormValid) {
                    // dispara submit manuel
                    e.target.form.requestSubmit?.();
                  }
                }
              }}
              ref={confirmRef}
            />
            {touched.confirm && !isConfirmValid && (
              <p className="text-xs text-rose-400 mt-1">Las contraseñas no coinciden.</p>
            )}
          </div>

          {/* Opcional: checkbox */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500 cursor-pointer"
              />
              <span>I have read and agreeded to the terms and conditions - Pay 50 rosaries</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full rounded-lg ${isFormValid ? "bg-violet-500 hover:bg-violet-400 active:bg-violet-600 shadow-[0_0_25px_rgba(139,92,246,0.6)] text-slate-950 font-semibold" : "bg-slate-800 text-slate-500 cursor-not-allowed"} transition-colors py-2.5 text-sm`}
          >
            Create account
          </button>
        </form>

        {/* Enlace a login */}
        <p className="text-center text-xs text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-violet-300 hover:text-violet-200">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
