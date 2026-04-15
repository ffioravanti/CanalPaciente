import React, { useEffect } from 'react'
import { initPortal } from './portal/app'
import LoginPage from './components/login-page/login-page'
import ConsultaPage from './components/consulta-page/consulta-page'

export default function App() {
  useEffect(() => {
    const cleanup = initPortal()
    return () => cleanup && cleanup()
  }, [])

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

  const consultaPageData = {
    header: {
      icon: '🏥',
      title: 'Portal do Paciente',
      userName: 'Paciente',
      logoutText: 'Sair',
    },
    content: {
      title: 'Minhas Consultas',
      countId: 'consultas-count',
      listId: 'consultas-list',
      placeholder: null,
    },
  }

  return (
    <>
      <LoginPage data={loginPageData} />
      <ConsultaPage data={consultaPageData} />
    </>
  )
}

