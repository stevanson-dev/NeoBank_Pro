
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import SummaryCard from "../components/Transfer Histroy Dash/SummaryCard";
import GlassCard from "../components/Transfer Histroy Dash/GlassCard";
import TransactionTable from "../components/Transfer Histroy Dash/TransactionTable";
import FilterBar from "../components/Transfer Histroy Dash/FilterBar";
import Pagination from "../components/Transfer Histroy Dash/Pagination";
import ExportButtons from "../components/Transfer Histroy Dash/ExportButtons";

import {
  FaArrowLeft,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaWallet,
} from "react-icons/fa";

export default function TransactionHistory() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------
  // Filter states
  // --------------------------------

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  // --------------------------------
  // Pagination states
  // --------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 5;

  // --------------------------------
  // Reset page when filter changes
  // --------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, status]);

  // --------------------------------
  // Fetch transactions + BANK ACCOUNT
  // --------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          transactionsResponse,
          accountResponse,
        ] = await Promise.all([
          api.get("/transactions"),
          api.get("/accounts/primary"),
        ]);

        setTransactions(
          Array.isArray(transactionsResponse.data)
            ? transactionsResponse.data
            : []
        );

        // BankAccount.balance
        setBalance(
          Number(accountResponse.data?.balance || 0)
        );

      } catch (error) {
        console.error(
          "Failed to load transaction data:",
          error
        );

        setError(
          "Unable to load transaction data."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --------------------------------
  // Summary calculations
  // --------------------------------

  const totalTransactions =
    transactions.length;

  // --------------------------------
  // TOTAL INCOME
  // --------------------------------

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "DEPOSIT" ||
        transaction.type === "TRANSFER_IN"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  // --------------------------------
  // TOTAL EXPENSE
  // --------------------------------

  const totalExpense = transactions
    .filter(
      (transaction) =>
        transaction.type === "WITHDRAW" ||
        transaction.type === "TRANSFER" ||
        transaction.type === "BILL_PAYMENT" ||
        transaction.type === "QR_PAYMENT"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  // --------------------------------
  // Filter transactions
  // --------------------------------

  const filteredTransactions =
    transactions.filter(
      (transaction) => {

        const searchText =
          search.toLowerCase().trim();

        // --------------------------------
        // BILL DISPLAY TYPE
        // --------------------------------

        const displayType =
          transaction.type === "BILL_PAYMENT"
            ? "bill payment"
            : transaction.type === "QR_PAYMENT"
            ? "qr payment"
            : transaction.type || "";

        // --------------------------------
        // SEARCH FIELDS
        // --------------------------------

        const searchableText = [

          transaction.type,

          displayType,

          transaction.method,

          transaction.billCategory,

          transaction.billProvider,

          transaction.billAccountNumber,

          transaction.upiId,

          transaction.status,

          String(
            transaction.transactionId || ""
          ),

        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !searchText ||
          searchableText.includes(
            searchText
          );

        // --------------------------------
        // CATEGORY FILTER
        // --------------------------------

        const matchesCategory =
          category === "ALL" ||
          transaction.type === category;

        // --------------------------------
        // STATUS FILTER
        // --------------------------------

        const matchesStatus =
          status === "ALL" ||
          transaction.status === status;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );
      }
    );

  // --------------------------------
  // Pagination
  // --------------------------------

  const totalPages =
    Math.ceil(
      filteredTransactions.length /
        transactionsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    transactionsPerPage;

  const paginatedTransactions =
    filteredTransactions.slice(
      startIndex,
      startIndex + transactionsPerPage
    );

  // --------------------------------
  // Currency formatter
  // --------------------------------

  const formatCurrency = (amount) => {

    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;

  };

  // --------------------------------
  // Clear filters
  // --------------------------------

  const clearFilters = () => {

    setSearch("");
    setCategory("ALL");
    setStatus("");

    setStatus("ALL");
  };

  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* HEADER */}

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

            <p className="text-gray-400 mt-1">
              View and manage all your transactions
            </p>

          </div>

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <SummaryCard
          title="Total Transactions"
          value={totalTransactions}
          icon={<FaExchangeAlt />}
        />

        <SummaryCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<FaArrowDown />}
          color="text-green-400"
        />

        <SummaryCard
          title="Total Expense"
          value={formatCurrency(totalExpense)}
          icon={<FaArrowUp />}
          color="text-red-400"
        />

        <SummaryCard
          title="Balance"
          value={formatCurrency(balance)}
          icon={<FaWallet />}
          color="text-blue-400"
        />

      </div>

      {/* TRANSACTION AREA */}

      <div className="max-w-7xl mx-auto px-6 mt-10">

        <GlassCard className="p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-white">
                Recent Transactions
              </h2>

              <p className="text-gray-400 text-sm mt-1">

                {filteredTransactions.length} transaction
                {filteredTransactions.length !== 1
                  ? "s"
                  : ""} found

              </p>

            </div>

          </div>

          {/* EXPORT */}

          <ExportButtons />

          {/* FILTERS */}

          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
          />

          {/* LOADING */}

          {loading && (

            <div className="text-center py-12 text-gray-400">

              <div className="animate-pulse">
                Loading transactions...
              </div>

            </div>

          )}

          {/* ERROR */}

          {!loading && error && (

            <div className="text-center py-12">

              <p className="text-red-400">
                {error}
              </p>

              <button
                onClick={() =>
                  window.location.reload()
                }
                className="mt-4 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
              >
                Retry
              </button>

            </div>

          )}

          {/* NO RESULTS */}

          {!loading &&
            !error &&
            filteredTransactions.length === 0 && (

              <div className="text-center py-12">

                <p className="text-gray-400">
                  No transactions found.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-4 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>

              </div>

            )}

          {/* TRANSACTION TABLE */}

          {!loading &&
            !error &&
            filteredTransactions.length > 0 && (

              <TransactionTable
                transactions={
                  paginatedTransactions
                }
              />

            )}

          {/* PAGINATION */}

          {!loading &&
            !error &&
            filteredTransactions.length > 0 &&
            totalPages > 1 && (

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

            )}

        </GlassCard>

      </div>

    </div>
  );
}
