import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputField from '../../../components/InputField'
import { usePaciente } from '../../../contexts/PacienteContext'

export default function LoginForm(props) {
  const { carteirinhaLabel, senhaLabel, submitText } = props
  const { login, error } = usePaciente()
  const carteirinhaRef = useRef(null)

  const [formData, setFormData] = useState({ carteirinha: '', senha: '' })

  useEffect(() => {
    carteirinhaRef.current?.focus()
  }, [])

  const handleChange = useCallback((e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    try {
      await login(formData.carteirinha, formData.senha)
    } catch (err) {
      console.error('Login error:', err)
    }
  }, [formData.carteirinha, formData.senha, login])

  return (
    <form onSubmit={handleSubmit} className="login-form" id="login-form">
      <InputField
        ref={carteirinhaRef}
        id="carteirinha"
        type="text"
        placeholder="Digite sua carteirinha"
        label={carteirinhaLabel}
        value={formData.carteirinha}
        onChange={handleChange}
      />

      <InputField
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        label={senhaLabel}
        value={formData.senha}
        onChange={handleChange}
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

