import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaExchangeAlt,
  FaShieldAlt,
  FaGift,
  FaCheckCircle,
  FaTrash
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";


const notificationsData = [
  {
    id: 1,
    type: "Transactions",
    title: "Money Transfer",
    message: "₹15,000 was transferred successfully.",
    time: "5 minutes ago",
    icon: <FaExchangeAlt />,
    color: "text-green-400",
    unread: true,
  },

  {
    id: 2,
    type: "Transactions",
    title: "Salary Credited",
    message: "₹50,000 has been credited to your account.",
    time: "Yesterday",
    icon: <FaCheckCircle />,
    color: "text-cyan-400",
    unread: true,
  },

  {
    id: 3,
    type: "Security",
    title: "Security Alert",
    message: "A new login was detected on your account.",
    time: "2 days ago",
    icon: <FaShieldAlt />,
    color: "text-red-400",
    unread: true,
  },

  {
    id: 4,
    type: "Offers",
    title: "Special Offer",
    message: "You have a new NeoBank Pro offer.",
    time: "3 days ago",
    icon: <FaGift />,
    color: "text-yellow-400",
    unread: false,
  },

  {
    id: 5,
    type: "Transactions",
    title: "Payment Successful",
    message: "Your electricity bill payment was successful.",
    time: "4 days ago",
    icon: <FaCheckCircle />,
    color: "text-green-400",
    unread: false,
  },
];


export default function Notifications() {

  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const [notifications, setNotifications] =
    useState(notificationsData);


  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item) => item.type === filter
        );

        const unreadCount = notifications.filter(
  (item) => item.unread
).length;


  const markAllAsRead = () => {

    setNotifications(
      notifications.map((item) => ({
        ...item,
        unread: false,
      }))
    );

  };


  const markAsRead = (id) => {

    setNotifications(
      notifications.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );

  };


  const deleteNotification = (id) => {

    setNotifications(
      notifications.filter(
        (item) => item.id !== id
      )
    );

  };


  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      {/* Header */}

      <div className="max-w-7xl mx-auto px-6 pt-8">


        <div className="flex items-center justify-between">


          <div className="flex items-center gap-4">


            <button
              onClick={() => navigate("/dashboard")}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <FaArrowLeft />
            </button>


           <div>

  <h1 className="text-3xl font-bold">
    Notifications
  </h1>

  <p className="text-gray-400 mt-1">
    You have {unreadCount} unread notification
    {unreadCount !== 1 ? "s" : ""}
  </p>

</div>
</div>
        
        


          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
          >
            <FaCheckCircle />

            Mark all as read

          </button>


        </div>


      </div>



      {/* Filters */}

      <div className="max-w-7xl mx-auto px-6 mt-8">


        <div className="flex flex-wrap gap-3">


          {[
            "All",
            "Transactions",
            "Security",
            "Offers"
          ].map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-xl transition ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {item}
            </button>

          ))}


        </div>


      </div>



      {/* Notifications */}

      <div className="max-w-7xl mx-auto px-6 mt-8 pb-12">


        <div className="space-y-4">


          {filteredNotifications.length === 0 ? (

            <GlassCard className="p-10 text-center">

              <FaBell
                className="mx-auto text-gray-500"
                size={40}
              />

              <p className="text-gray-400 mt-4">
                No notifications found.
              </p>

            </GlassCard>

          ) : (

            filteredNotifications.map((item) => (

              <GlassCard
                key={item.id}
                className={`p-5 transition ${
                  item.unread
                    ? "border border-blue-400/30"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">


                  {/* Icon */}

                  <div
                    className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${item.color}`}
                  >
                    {item.icon}
                  </div>



                  {/* Content */}

                  <div className="flex-1">


                    <div className="flex items-center gap-2">

                      <h3 className="font-semibold text-lg">
                        {item.title}
                      </h3>


                      {item.unread && (

                        <span className="w-2 h-2 rounded-full bg-blue-400" />

                      )}

                    </div>


                    <p className="text-gray-400 mt-1">
                      {item.message}
                    </p>


                    <p className="text-gray-500 text-sm mt-2">
                      {item.time}
                    </p>


                  </div>



                  {/* Actions */}

                  <div className="flex items-center gap-2">


                    {item.unread && (

                      <button
                        onClick={() => markAsRead(item.id)}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-green-400"
                        title="Mark as read"
                      >
                        <FaCheckCircle />
                      </button>

                    )}


                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="p-3 rounded-xl bg-white/10 hover:bg-red-500/20 text-red-400"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>


                  </div>


                </div>

              </GlassCard>

            ))

          )}


        </div>


      </div>


    </div>

  );
}