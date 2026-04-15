import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from './modules/auth/LoginPage'
import MainLayout from './components/MainLayout'
import DashboardPage from './modules/dashboard/DashboardPage'
import ConsultasPage from './modules/consultas/ConsultasPage'
import ExamesPage from './modules/exames/ExamesPage'
import AgendamentoPage from './modules/agendamento/AgendamentoPage'

import { PacienteProvider, usePaciente } from './contexts/PacienteContext'

function AppRoutes() {
  const { paciente } = usePaciente()

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

  return (
    <Routes>
      <Route path="/login" element={!paciente ? <LoginPage data={loginPageData} /> : <Navigate to="/" replace />} />

      <Route path="/" element={<Navigate to={paciente ? '/dashboard' : '/login'} replace />} />

      <Route element={paciente ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
        <Route path="/exames" element={<ExamesPage />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <PacienteProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PacienteProvider>
  )
}

