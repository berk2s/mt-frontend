import { clientJSON } from '../axios.services'
import { MessageResponse, MyChatsResponse, SendMessageRequest } from '../types'

export const chatService = {
  myChats,
  chatMessages,
  sendMessage,
}

async function myChats(): Promise<MyChatsResponse[]> {
  const chats: MyChatsResponse[] = await clientJSON.get('/chats')

  return Promise.resolve(chats)
}

async function chatMessages(chatId: string): Promise<MessageResponse[]> {
  const chatMessages: MessageResponse[] = await clientJSON.get(
    `/chats/${chatId}/messages`,
  )

  return Promise.resolve(chatMessages)
}

async function sendMessage(chatId: string, req: SendMessageRequest) {
  const sendMessage: MessageResponse = await clientJSON.post(
    `/chats/${chatId}/messages`,
    JSON.stringify(req),
  )

  return Promise.resolve(sendMessage)
}
