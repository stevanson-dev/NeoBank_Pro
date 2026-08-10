import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUniversity,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

export default function Accounts() {

  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "NeoBank Pro",
      accountNumber: "458923456789",
      ifsc: "NEOB0001234",
      type: "Savings Account",
      balance: 125450,
      status: "Active",
      primary: true,
    },
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountToRemove, setAccountToRemove] = useState(null);

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [error, setError] = useState("");


  /* --------------------------------
     PRIMARY ACCOUNT
  -------------------------------- */

  const primaryAccount = accounts.find(
    (account) => account.primary
  );


  /* --------------------------------
     MASK ACCOUNT NUMBER
  -------------------------------- */

  const maskAccountNumber = (number) => {

    if (!number) return "";

    return `**** **** ${number.slice(-4)}`;
  };


  /* --------------------------------
     ADD ACCOUNT
  -------------------------------- */

  const handleAddAccount = () => {

    setError("");

    if (!bankName.trim()) {
      setError("Please enter bank name.");
      return;
    }

    if (!/^\d{10,16}$/.test(accountNumber)) {
      setError("Account number must contain 10-16 digits.");
      return;
    }

    if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(ifsc)) {
      setError("Please enter a valid IFSC code.");
      return;
    }


    // Prevent duplicate account

    const alreadyExists = accounts.some(
      (account) =>
        account.accountNumber === accountNumber
    );

    if (alreadyExists) {
      setError("This account is already linked.");
      return;
    }


    const newAccount = {
      id: Date.now(),
      bankName: bankName.trim(),
      accountNumber,
      ifsc: ifsc.toUpperCase(),
      type: "Savings Account",
      balance: 0,
      status: "Active",

      // First account becomes primary

      primary: accounts.length === 0,
    };


    setAccounts((prev) => [
      ...prev,
      newAccount,
    ]);


    setBankName("");
    setAccountNumber("");
    setIfsc("");
    setError("");

    setShowAddAccount(false);
  };


  /* --------------------------------
     SET PRIMARY
  -------------------------------- */

  const handleSetPrimary = (id) => {

    setAccounts((prev) =>
      prev.map((account) => ({
        ...account,

        primary:
          account.id === id,
      }))
    );

  };


  /* --------------------------------
     REMOVE ACCOUNT
  -------------------------------- */

  const handleRemoveAccount = () => {

    if (!accountToRemove) return;


    // PRIMARY PROTECTION

    if (accountToRemove.primary) {

      setAccountToRemove(null);

      return;
    }


    // LAST ACCOUNT PROTECTION

    if (accounts.length <= 1) {

      setAccountToRemove(null);

      return;
    }


    setAccounts((prev) =>
      prev.filter(
        (account) =>
          account.id !== accountToRemove.id
      )
    );


    setAccountToRemove(null);
  };


  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto px-6 pt-8">

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
              Accounts
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your bank accounts
            </p>

          </div>

        </div>

      </div>



      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* ================= PRIMARY ACCOUNT ================= */}

        {primaryAccount && (

          <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 shadow-xl">


            <div className="flex justify-between items-start">


              <div>

                <p className="text-white/70">
                  Primary Account
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {primaryAccount.bankName}
                </h2>

              </div>


              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">

                <FaUniversity size={24} />

              </div>

            </div>



            {/* BALANCE */}

            <div className="mt-10">

              <p className="text-white/70 text-sm">
                Available Balance
              </p>

              <h1 className="text-4xl font-bold mt-2">

                ₹
                {primaryAccount.balance.toLocaleString(
                  "en-IN"
                )}

              </h1>

            </div>



            {/* ACCOUNT DETAILS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


              <div>

                <p className="text-white/60 text-sm">
                  Account Number
                </p>


                <div className="flex items-center gap-3 mt-1">

                  <p className="font-semibold">

                    {showNumber
                      ? primaryAccount.accountNumber
                      : maskAccountNumber(
                          primaryAccount.accountNumber
                        )}

                  </p>


                  <button
                    onClick={() =>
                      setShowNumber(!showNumber)
                    }
                    className="text-white/80 hover:text-white"
                  >

                    {showNumber
                      ? <FaEyeSlash />
                      : <FaEye />}

                  </button>

                </div>

              </div>



              <div>

                <p className="text-white/60 text-sm">
                  IFSC Code
                </p>

                <p className="font-semibold mt-1">
                  {primaryAccount.ifsc}
                </p>

              </div>



              <div>

                <p className="text-white/60 text-sm">
                  Status
                </p>

                <div className="flex items-center gap-2 mt-1">

                  <FaCheckCircle />

                  <span>
                    {primaryAccount.status}
                  </span>

                </div>

              </div>

            </div>

          </div>

        )}



        {/* ================= LINKED ACCOUNTS ================= */}

        <div className="mt-10">


          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


            <div>

              <h2 className="text-2xl font-bold">
                Linked Bank Accounts
              </h2>

              <p className="text-gray-400 mt-1">
                Manage your connected accounts
              </p>

            </div>


            <button
              onClick={() =>
                setShowAddAccount(true)
              }
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
            >

              <FaPlus />

              Add Account

            </button>

          </div>



          {/* ACCOUNT LIST */}

          <div className="mt-6 space-y-4">


            {accounts.map((account) => (

              <div
                key={account.id}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >


                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">


                  {/* ACCOUNT INFO */}

                  <div className="flex items-center gap-4">


                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">

                      <FaUniversity size={22} />

                    </div>


                    <div>

                      <h3 className="font-semibold">
                        {account.bankName}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {maskAccountNumber(
                          account.accountNumber
                        )}
                      </p>

                    </div>

                  </div>



                  {/* PRIMARY */}

                  <div>

                    {account.primary ? (

                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">

                        Primary

                      </span>

                    ) : (

                      <button
                        onClick={() =>
                          handleSetPrimary(
                            account.id
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition"
                      >

                        Set Primary

                      </button>

                    )}

                  </div>

                </div>



                {/* ACTIONS */}

                <div className="border-t border-white/10 mt-6 pt-5 flex flex-wrap gap-3">


                  <button
                    onClick={() =>
                      setSelectedAccount(account)
                    }
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                  >

                    View Details

                  </button>



                  {/* REMOVE ONLY NON PRIMARY */}

                  {!account.primary && (

                    <button
                      onClick={() =>
                        setAccountToRemove(account)
                      }
                      className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
                    >

                      <FaTrash />

                      Remove

                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* ================= SECURITY ================= */}

        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex gap-3">

          <FaCheckCircle className="text-green-400 mt-1" />

          <div>

            <h3 className="font-semibold">
              Your accounts are secure
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Your account information is protected
              by NeoBank Pro security.
            </p>

          </div>

        </div>

      </div>



      {/* =================================================
          ADD ACCOUNT MODAL
      ================================================= */}

      {showAddAccount && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">


          <div
            onClick={() =>
              setShowAddAccount(false)
            }
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
          />


          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8">


            <button
              onClick={() =>
                setShowAddAccount(false)
              }
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >

              <FaTimes />

            </button>


            <h2 className="text-2xl font-bold">
              Add Bank Account
            </h2>


            <p className="text-gray-400 mt-2">
              Connect another bank account
            </p>



            {error && (

              <div className="mt-5 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">

                {error}

              </div>

            )}



            <div className="mt-6 space-y-4">


              <input
                type="text"
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
                placeholder="Bank Name"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none placeholder-gray-500"
              />


              <input
                type="text"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="Account Number"
                maxLength={16}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none placeholder-gray-500"
              />


              <input
                type="text"
                value={ifsc}
                onChange={(e) =>
                  setIfsc(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="IFSC Code"
                maxLength={11}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none placeholder-gray-500"
              />


              <button
                onClick={handleAddAccount}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >

                Add Account

              </button>

            </div>

          </div>

        </div>

      )}



      {/* =================================================
          VIEW DETAILS MODAL
      ================================================= */}

      {selectedAccount && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">


          <div
            onClick={() =>
              setSelectedAccount(null)
            }
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
          />


          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8">


            <button
              onClick={() =>
                setSelectedAccount(null)
              }
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
            >

              <FaTimes />

            </button>


            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">

              <FaUniversity size={22} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Account Details
            </h2>


            <div className="mt-6 space-y-5">


              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Bank Name
                </span>

                <span className="font-semibold text-right">
                  {selectedAccount.bankName}
                </span>

              </div>


              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Account Number
                </span>

                <span className="font-semibold">
                  {maskAccountNumber(
                    selectedAccount.accountNumber
                  )}
                </span>

              </div>


              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  IFSC
                </span>

                <span className="font-semibold">
                  {selectedAccount.ifsc}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-400">
                  Account Type
                </span>

                <span>
                  {selectedAccount.type}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-400">
                  Balance
                </span>

                <span>
                  ₹
                  {selectedAccount.balance.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-400">
                  Status
                </span>

                <span className="text-green-400">
                  {selectedAccount.status}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-400">
                  Account Role
                </span>

                <span>
                  {selectedAccount.primary
                    ? "Primary"
                    : "Linked"}
                </span>

              </div>

            </div>


            <button
              onClick={() =>
                setSelectedAccount(null)
              }
              className="w-full mt-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >

              Close

            </button>

          </div>

        </div>

      )}



      {/* =================================================
          REMOVE CONFIRMATION
      ================================================= */}

      {accountToRemove && (

        <div className="fixed inset-0 `z-60` flex items-center justify-center px-6">


          <div
            onClick={() =>
              setAccountToRemove(null)
            }
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />


          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8">


            <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">

              <FaTrash size={22} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Remove Account?
            </h2>


            <p className="text-gray-400 mt-3">

              Are you sure you want to remove{" "}

              <span className="text-white font-semibold">
                {accountToRemove.bankName}
              </span>

              {" "}from your linked accounts?

            </p>


            <div className="flex gap-3 mt-7">


              <button
                onClick={() =>
                  setAccountToRemove(null)
                }
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >

                Cancel

              </button>


              <button
                onClick={handleRemoveAccount}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
              >

                Remove

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}