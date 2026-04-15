import React, { useState } from 'react'
import ExamesTable from './ExamesTable'
import './style.css'

import { usePaciente } from '../../../contexts/PacienteContext'

export default function ExamesPage() {
  const { dados, atualizarExames } = usePaciente()
  const { exames } = dados
  const [carregando, setCarregando] = useState(false)

  const examesLista = exames || []
  const resultadosDisponiveis = examesLista.filter((exame) => exame.status === 'resultado_disponivel').length
  const aguardandoResultado = examesLista.filter((exame) => exame.status === 'aguardando_resultado').length

  const handleAtualizar = async () => {
    setCarregando(true)
    await atualizarExames()
    setCarregando(false)
  }

  return (
    <div className="main-content records-page">
      <div className="page-header">
        <div>
          <h2>Exames</h2>
          <p>Consulte seus exames em uma visão mais clara, com indicadores rápidos e status destacados.</p>
        </div>
        <button className="btn-primary" type="button" onClick={handleAtualizar} disabled={carregando}>
          {carregando ? 'Atualizando...' : 'Atualizar dados'}
        </button>
      </div>

      <section className="records-summary">
        <article className="summary-card">
          <span className="summary-card__label">Total de exames</span>
          <strong className="summary-card__value">{examesLista.length}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-card__label">Resultados liberados</span>
          <strong className="summary-card__value">{resultadosDisponiveis}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-card__label">Aguardando resultado</span>
          <strong className="summary-card__value">{aguardandoResultado}</strong>
        </article>
      </section>

      {examesLista.length > 0 ? (
        <ExamesTable exames={examesLista} />
      ) : (
        <section className="records-empty">
          <h3>Nenhum exame disponível</h3>
          <p className="muted">Quando novos exames forem recebidos, eles aparecerão nesta tabela.</p>
        </section>
      )}
    </div>
  )
}
