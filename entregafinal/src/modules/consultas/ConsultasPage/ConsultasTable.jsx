import React from 'react'

function getStatusClass(status) {
  const normalized = (status || '').toLowerCase()

  if (['realizada', 'confirmada', 'agendada'].includes(normalized)) return 'status-badge status-badge--realizada'
  if (['cancelada'].includes(normalized)) return 'status-badge status-badge--cancelada'

  return 'status-badge status-badge--pending'
}

export default function ConsultasTable(props) {
  const { consultas } = props

  return (
    <section className="records-table-card">
      <div className="records-table-card__header">
        <div>
          <h3>Agenda de consultas</h3>
          <p className="muted">Acompanhe data, horário, especialidade e local de atendimento.</p>
        </div>
      </div>

      <div className="records-table-wrap">
        <table className="records-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Médico</th>
              <th>Especialidade</th>
              <th>Status</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => {
              const dataObj = new Date(consulta.data)
              return (
                <tr key={consulta.id}>
                  <td>{dataObj.toLocaleDateString('pt-BR')}</td>
                  <td>{dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{consulta.medico}</td>
                  <td>{consulta.especialidade}</td>
                  <td>
                    <span className={getStatusClass(consulta.status)}>{consulta.status}</span>
                  </td>
                  <td>{consulta.local}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
