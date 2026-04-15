import React from 'react'

function formatStatus(status) {
  if (status === 'resultado_disponivel') return 'Resultado disponível'
  if (status === 'aguardando_resultado') return 'Aguardando resultado'
  return status
}

function getStatusClass(status) {
  if (status === 'resultado_disponivel') return 'status-badge status-badge--realizada'
  return 'status-badge status-badge--pending'
}

export default function ExamesTable(props) {
  const { exames } = props

  return (
    <section className="records-table-card">
      <div className="records-table-card__header">
        <div>
          <h3>Histórico de exames</h3>
          <p className="muted">Veja a data de realização e acompanhe a liberação dos resultados.</p>
        </div>
      </div>

      <div className="records-table-wrap">
        <table className="records-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exames.map((exame) => (
              <tr key={exame.id}>
                <td>{exame.tipo}</td>
                <td>{new Date(exame.data).toLocaleDateString('pt-BR')}</td>
                <td>
                  <span className={getStatusClass(exame.status)}>{formatStatus(exame.status)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
