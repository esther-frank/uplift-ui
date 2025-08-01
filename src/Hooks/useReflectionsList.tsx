import { useState, useEffect } from 'react'

interface ReflectionResponse {
  reflectionId: number
  userId: number
  reflectionTitle: string
  reflectionText: string
  confidenceRating: number
  emoji: string
  createdAt: string
  image_attachment: string
}

interface UseReflectionsListProps {
  userId: string | null
  userToken: string | null
}

const useReflectionsList = ({ userId, userToken }: UseReflectionsListProps) => {
  const [reflections, setReflections] = useState<ReflectionResponse[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId || !userToken) {
      setError('Missing user ID or user token')
      return
    }

    const getReflections = async () => {
      setError(null)

      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/users/reflections/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`
            }
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          setError(`Failed to fetch reflections: ${errorText}`)
          return
        }

        const data: ReflectionResponse[] = await response.json()
        setReflections(data)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error(err)
      }
    }

    getReflections()
  }, [userId, userToken])

  return { reflections, error }
}

export default useReflectionsList
