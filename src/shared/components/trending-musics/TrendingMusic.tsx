"use client";

import {
  BarElement,
  CategoryScale,
  type ChartData,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { type FC } from "react";
import { Bar } from "react-chartjs-2";
import { useIsClient } from "usehooks-ts";

import { type ISong } from "@/core/apis/songApis";
import { type Pagination } from "@/core/models/pagination";

function getRandomLightColor() {
  const r = Math.floor(Math.random() * 128) + 128; // 128 to 255
  const g = Math.floor(Math.random() * 128) + 128; // 128 to 255
  const b = Math.floor(Math.random() * 128) + 128; // 128 to 255

  return `rgb(${r}, ${g}, ${b})`;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  readonly songsPage: Pagination<ISong>;
};

export const TrendingMusic: FC<Props> = ({ songsPage }) => {
  const isClient = useIsClient();
  const data: ChartData<"bar", number[], string> = {
    labels: songsPage.items.slice(0, 5).map((song) => `${song.name}`),
    datasets: [
      {
        type: "bar",
        label: "Play time",
        data: songsPage.items.slice(0, 5).map((song) => song.playTime),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: songsPage.items
          .slice(0, 5)
          .map(() => getRandomLightColor()),
      },
    ],
  };
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
          },
          // labelOffset: -50,
          align: "center",
          callback: function (_, index) {
            const label = this.getLabelForValue(index);
            const widthLimit = 120; // Maximum width (in pixels) for each line
            const ctx = this.chart.ctx; // Get the canvas context to measure the text width
            const words = label.split(" ");
            let line = "";
            const lines = [];

            for (let i = 0; i < words.length; i++) {
              const testLine = line + words[i] + " ";
              const testWidth = ctx.measureText(testLine).width;
              if (testWidth > widthLimit) {
                lines.push(line.trim());
                line = words[i] + " ";
              } else {
                line = testLine;
              }
            }

            lines.push(line.trim()); // Add the last line
            return lines;
          },
          maxRotation: 0, // Keep labels horizontal
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        // This more specific font property overrides the global property
        title: {
          font: {
            size: 11,
          },
        },
        labels: {
          font: {
            size: 11,
          },
        },
      },
    },
  };
  return (
    <div className="p-container flex justify-center">
      <div className="w-[800px]">
        {isClient && <Bar height={120} data={data} options={options} />}
      </div>
    </div>
  );
};
