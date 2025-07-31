import { useState, useEffect } from 'react'

interface BadgeResponse {
    badgeId: number;
    badgeTitle: string; 
    badgeImage: string;
}

interface UseReflectionsListProps {
  userId: string | null
  userToken: string | null
}

const useGetBadges = ({ userId, userToken }: UseReflectionsListProps) => {
  const [badges, setBadges] = useState<BadgeResponse[]>([])
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
          `http://185.150.1.9:8081/api/users/badges/7`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          setError(`Failed to fetch reflections: ${errorText}`)
          return
        }

        const data: BadgeResponse[] = await response.json()
        setBadges(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error(err)
      }
    }

    getReflections()
  }, [userId, userToken])

  return { badges, error }
}

export default useGetBadges
