import { useNavigate } from "react-router-dom";

import PageHeader from "../components/Transfer Histroy Dash/PageHeader";
import SummaryCard from "../components/Transfer Histroy Dash/SummaryCard";
import GlassCard from "../components/Transfer Histroy Dash/GlassCard";
import TransactionTable from "../components/Transfer Histroy Dash/TransactionTable";
import FilterBar from "../components/Transfer Histroy Dash/FilterBar";
import TransactionModal from "../components/Transfer Histroy Dash/TransactionModal";
import Pagination from "../components/Transfer Histroy Dash/Pagination";
import ExportButtons from "../components/Transfer Histroy Dash/ExportButtons";

import {
  FaArrowLeft,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaWallet
} from "react-icons/fa";

export default function TransactionHistory() {
  const navigate = useNavigate();

 

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B]">

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
                          Transaction History
                        </h1>
                       
                        </div>
      
              </div>
      
            </div>


      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <SummaryCard
          title="Total Transactions"
          value="125"
          icon={<FaExchangeAlt />}
        />

        <SummaryCard
          title="Total Income"
          value="₹2,85,000"
          icon={<FaArrowDown />}
          color="text-green-400"
        />

        <SummaryCard
          title="Total Expense"
          value="₹1,67,000"
          icon={<FaArrowUp />}
          color="text-red-400"
        />

        <SummaryCard
          title="Balance"
          value="₹4,52,000"
          icon={<FaWallet />}
          color="text-blue-400"
        />

      </div>


      {/* Transaction Area */}
      <div className="max-w-7xl mx-auto px-6 mt-10">

        <GlassCard className="p-8">

          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

        <ExportButtons />
         <FilterBar />
         
         <TransactionTable />
         <Pagination />

         <TransactionModal />  

        </GlassCard>
       
 
        
      </div>
        

    </div>
  );
}