import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingOverview() {
  const data = {
    labels: [
      "Food & Dining",
      "Shopping",
      "Bills",
      "Transport",
      "Others",
    ],

    datasets: [
      {
        data: [35, 25, 20, 10, 10],

        backgroundColor: [
          "#3B82F6",
          "#8B5CF6",
          "#F97316",
          "#EC4899",
          "#FACC15",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-[#141B34] rounded-3xl  p-11 shadow-xl">

      <h2 className="text-white text-xl  font-bold">
        Spending Overview
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        This Month
      </p>

      <div className="w-60 mx-auto relative">

        <Doughnut
          data={data}
          options={options}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <h2 className="text-3xl font-bold text-white">
            $2,340
          </h2>

          <p className="text-gray-400">
            Total Expense
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span className="text-blue-400">
            ● Food & Dining
          </span>

          <span className="text-white">
            35%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-purple-400">
            ● Shopping
          </span>

          <span className="text-white">
            25%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-orange-400">
            ● Bills
          </span>

          <span className="text-white">
            20%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-pink-400">
            ● Transport
          </span>

          <span className="text-white">
            10%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-yellow-400">
            ● Others
          </span>

          <span className="text-white">
            10%
          </span>
        </div>

      </div>

    </div>
  );
}