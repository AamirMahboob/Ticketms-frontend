import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginFormState {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "agent" | "customer";
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function loginRequest(
  credentials: LoginFormState,
): Promise<AuthResponse> {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Invalid email or password.");
  }

  return res.json();
}

// ─── Role → Route ─────────────────────────────────────────────────────────────

const ROLE_REDIRECT: Record<AuthResponse["user"]["role"], string> = {
  admin: "/dashboard/admin",
  agent: "/dashboard/agent",
  customer: "/dashboard/customer",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { token, user } = await loginUser(form);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(ROLE_REDIRECT[user.role]);
    } catch (error: any) {
      setError(error?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#4F46E5" />
              <path
                d="M9 22L14 10L19 18L22 14L27 22"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your support workspace</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={`input ${error ? "input--error" : ""}`}
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>

          <div className="field">
            <div className="label-row">
              <label htmlFor="password" className="label">
                Password
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input ${error ? "input--error" : ""}`}
            />
          </div>

          {/* Error */}
          {error && (
            <p id="login-error" className="error-msg" role="alert">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 4v3M7 9.5v.5"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !form.email || !form.password}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="register-hint">
          Don't have an account?{" "}
          <a href="/register" className="register-link">
            Contact your admin
          </a>
        </p>
      </div>

      {/* Styles */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f8fc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 24px;
        }

        .login-card {
          background: #ffffff;
          border: 1px solid #e8e8f0;
          border-radius: 16px;
          padding: 40px 36px 32px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 24px rgba(79, 70, 229, 0.07);
        }

        /* Header */
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-logo {
          display: inline-flex;
          margin-bottom: 16px;
        }
        .login-title {
          font-size: 22px;
          font-weight: 600;
          color: #111118;
          letter-spacing: -0.3px;
          margin-bottom: 6px;
        }
        .login-subtitle {
          font-size: 14px;
          color: #6b7280;
        }

        /* Fields */
        .field {
          margin-bottom: 18px;
        }
        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }
        .label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }
        .label-row .label {
          margin-bottom: 0;
        }
        .forgot-link {
          font-size: 12px;
          color: #4F46E5;
          text-decoration: none;
        }
        .forgot-link:hover { text-decoration: underline; }

        .input {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          font-size: 14px;
          color: #111118;
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input::placeholder { color: #9ca3af; }
        .input:hover { border-color: #a5b4fc; }
        .input:focus {
          border-color: #4F46E5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }
        .input--error {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }

        /* Error message */
        .error-msg {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 16px;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          height: 42px;
          background: #4F46E5;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
          transition: background 0.15s, opacity 0.15s, transform 0.1s;
        }
        .submit-btn:hover:not(:disabled) { background: #4338ca; }
        .submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .register-hint {
          text-align: center;
          font-size: 13px;
          color: #6b7280;
          margin-top: 20px;
        }
        .register-link {
          color: #4F46E5;
          font-weight: 500;
          text-decoration: none;
        }
        .register-link:hover { text-decoration: underline; }

        @media (max-width: 440px) {
          .login-card { padding: 32px 24px 28px; }
        }
      `}</style>
    </div>
  );
}
