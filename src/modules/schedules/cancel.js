import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period")

// Gera evento de clique para cada lista (manhã, tarde  e noite )
periods.forEach((periods) => {
  // Captura o evento de clique na lista.
  periods.addEventListener("click", async (event) => {
    if(event.target.classList.contains("cancel-icon")) {
      // Obtém a li pai do elemento clicado.
      const item = event.target.closest("li")

      // Peda o ID do agendamento para remover.
      const { id } = item.dataset
      
      // Confirma que o ID foi selecionado.
      if(id) {
        // Confirma se o usuário quer cancelar.
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        )

        if(isConfirm) {
          // Faz a requisição na API para cancelar.
          await scheduleCancel({ id })

          // Recarrega os agendamentos.
          schedulesDay()
        }
      }
    }
  })
})