import { io } from 'socket.io-client'
import apiConfig from '../../config/api.config'
import { tokenService } from '../token-service/token.services'

export const socketService = {
  socket,
}

const token = tokenService.getToken()

const socketio = io(apiConfig.baseUrl, {
  reconnectionDelayMax: 10000,
  auth: {
    token,
  },
})

function socket() {
  socketio.on('connection', (data) => {})

  return socketio
}
