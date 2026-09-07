import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingOverview({
  transactions = [],
}) {

  const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthlyTransactions = transactions.filter((transaction) => {
  if (!transaction.createdAt) return false;

  const date = new Date(transaction.createdAt);

  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
});

  // --------------------------------
  // Get expense transactions this month
  // --------------------------------

  const expenseTransactions = monthlyTransactions.filter(
  (transaction) =>
    transaction.type === "WITHDRAW" ||
    transaction.type === "TRANSFER" ||
    transaction.type === "BILL_PAYMENT" ||
    transaction.type === "QR_PAYMENT" ||
    transaction.type === "CARD_PAYMENT"
);


  // --------------------------------
  // Category totals
  // --------------------------------

  const categoryTotals = {};

  expenseTransactions.forEach((transaction) => {

    let category =
      transaction.category ||
      transaction.categoryName ||
      transaction.method ||
      transaction.type;

    // Fallback category names

    if (transaction.type === "WITHDRAW") {
      category = "Withdraw";
    }

    if (transaction.type === "TRANSFER") {
      category = "Transfer";
    }

        if (transaction.type === "BILL_PAYMENT") {
      category = "Pay Bills";
    }

    if (transaction.type === "CARD_PAYMENT") {
  category = "Card Payment";
}

    if (transaction.type === "QR_PAYMENT") {
  category = "QR Payment";
}

    category =
      category.charAt(0).toUpperCase() +
      category.slice(1).toLowerCase();

    const amount = Number(transaction.amount || 0);

    categoryTotals[category] =
      (categoryTotals[category] || 0) + amount;
  });


  // --------------------------------
  // Convert object to array
  // --------------------------------

  const categories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);


  // --------------------------------
  // Total expense
  // --------------------------------

  const totalExpense = expenseTransactions.reduce(
    (total, transaction) =>
      total + Number(transaction.amount || 0),
    0
  );


  // --------------------------------
  // Top 5 categories
  // --------------------------------

  const topCategories = categories.slice(0, 5);


  // --------------------------------
  // Percentage calculation
  // --------------------------------

  const categoryData = topCategories.map(
    ([name, amount]) => {

      const percentage =
        totalExpense > 0
          ? Math.round((amount / totalExpense) * 100)
          : 0;

      return {
        name,
        amount,
        percentage,
      };
    }
  );


  // --------------------------------
  // Chart data
  // --------------------------------

  const data = {
    labels: categoryData.map(
      (item) => item.name
    ),

    datasets: [
      {
        data: categoryData.map(
          (item) => item.amount
        ),

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


  // --------------------------------
  // Chart options
  // --------------------------------

  const options = {
    cutout: "70%",

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {

            const value =
              Number(context.raw || 0);

            return ` ₹${value.toLocaleString(
              "en-IN"
            )}`;
          },
        },
      },
    },
  };


  // --------------------------------
  // Currency formatter
  // --------------------------------

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };


  return (
    <div className="bg-[#141B34] rounded-3xl p-11 shadow-xl">

      {/* Heading */}

      <h2 className="text-white text-xl font-bold">
        Spending Overview
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        This Month
      </p>


      {/* Chart */}

      <div className="w-60 mx-auto relative">

        {totalExpense > 0 ? (

          <Doughnut
            data={data}
            options={options}
          />

        ) : (

          <div className="w-60 h-60 rounded-full `border-25` border-white/10 flex items-center justify-center">

            <p className="text-gray-400 text-sm">
              No expenses
            </p>

          </div>

        )}


        {/* Center Value */}

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

          <h2 className="text-3xl font-bold text-white">
            {formatCurrency(totalExpense)}
          </h2>

          <p className="text-gray-400">
            Total Expense
          </p>

        </div>

      </div>


      {/* Category List */}

      <div className="mt-8 space-y-4">

        {categoryData.length === 0 ? (

          <p className="text-center text-gray-400">
            No spending data available.
          </p>

        ) : (

          categoryData.map(
            (item, index) => (

              <div
                key={item.name}
                className="flex justify-between items-center"
              >

                <span className="text-gray-300 flex items-center gap-2">

                  <span
                    className="text-lg"
                    style={{
                      color:
                        data.datasets[0]
                          .backgroundColor[index],
                    }}
                  >
                    ●
                  </span>

                  {item.name}

                </span>


                <span className="text-white font-medium">

                  {item.percentage}%

                </span>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}