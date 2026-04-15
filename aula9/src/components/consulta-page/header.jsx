import React from 'react'

export default function ConsultaHeader(props) {
  const { icon, title, userName, logoutText } = props

  return (
    <header className="header">
      <div className="header__logo">
        <span>{icon}</span>
        <h1>{title}</h1>
      </div>

      <div className="header__user">
        <span id="user-name">{userName}</span>
        <button className="btn-logout" id="btn-logout" type="button">
          {logoutText}
        </button>
      </div>
    </header>
  )
}

