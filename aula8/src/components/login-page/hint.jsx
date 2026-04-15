import React from 'react'

export default function LoginHint(props) {
  const { carteirinha, senha } = props

  return (
    <p className="login-hint">
      Carteirinha: <strong>{carteirinha}</strong> | Senha: <strong>{senha}</strong>
    </p>
  )
}

