import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import "../styles/pages/login.css";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(username);
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <main className="login">
      <aside className="login__branding">
        <div className="login__branding-content">
          <h1 className="login__branding-logo">Amira Beauty</h1>
          <p className="login__branding-tagline">
            Descubra o melhor da beleza com a linha de produtos Amira Beauty
          </p>
          <div className="login__branding-buttons">
            <Link
              to="/"
              className="login__branding-btn login__branding-btn--primary"
            >
              Nossos produtos
            </Link>
          </div>
        </div>
      </aside>

      <section className="login__form-section">
        <div className="login__form-container">
          <header className="login__header">
            <h1 className="login__logo">Amira Beauty</h1>
          </header>

          <div className="login__content">
            <h2 className="login__title">Acesse</h2>
            <p className="login__subtitle">
              Faça login na sua conta da Amira Beauty
            </p>

            <form className="login__form" onSubmit={handleSubmit}>
              <div className="login__input-group">
                <label htmlFor="email">Usuário</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="login__input-group">
                <label htmlFor="password">Senha</label>
                <div className="login__password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`bi ${
                      passwordVisible ? "bi-eye-slash" : "bi-eye"
                    } login__toggle-password`}
                    onClick={togglePassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
              </div>

              <div className="login__form-options">
                <label className="login__checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Lembrar minha senha
                </label>
                <a href="#" className="login__link login__link--forgot">
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                className={`login__button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  "Fazer login"
                )}
              </button>
            </form>

            <footer className="login__footer">
              Ainda não tem uma conta?{" "}
              <a href="#" className="login__link login__link--signup">
                Inscreva-se
              </a>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;