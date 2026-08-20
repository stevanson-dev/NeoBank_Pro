import { useState } from "react";
import {
  FaBell,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

export default function Notifications() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Security",
      title: "Multiple Failed Login Attempts",
      message:
        "Multiple failed login attempts were detected from a user account.",
      time: "10 minutes ago",
      status: "Unread",
    },
    {
      id: 2,
      type: "Transaction",
      title: "Large Transaction Detected",
      message:
        "A high-value transaction requires admin attention.",
      time: "25 minutes ago",
      status: "Unread",
    },
    {
      id: 3,
      type: "Withdrawal",
      title: "Pending Withdrawal",
      message:
        "A withdrawal request is waiting for processing.",
      time: "1 hour ago",
      status: "Read",
    },
    {
      id: 4,
      type: "System",
      title: "System Backup Completed",
      message:
        "The scheduled system backup has completed successfully.",
      time: "3 hours ago",
      status: "Read",
    },
    {
      id: 5,
      type: "User",
      title: "New User Registration",
      message:
        "A new user has successfully registered with NeoBank Pro.",
      time: "5 hours ago",
      status: "Read",
    },
    {
      id: 6,
      type: "Security",
      title: "Security Alert",
      message:
        "Unusual account activity was detected and flagged for review.",
      time: "Yesterday",
      status: "Unread",
    },
  ]);

  const getTypeStyle = (type) => {
    switch (type) {
      case "Security":
        return {
          icon: <FaExclamationTriangle />,
          style: "bg-red-500/10 text-red-400",
        };

      case "Transaction":
        return {
          icon: <FaInfoCircle />,
          style: "bg-blue-500/10 text-blue-400",
        };

      case "Withdrawal":
        return {
          icon: <FaExclamationTriangle />,
          style: "bg-yellow-500/10 text-yellow-400",
        };

      case "System":
        return {
          icon: <FaCheckCircle />,
          style: "bg-green-500/10 text-green-400",
        };

      default:
        return {
          icon: <FaBell />,
          style: "bg-purple-500/10 text-purple-400",
        };
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      notification.title.toLowerCase().includes(searchText) ||
      notification.message.toLowerCase().includes(searchText) ||
      notification.type.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || notification.status === filter;

    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, status: "Read" }
          : notification
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        status: "Read",
      }))
    );
  };

  const unreadCount = notifications.filter(
    (notification) => notification.status === "Unread"
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">

        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro Admin
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-3xl md:text-4xl font-bold">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
                  {unreadCount} Unread
                </span>
              )}

            </div>

            <p className="text-slate-400 mt-2">
              Monitor important alerts and system activities.
            </p>

          </div>

          <button
            onClick={markAllAsRead}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition shadow-lg shadow-blue-600/20"
          >
            Mark All as Read
          </button>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Total Notifications
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {notifications.length}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <FaBell className="text-blue-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Unread */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Unread
              </p>

              <h2 className="text-2xl font-bold mt-2 text-red-400">
                {unreadCount}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <FaExclamationTriangle className="text-red-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Security */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Security Alerts
              </p>

              <h2 className="text-2xl font-bold mt-2">
                2
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <FaExclamationTriangle className="text-yellow-400 text-xl" />
            </div>

          </div>

        </div>

        {/* System */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                System Alerts
              </p>

              <h2 className="text-2xl font-bold mt-2">
                1
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FaCheckCircle className="text-green-400 text-xl" />
            </div>

          </div>

        </div>

      </div>

      {/* Notification Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {/* Search & Filter */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>

              <h2 className="text-xl font-semibold">
                Recent Notifications
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Review system and user activity alerts.
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Search */}
              <div className="relative w-full sm:w-72">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              >
                <option value="All">All</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>

            </div>

          </div>

        </div>

        {/* Notifications */}
        <div>

          {filteredNotifications.map((notification) => {

            const typeStyle = getTypeStyle(
              notification.type
            );

            const isUnread =
              notification.status === "Unread";

            return (
              <div
                key={notification.id}
                className={`p-5 border-b border-slate-800/70 transition ${
                  isUnread
                    ? "bg-blue-500/3"
                    : "hover:bg-slate-800/30"
                }`}
              >

                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${typeStyle.style}`}
                  >
                    {typeStyle.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                      <div className="flex items-center gap-2">

                        <h3 className="font-semibold">
                          {notification.title}
                        </h3>

                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                        )}

                      </div>

                      <span className="text-xs text-slate-500">
                        {notification.time}
                      </span>

                    </div>

                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyle.style}`}
                      >
                        {notification.type}
                      </span>

                      {isUnread && (
                        <button
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="text-xs text-blue-400 hover:text-blue-300 transition"
                        >
                          Mark as read
                        </button>
                      )}

                    </div>

                  </div>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      removeNotification(notification.id)
                    }
                    className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Remove notification"
                  >
                    <FaTimes />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center">

            <FaBell className="mx-auto text-4xl text-slate-700 mb-4" />

            <h3 className="text-lg font-medium text-slate-400">
              No notifications found
            </h3>

            <p className="text-sm text-slate-600 mt-2">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}