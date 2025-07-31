import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import styles from './ChartSection.module.scss'

type Reflection = {
  reflectionId: number
  userId: number
  reflectionText: string
  confidenceRating: number
  createdAt: string
}

export default function ChartSection() {
  const [data, setData] = useState<
    (string | Date | number | { type: string; role: string })[][]
  >([['Date', 'Confidence', { type: 'string', role: 'tooltip' }]])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('userObject')

    if (!token || !userData) return

    const { userId } = JSON.parse(userData)

    fetch(`http://185.150.1.9:8081/api/users/reflections/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((reflections: Reflection[]) => {
        const chartData: (
          | string
          | Date
          | number
          | { type: string; role: string }
        )[][] = [['Date', 'Confidence', { type: 'string', role: 'tooltip' }]]
        reflections.forEach((r) => {
          chartData.push([
            new Date(r.createdAt),
            r.confidenceRating,
            r.reflectionText || '(No reflection)'
          ])
        })
        setData(chartData)
      })
      .catch((err) => {
        console.error('Failed to fetch reflections:', err)
      })
  }, [])

  return (
    <div className={`container ${styles.chartSection}`}>
      <div className="row align-items-center">
        <div className="col-md-5">
          <div className={styles.infoPanel}>
            <h2>Reflection Confidence</h2>
            <p>
              This chart displays your confidence ratings over time based on
              your reflections. Each point represents a reflection, with the
              date and confidence level indicated.
            </p>
          </div>
        </div>

        <div className="col-md-7">
          <div className={styles.chartWrapper}>
            {data.length > 1 ? (
              <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={{
                  legend: { position: 'bottom' },
                  colors: ['#2ecc71'],
                  backgroundColor: 'transparent',
                  pointSize: 6,
                  hAxis: {
                    title: 'Date',
                    format: 'MMM d, HH:mm'
                  },
                  vAxis: {
                    title: 'Confidence',
                    minValue: 0,
                    maxValue: 5
                  },
                  tooltip: { isHtml: true }
                }}
              />
            ) : (
              <p>Nothing to show...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
