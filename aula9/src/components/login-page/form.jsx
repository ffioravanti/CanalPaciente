import React, { useState } from 'react'
import axios from 'axios'
import InputField from './InputField'

export default function LoginForm(props) {
  const { carteirinhaLabel, senhaLabel, submitText, setPaciente } = props

  const [carteirinha, setCarteirinha] = useState('')
  const [senha, setSenha] = useState('')

  const [error, setError] = useState('')

  const API_URL = 'https://portal-unimed-fake-api.onrender.com'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${API_URL}/login`, { carteirinha, senha })
      console.log('Login successful:', response.data)
      setPaciente?.(response.data)
    } catch (err) {
      console.error('Login error:', err)
      setError('Falha no login. Verifique suas credenciais e tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form" id="login-form">
      <InputField
        id="carteirinha"
        type="text"
        placeholder="Digite sua carteirinha"
        label={carteirinhaLabel}
        value={carteirinha}
        onChange={(e) => setCarteirinha(e.target.value)}
      />

      <InputField
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        label={senhaLabel}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {error && (
        <div className="error-message" id="login-error">
          {error}
        </div>
      )}

      <button type="submit" className="btn-primary">
        {submitText}
      </button>
    </form>
  )
}

