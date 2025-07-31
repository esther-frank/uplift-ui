import { useState, useEffect } from 'react'

interface Message {
  messageText: string
  messageAuthor: string
}

interface ResponseMessage {
  messageId: number
  messageText: string
  messageAuthor: string
  createdAt: string
  userId: number
}

const useGetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getMessages = async () => {
      setError(null)

      try {
        const response = await fetch(
          // user 1 owns the generic messages
          'http://185.150.1.9:8081/api/users/messages/personal/1',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        const responseData = await response.text()
        const responseJson = JSON.parse(responseData)

        if (response.ok) {
          const parsedMessages = responseJson.map((msg: ResponseMessage) => ({
            messageText: msg.messageText,
            messageAuthor: msg.messageAuthor
          }))
          setMessages(parsedMessages)
        } else {
          setError(`Failed to fetch messages: ${responseData}`)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error(err)
      }
    }

    getMessages()
  }, []) // Empty dependency array means this runs once on mount

  return { messages, error }
}

export default useGetMessages
