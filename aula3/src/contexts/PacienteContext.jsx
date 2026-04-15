import React, { createContext, useContext, useState } from 'react'

import { post } from '../services/api'

const PacienteContext = createContext(null)

export function PacienteProvider(props) {
  const { children } = props

  const [paciente, setPaciente] = useState(null)
  const [error, setError] = useState(null)

  const login = async (carteirinha, senha) => {
    setError(null)
    try {
      const data = await post('/login', { carteirinha, senha })
      setPaciente(data)
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais e tente novamente.')
    }
  }

  const logout = () => {
    setPaciente(null)
  }

  return <PacienteContext.Provider value={{ paciente, login, logout, error }}>{children}</PacienteContext.Provider>
}

export function usePaciente() {
  const context = useContext(PacienteContext)
  if (!context) {
    throw new Error('usePaciente deve ser usado dentro de um PacienteProvider')
  }
  return context
}

