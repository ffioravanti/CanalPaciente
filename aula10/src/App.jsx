import React, { useState } from 'react'
import LoginPage from './modules/auth/LoginPage'
import DashboardPage from './modules/dashboard/DashboardPage'

export default function App() {
  const [paciente, setPaciente] = useState(null)

  const loginPageData = {
    header: {
      icon: '🏥',
      title: 'Portal do Paciente',
      subtitle: 'Unimed',
    },
    form: {
      carteirinhaLabel: 'Carteirinha',
      senhaLabel: 'Senha',
      submitText: 'Entrar',
    },
    hint: {
      carteirinha: '0089234000012',
      senha: '123456',
    },
  }

  if (!paciente) {
    return <LoginPage data={loginPageData} setPaciente={setPaciente} />
  }

  return <DashboardPage paciente={paciente} onLogout={() => setPaciente(null)} />
}

