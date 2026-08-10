import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/Transfer Histroy Dash/PageHeader";
import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

import {
  FaArrowLeft,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaDownload ,
  FaPiggyBank
} from "react-icons/fa";


import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";



const monthlyData = [
  {
    month: "Jan",
    income: 50000,
    expense: 12000,
  },
  {
    month: "Feb",
    income: 55000,
    expense: 18000,
  },
  {
    month: "Mar",
    income: 60000,
    expense: 15000,
  },
  {
    month: "Apr",
    income: 65000,
    expense: 22000,
  },
  {
    month: "May",
    income: 58000,
    expense: 17000,
  },
  {
    month: "Jun",
    income: 70000,
    expense: 25000,
  },
];
const yearlyData = [
  {
    month: "2022",
    expense: 180000,
    income: 420000,
  },
  {
    month: "2023",
    expense: 240000,
    income: 520000,
  },
  {
    month: "2024",
    expense: 290000,
    income: 610000,
  },
  {
    month: "2025",
    expense: 350000,
    income: 720000,
  },
  {
    month: "2026",
    expense: 210000,
    income: 480000,
  },
];



const incomeExpenseData = [
  {
    month:"Jan",
    income:50000,
    expense:20000
  },
  {
    month:"Feb",
    income:55000,
    expense:25000
  },
  {
    month:"Mar",
    income:60000,
    expense:30000
  },
  {
    month:"Apr",
    income:65000,
    expense:28000
  }
];



const categoryData = [
  {
    name: "Shopping",
    value: 35,
    amount: 8750,
  },
  {
    name: "Food",
    value: 25,
    amount: 6250,
  },
  {
    name: "Bills",
    value: 20,
    amount: 5000,
  },
  {
    name: "Travel",
    value: 20,
    amount: 5000,
  },
];


const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#ef4444",
  "#eab308"
];




export default function Analytics(){

  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState("6 Months");

  const savingsGoal = 100000;
const currentSavings = 45000;

const savingsPercentage =
  Math.min((currentSavings / savingsGoal) * 100, 100);

const remainingSavings =
  Math.max(savingsGoal - currentSavings, 0);


  const [period, setPeriod] = useState("Monthly");
  const spendingData =
  period === "Monthly"
    ? monthlyData
    : yearlyData;

return (

<div className="min-h-screen bg-linear-to-br  from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">



     {/* Header */}
      <div className="max-w-7xl mx-auto pb-8 px-6 pt-8">
            
                    <div className="flex items-center gap-4">
            
                      <button
                        onClick={() =>
                          navigate("/dashboard")
                        }
                        className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                      >
                        <FaArrowLeft />
                      </button>
            
            
                      <div>
            
                        <h1 className="text-3xl font-bold">
                          Analytics
                        </h1>
                       
                        </div>
      
              </div>
      
            </div>



{/* Analytics Controls */}

<div className="max-w-7xl mx-auto px-6 mb-5 mt-6">
  

  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
    
    

    {/* Page Description */}

    <div>
      <p className="text-gray-400">
        Track your income, expenses and savings
      </p>
    </div>


    {/* Controls */}

    <div className="flex flex-wrap items-center gap-3">

      {/* Monthly / Yearly */}

      <div className="flex bg-white/10 border border-white/10 rounded-xl p-1">

        <button
          onClick={() => setPeriod("Monthly")}
          className={`px-5 py-2 rounded-lg transition ${
            period === "Monthly"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          Monthly
        </button>


        <button
          onClick={() => setPeriod("Yearly")}
          className={`px-5 py-2 rounded-lg transition ${
            period === "Yearly"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          Yearly
        </button>

      </div>


      {/* Date Range */}

      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="bg-[#102E5B] border border-white/20 text-white px-4 py-3 rounded-xl outline-none cursor-pointer"
      >

        <option value="1 Month">
          1 Month
        </option>

        <option value="3 Months">
          3 Months
        </option>

        <option value="6 Months">
          6 Months
        </option>

        <option value="1 Year">
          1 Year
        </option>

      </select>


      {/* Download Report */}

      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
      >

        <FaDownload />

        Download Report

      </button>

    </div>

  </div>

</div>



{/* Overview Cards */}

<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



<GlassCard className="p-6">

<div className="flex justify-between">

<div>

<p className="text-gray-400">
Total Balance
</p>

<h2 className="text-2xl font-bold">
₹4,52,000
</h2>

</div>


<FaWallet className="text-cyan-400" size={30}/>

</div>

</GlassCard>





<GlassCard className="p-6">

<div className="flex justify-between">

<div>

<p className="text-gray-400">
Income
</p>

<h2 className="text-2xl font-bold">
₹80,000
</h2>

</div>


<FaArrowDown className="text-green-400" size={30}/>


</div>

</GlassCard>





<GlassCard className="p-6">

<div className="flex justify-between">

<div>

<p className="text-gray-400">
Expense
</p>

<h2 className="text-2xl font-bold">
₹35,000
</h2>

</div>


<FaArrowUp className="text-red-400" size={30}/>

</div>

</GlassCard>





<GlassCard className="p-6">

<div className="flex justify-between">

<div>

<p className="text-gray-400">
Savings
</p>

<h2 className="text-2xl font-bold">
₹45,000
</h2>

</div>


<FaPiggyBank className="text-yellow-400" size={30}/>


</div>

</GlassCard>



</div>







{/* Charts */}

<div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">





{/* Monthly Spending */}

<GlassCard className="p-6">


<h2 className="text-xl font-bold mb-5">
Monthly Spending
</h2>


<ResponsiveContainer width="100%" height={300}>


<LineChart data={spendingData}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Line

type="monotone"

dataKey="expense"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</GlassCard>







{/* Income Expense */}

<GlassCard className="p-6">


<h2 className="text-xl font-bold mb-5">
Income vs Expense
</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={spendingData}>


<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Bar
  dataKey="income"
  fill="#22c55e"
/>

<Bar
  dataKey="expense"
  fill="#ef4444"
/>


</BarChart>


</ResponsiveContainer>


</GlassCard>






{/* Pie Chart */}

<GlassCard className="p-6">


<h2 className="text-xl font-bold mb-5">
Category Spending
</h2>



<ResponsiveContainer width="100%" height={300}>


<PieChart>


<Pie

data={categoryData}

dataKey="value"

nameKey="name"

outerRadius={100}

>

{
categoryData.map((item,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))
}


</Pie>


<Tooltip/>


</PieChart>



</ResponsiveContainer>

<div className="mt-6 space-y-3">

  {categoryData.map((item, index) => (

    <div
      key={item.name}
      className="flex items-center justify-between bg-white/10 p-4 rounded-xl"
    >

      <div className="flex items-center gap-3">

        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: COLORS[index],
          }}
        />

        <span>
          {item.name}
        </span>

      </div>


      <div className="text-right">

        <p className="font-semibold">
          ₹{item.amount.toLocaleString("en-IN")}
        </p>

        <p className="text-sm text-gray-400">
          {item.value}%
        </p>

      </div>

    </div>

  ))}

</div>


</GlassCard>









{/* Savings Progress */}
<GlassCard className="p-6">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-xl font-bold">
        Savings Progress
      </h2>

      <p className="text-gray-400 mt-1">
        Your monthly savings goal
      </p>

    </div>

    <FaPiggyBank
      className="text-yellow-400"
      size={30}
    />

  </div>


  {/* Amount */}

  <div className="mt-8">

    <div className="flex justify-between items-center">

      <span className="text-gray-400">
        Saved
      </span>

      <span className="font-semibold">
        ₹{currentSavings.toLocaleString("en-IN")} /
        ₹{savingsGoal.toLocaleString("en-IN")}
      </span>

    </div>


    {/* Progress Bar */}

    <div className="w-full h-4 bg-white/10 rounded-full mt-4 overflow-hidden">

      <div
        className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
        style={{
          width: `${savingsPercentage}%`,
        }}
      />

    </div>


    {/* Percentage */}

    <div className="flex justify-between mt-3">

      <span className="text-cyan-400 font-semibold">
        {Math.round(savingsPercentage)}% completed
      </span>

      <span className="text-gray-400">
        ₹{remainingSavings.toLocaleString("en-IN")} remaining
      </span>

    </div>

  </div>

</GlassCard>




</div>


</div>

)

}