import React from 'react'

export default function LoginHeader(props) {
  const { icon, title, subtitle } = props

  return (
    <header className="login-header">
      <span className="login-header__icon">{icon}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}

