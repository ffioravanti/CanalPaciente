const API_URL = 'https://portal-unimed-fake-api.onrender.com'

const loginPage = document.querySelector('#login-page')
const appContainer = document.querySelector('#app-container')
const loginForm = document.querySelector('#login-form')
const carteirinhaInput = document.querySelector('#carteirinha')
const senhaInput = document.querySelector('#senha')
const carteirinhaError = document.querySelector('#carteirinha-error')
const senhaError = document.querySelector('#senha-error')
const loginError = document.querySelector('#login-error')

const userName = document.querySelector('#user-name')
const btnLogout = document.querySelector('#btn-logout')
const consultasList = document.querySelector('#consultas-list')
const consultasCount = document.querySelector('#consultas-count')


function validateLogin() {
  let isValid = true

  // Limpar erros anteriores
  carteirinhaError.textContent = ''
  senhaError.textContent = ''
  loginError.textContent = ''
  carteirinhaInput.classList.remove('input-error')
  senhaInput.classList.remove('input-error')

  // Validar carteirinha
  if (!carteirinhaInput.value.trim()) {
    carteirinhaError.textContent = 'A carteirinha é obrigatória.'
    carteirinhaInput.classList.add('input-error')
    isValid = false
  }

  // Validar senha
  if (!senhaInput.value.trim()) {
    senhaError.textContent = 'A senha é obrigatória.'
    senhaInput.classList.add('input-error')
    isValid = false
  }

  return isValid
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusLabel(status) {
  const labels = {
    agendada: 'Agendada',
    realizada: 'Realizada',
    cancelada: 'Cancelada',
  }
  return labels[status] || status
}


// =============================================
// AULA 02 - AUTENTICAÇÃO E CONSUMO DE API
// =============================================

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  if (!validateLogin()) return

  const btnSubmit = loginForm.querySelector('[type="submit"]')
  btnSubmit.disabled = true
  btnSubmit.textContent = 'Entrando...'

  try {
    const paciente = await authenticate(carteirinhaInput.value.trim(), senhaInput.value)
    console.log('Paciente autenticado:', paciente)

    if (paciente) {
      showApp(paciente)
    } else {
      loginError.textContent = 'Carteirinha ou senha incorretos.'
    }
  } catch (error) {
    loginError.textContent = 'Erro ao conectar com o servidor. Tente novamente.'
  } finally {
    btnSubmit.disabled = false
    btnSubmit.textContent = 'Entrar'
  }
})

async function authenticate(carteirinha, senha) {
  try {
    const response = await axios.post(`${API_URL}/login`, { carteirinha, senha })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err);
    return null;
  }

}

async function showApp(paciente) {
  loginPage.style.display = "none"
  appContainer.style.display = "block"
  userName.textContent = paciente.nome.split(' ')[0]

  try {
    const response = await axios.get(`${API_URL}/consultas`, { params: { pacienteId: paciente.id } })
    const consultas = response.data;
    console.log(consultas);

    consultas.forEach(consulta => {
      const card = createConsultaCard(consulta)
      consultasList.appendChild(card);
    })
  } catch (err) {
    console.log(err);
  }

}


function createConsultaCard(consulta) {
  const card = document.createElement('div')
  card.className = 'consulta-card'

  card.innerHTML = `
    <div class="consulta-card__header">
      <span class="consulta-card__especialidade">${consulta.especialidade}</span>
      <span class="status-badge status-badge--${consulta.status}">
        ${getStatusLabel(consulta.status)}
      </span>
    </div>
    <p class="consulta-card__medico">${consulta.medico}</p>
    <div class="consulta-card__details">
      <span>📅 ${formatDateTime(consulta.data)}</span>
      <span>📍 ${consulta.local}</span>
    </div>
  `

  return card
}
