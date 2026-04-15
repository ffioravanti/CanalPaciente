import React from 'react'

export default function ConsultaList(props) {
  const { listId, placeholder } = props

  return (
    <div className="consultas-list" id={listId}>
      {placeholder}
    </div>
  )
}

