import React, { useState } from 'react'
import InputField from '../../../components/InputField'
import { usePaciente } from '../../../contexts/PacienteContext'

export default function LoginForm(props) {
  const { carteirinhaLabel, senhaLabel, submitText } = props
  const { login, error } = usePaciente()

  const [carteirinha, setCarteirinha] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(carteirinha, senha)
    } catch (err) {
      console.error('Login error:', err)
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

