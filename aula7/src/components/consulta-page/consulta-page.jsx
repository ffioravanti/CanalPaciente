import React from 'react'
import ConsultaHeader from './header'
import ConsultaContent from './content'

export default function ConsultaPage(props) {
  const { data } = props
  const { header, content } = data

  return (
    <div className="app-container" id="app-container" style={{ display: 'none' }}>
      <ConsultaHeader
        icon={header.icon}
        title={header.title}
        userName={header.userName}
        logoutText={header.logoutText}
      />
      <ConsultaContent
        title={content.title}
        countId={content.countId}
        listId={content.listId}
        placeholder={content.placeholder}
      />
    </div>
  )
}

