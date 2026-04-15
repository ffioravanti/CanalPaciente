import React, { useState } from 'react'
import ConsultasTable from './ConsultasTable'
import './style.css'

import { usePaciente } from '../../../contexts/PacienteContext'

export default function ConsultasPage() {
  const { dados, atualizarConsultas } = usePaciente()
  const { consultas } = dados
  const [carregando, setCarregando] = useState(false)

  const consultasLista = consultas || []
  const totalConsultas = consultasLista.length
  const consultasConfirmadas = consultasLista.filter((consulta) =>
    ['confirmada', 'agendada', 'realizada'].includes((consulta.status || '').toLowerCase()),
  ).length
  const proximaConsulta = [...consultasLista].sort((a, b) => new Date(a.data) - new Date(b.data))[0]

  const handleAtualizar = async () => {
    setCarregando(true)
    await atualizarConsultas()
    setCarregando(false)
  }

  return (
    <div className="main-content records-page">
      <div className="page-header">
        <div>
          <h2>Consultas</h2>
          <p>Visualize seus atendimentos em uma grade organizada e acompanhe o status de cada agendamento.</p>
        </div>
        <button className="btn-primary" type="button" onClick={handleAtualizar} disabled={carregando}>
          {carregando ? 'Atualizando...' : 'Atualizar dados'}
        </button>
      </div>

      <section className="records-summary">
        <article className="summary-card">
          <span className="summary-card__label">Total de consultas</span>
          <strong className="summary-card__value">{totalConsultas}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-card__label">Consultas ativas</span>
          <strong className="summary-card__value">{consultasConfirmadas}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-card__label">Próxima consulta</span>
          <strong className="summary-card__value summary-card__value--small">
            {proximaConsulta ? new Date(proximaConsulta.data).toLocaleDateString('pt-BR') : 'Sem agenda'}
          </strong>
        </article>
      </section>

      {consultasLista.length > 0 ? (
        <ConsultasTable consultas={consultasLista} />
      ) : (
        <section className="records-empty">
          <h3>Nenhuma consulta disponível</h3>
          <p className="muted">Quando novas consultas forem carregadas, elas aparecerão aqui em formato de tabela.</p>
        </section>
      )}
    </div>
  )
}
