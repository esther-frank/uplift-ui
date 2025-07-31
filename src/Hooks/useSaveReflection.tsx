import { useState, useCallback } from 'react'

type useSaveReflectionProps = {
  userToken: string | null
}

type SaveReflectionData = {
  userId: string
  reflectionTitle: string
  reflectionText: string
  confidenceRating: number
  emoji: string
  image_attachment?: string | null
}

const useSaveReflection = ({ userToken }: useSaveReflectionProps) => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const saveReflection = useCallback(
    async (data: SaveReflectionData) => {
      if (!userToken) {
        setError('No user token provided')
        return false
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `http://185.150.1.9:8081/api/users/create-reflection/${data.userId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({
              userId: data.userId,
              reflectionTitle: data.reflectionTitle,
              reflectionText: data.reflectionText,
              confidenceRating: data.confidenceRating,
              emoji: data.emoji,
              image_attachment: data.image_attachment || null
            })
          }
        )

        if (!response.ok) {
          throw new Error('Failed to save reflection')
        }

        setIsLoading(false)
        return true // Success
      } catch (error) {
        console.error('Error saving reflection:', error)
        setError('Failed to save reflection, please try again later.')
        setIsLoading(false)
        return false // Failure
      }
    },
    [userToken]
  )

  return { saveReflection, error, isLoading }
}

export default useSaveReflection
