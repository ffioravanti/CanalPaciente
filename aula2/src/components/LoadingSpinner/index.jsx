import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__circle" />
      <p>Carregando...</p>
    </div>
  )
}

