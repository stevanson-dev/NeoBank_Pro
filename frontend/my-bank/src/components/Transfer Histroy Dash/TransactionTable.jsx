import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import TransactionModal from "./TransactionModal";


const transactions = [

  {
    id: 1,
    name: "Karthi",
    category: "Transfer",
    date: "Aug 06, 2026",
    amount: "-₹15,000",
    type: "expense",
    status: "Success",
  },

  {
    id: 2,
    name: "Salary",
    category: "Income",
    date: "Aug 05, 2026",
    amount: "+₹50,000",
    type: "income",
    status: "Success",
  },

  {
    id: 3,
    name: "Amazon",
    category: "Shopping",
    date: "Aug 04, 2026",
    amount: "-₹2,499",
    type: "expense",
    status: "Success",
  },

  {
    id: 4,
    name: "Electricity Bill",
    category: "Bills",
    date: "Aug 03, 2026",
    amount: "-₹1,250",
    type: "expense",
    status: "Pending",
  },

];


export default function TransactionTable() {

  const [selectedTransaction, setSelectedTransaction] = useState(null);


  return (

    <div className="overflow-x-auto mt-8">


      <table className="w-full text-left text-white">


        <thead>

          <tr className="border-b border-white/20 text-gray-300">

            <th className="py-4">
              Transaction
            </th>

            <th>
              Category
            </th>

            <th>
              Date
            </th>

            <th>
              Amount
            </th>

            <th>
              Status
            </th>

          </tr>

        </thead>



        <tbody>


          {transactions.map((item)=>(

            <tr

              key={item.id}

              onClick={() => setSelectedTransaction(item)}

              className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"

            >


              <td className="py-5 flex items-center gap-3">


                <div

                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === "income"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                  }`}

                >

                  {
                    item.type === "income"
                    ? <FaArrowDown />
                    : <FaArrowUp />
                  }


                </div>


                <span>
                  {item.name}
                </span>


              </td>



              <td>
                {item.category}
              </td>



              <td className="text-gray-300">
                {item.date}
              </td>



              <td

                className={
                  item.type === "income"
                  ? "text-green-400 font-semibold"
                  : "text-red-400 font-semibold"
                }

              >

                {item.amount}

              </td>



              <td>

                <span

                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "Success"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                  }`}

                >

                  {item.status}

                </span>

              </td>



            </tr>


          ))}


        </tbody>


      </table>



      <TransactionModal

        transaction={selectedTransaction}

        close={() => setSelectedTransaction(null)}

      />


    </div>

  );

}