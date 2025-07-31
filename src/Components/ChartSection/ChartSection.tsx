import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./ChartSection.module.scss";
import useVerification from "../../Hooks/useVerification";

type Reflection = {
  reflectionId: number;
  userId: number;
  reflectionText: string;
  confidenceRating: number;
  createdAt: string;
};

export default function ChartSection() {
  const [data, setData] = useState<any[][]>([["Date", "Confidence", { type: "string", role: "tooltip" }]]);

  useEffect(() => {
    const userData = localStorage.getItem("userObject");
    if (!userData) return;

    const { id: userId } = JSON.parse(userData);

    fetch(`http://185.150.1.9:8081/api/users/reflection/${userId}`)
      .then((res) => res.json())
      .then((reflections: Reflection[]) => {
        const chartData = [["Date", "Confidence", { type: "string", role: "tooltip" }]];
        reflections.forEach((r) => {
          chartData.push([
            new Date(r.createdAt),
            r.confidenceRating,
            r.reflectionText || "(No reflection)",
          ]);
        });
        setData(chartData);
      })
      .catch((err) => {
        console.error("Failed to fetch reflections:", err);
      });
  }, []);

  return (
    <div className={`container ${styles.chartSection}`}>
      <div className="row align-items-center">
        <div className="col-md-5">
          <div className={styles.infoPanel}>
            <h2>Reflection Confidence</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis condimentum eros, quis tempor felis fermentum vel. Maecenas convallis sollicitudin fringilla. Vestibulum rhoncus auctor nisi vel bibendum. Mauris accumsan id est a aliquet. Mauris in euismod mi, et tincidunt tortor. Sed justo mauris, dignissim vel augue non, fermentum ultrices elit.
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
                  legend: { position: "bottom" },
                  colors: ["#2ecc71"],
                  backgroundColor: "transparent",
                  hAxis: {
                    title: "Date",
                    format: "MMM d, HH:mm",
                  },
                  vAxis: {
                    title: "Confidence",
                    minValue: 0,
                    maxValue: 5,
                  },
                  tooltip: { isHtml: true },
                }}
              />
            ) : (
              <p>Nothing to show...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
