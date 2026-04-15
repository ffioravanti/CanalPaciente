import React from 'react'
import LoginHeader from './header'
import LoginForm from './form'
import LoginHint from './hint'

export default function LoginPage(props) {
  const { data, setPaciente } = props
  const { header, form, hint } = data

  return (
    <main className="login-page" id="login-page">
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

