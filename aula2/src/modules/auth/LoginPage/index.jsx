import React, { useContext } from 'react'
import './style.css'

import LoginHeader from './Header'
import LoginForm from './Form'
import LoginHint from './Hint'

import PacienteContext from '../../../contexts/PacienteContext'

export default function LoginPage(props) {
  const { data } = props
  const { header, form, hint } = data
  const { setPaciente } = useContext(PacienteContext)

  return (
    <main className="login-page">
      <div className="login-card">
        <LoginHeader icon={header.icon} title={header.title} subtitle={header.subtitle} />
        <LoginForm
          setPaciente={setPaciente}
          carteirinhaLabel={form.carteirinhaLabel}
          senhaLabel={form.senhaLabel}
          submitText={form.submitText}
        />
        <LoginHint carteirinha={hint.carteirinha} senha={hint.senha} />
      </div>
    </main>
  )
}

