import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaExchangeAlt,
  FaShieldAlt,
  FaGift,
  FaCheckCircle,
  FaTrash,
  FaCog,
} from "react-icons/fa";

import { Client } from "@stomp/stompjs";
import axios from "axios";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";


const API_URL = "http://localhost:8080/api";


const getNotificationType = (type) => {
  switch (type) {
    case "TRANSACTION":
      return "Transactions";

    case "SECURITY":
      return "Security";

    case "OFFER":
      return "Offers";

    case "SYSTEM":
      return "System";

    default:
      return "System";
  }
};


const getNotificationIcon = (type) => {
  switch (type) {
    case "TRANSACTION":
      return <FaExchangeAlt />;

    case "SECURITY":
      return <FaShieldAlt />;

    case "OFFER":
      return <FaGift />;

    case "SYSTEM":
      return <FaCog />;

    default:
      return <FaBell />;
  }
};


const getNotificationColor = (type) => {
  switch (type) {
    case "TRANSACTION":
      return "text-green-400";

    case "SECURITY":
      return "text-red-400";

    case "OFFER":
      return "text-yellow-400";

    case "SYSTEM":
      return "text-cyan-400";

    default:
      return "text-cyan-400";
  }
};


const getRelativeTime = (dateString) => {

  if (!dateString) {
    return "";
  }

  const notificationDate = new Date(dateString);

  if (Number.isNaN(notificationDate.getTime())) {
    return "";
  }

  const now = new Date();

  const difference =
    Math.floor(
      (now.getTime() - notificationDate.getTime()) / 1000
    );

  if (difference < 10) {
    return "Just now";
  }

  if (difference < 60) {
    return `${difference} seconds ago`;
  }

  const minutes = Math.floor(difference / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }

  return notificationDate.toLocaleDateString();
};


export default function Notifications() {

  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);


  /*
   * -------------------------------------------------------
   * Get JWT token
   * -------------------------------------------------------
   */

  const getToken = () => {
    return localStorage.getItem("token");
  };


  /*
   * -------------------------------------------------------
   * Axios headers
   * -------------------------------------------------------
   */

  const getAuthConfig = () => {

    const token = getToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

  };


  /*
   * -------------------------------------------------------
   * Load notifications from database
   * -------------------------------------------------------
   */

  const fetchNotifications = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API_URL}/notifications`,
        getAuthConfig()
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setNotifications(data);

    } catch (error) {

      console.error(
        "Failed to load notifications:",
        error
      );

      setNotifications([]);

    } finally {

      setLoading(false);

    }

  };


  /*
   * -------------------------------------------------------
   * Initial notification loading
   * -------------------------------------------------------
   */

  useEffect(() => {

    fetchNotifications();

  }, []);


  /*
   * -------------------------------------------------------
   * Real-time WebSocket connection
   * -------------------------------------------------------
   */

  useEffect(() => {

    const token = getToken();

    if (!token) {
      return;
    }


    const client = new Client({

      brokerURL: "ws://localhost:8080/ws",

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      heartbeatIncoming: 10000,

      heartbeatOutgoing: 10000,

      debug: () => {
        // Keep console clean.
      },

    });


    client.onConnect = () => {

      console.log(
        "Notification WebSocket connected."
      );


      client.subscribe(
        "/user/queue/notifications",
        (message) => {

          try {

            const incomingNotification =
              JSON.parse(message.body);


            setNotifications((current) => {

              /*
               * Prevent duplicate notifications
               */

              const alreadyExists =
                current.some(
                  (item) =>
                    item.id ===
                    incomingNotification.id
                );


              if (alreadyExists) {
                return current;
              }


              /*
               * New notification goes to top
               */

              return [
                incomingNotification,
                ...current,
              ];

            });

          } catch (error) {

            console.error(
              "Failed to process notification:",
              error
            );

          }

        }
      );

    };


    client.onStompError = (frame) => {

      console.error(
        "Notification WebSocket error:",
        frame
      );

    };


    client.onWebSocketError = (error) => {

      console.error(
        "Notification WebSocket connection error:",
        error
      );

    };


    client.activate();


    return () => {

      if (client.active) {
        client.deactivate();
      }

    };

  }, []);


  /*
   * -------------------------------------------------------
   * Mark single notification as read
   * -------------------------------------------------------
   */

  const markAsRead = async (id) => {

    try {

      await axios.patch(
        `${API_URL}/notifications/${id}/read`,
        {},
        getAuthConfig()
      );


      setNotifications((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      );

    } catch (error) {

      console.error(
        "Failed to mark notification as read:",
        error
      );

    }

  };


  /*
   * -------------------------------------------------------
   * Mark all notifications as read
   * -------------------------------------------------------
   */

  const markAllAsRead = async () => {

    try {

      setActionLoading(true);


      await axios.patch(
        `${API_URL}/notifications/read-all`,
        {},
        getAuthConfig()
      );


      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          read: true,
        }))
      );

    } catch (error) {

      console.error(
        "Failed to mark all notifications as read:",
        error
      );

    } finally {

      setActionLoading(false);

    }

  };


  /*
   * -------------------------------------------------------
   * Delete notification
   * -------------------------------------------------------
   */

  const deleteNotification = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/notifications/${id}`,
        getAuthConfig()
      );


      setNotifications((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Failed to delete notification:",
        error
      );

    }

  };


  /*
   * -------------------------------------------------------
   * Filter notifications
   * -------------------------------------------------------
   */

  const filteredNotifications = useMemo(() => {

    if (filter === "All") {
      return notifications;
    }


    return notifications.filter(
      (item) =>
        getNotificationType(item.type) === filter
    );

  }, [notifications, filter]);


  /*
   * -------------------------------------------------------
   * Unread count
   * -------------------------------------------------------
   */

  const unreadCount = useMemo(() => {

    return notifications.filter(
      (item) => !item.read
    ).length;

  }, [notifications]);


  /*
   * -------------------------------------------------------
   * Notification filters
   * -------------------------------------------------------
   */

  const filters = [
    "All",
    "Transactions",
    "Security",
    "Offers",
    "System",
  ];


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
            disabled={
              actionLoading ||
              unreadCount === 0
            }
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition ${
              actionLoading ||
              unreadCount === 0
                ? "bg-blue-600/40 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            <FaCheckCircle />

            {actionLoading
              ? "Updating..."
              : "Mark all as read"}

          </button>


        </div>

      </div>


      {/* Filters */}

      <div className="max-w-7xl mx-auto px-6 mt-8">

        <div className="flex flex-wrap gap-3">

          {filters.map((item) => (

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


          {/* Loading */}

          {loading ? (

            <GlassCard className="p-10 text-center">

              <FaBell
                className="mx-auto text-blue-400 animate-pulse"
                size={40}
              />

              <p className="text-gray-400 mt-4">
                Loading notifications...
              </p>

            </GlassCard>

          ) : filteredNotifications.length === 0 ? (

            /* Empty */

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

            /* Notification List */

            filteredNotifications.map((item) => {

              const type =
                getNotificationType(item.type);

              const icon =
                getNotificationIcon(item.type);

              const iconColor =
                getNotificationColor(item.type);


              return (

                <GlassCard
                  key={item.id}
                  className={`p-5 transition ${
                    !item.read
                      ? "border border-blue-400/30"
                      : ""
                  }`}
                >

                  <div
                    onClick={() => {
                      if (!item.read) {
                        markAsRead(item.id);
                      }
                    }}
                    className="flex items-center gap-4 cursor-pointer hover:bg-white/5 rounded-xl transition"
                  >


                    {/* Icon */}

                    <div
                      className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${iconColor}`}
                    >
                      {icon}
                    </div>


                    {/* Content */}

                    <div className="flex-1 min-w-0">


                      <div className="flex items-center gap-2">

                        <h3 className="font-semibold text-lg">
                          {item.title}
                        </h3>


                        {!item.read && (

                          <>
                            <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />

                            <span className="text-xs text-blue-400 ml-2">
                              Click to read
                            </span>
                          </>

                        )}

                      </div>


                      <p className="text-gray-400 mt-1">
                        {item.message}
                      </p>


                      <div className="flex items-center gap-3 mt-2">

                        <p className="text-gray-500 text-sm">
                          {getRelativeTime(item.createdAt)}
                        </p>


                        {item.transactionId && (

                          <span className="text-xs text-gray-600">
                            • {item.transactionId}
                          </span>

                        )}

                      </div>


                      {/* Type */}

                      <p className="text-xs text-gray-600 mt-1">
                        {type}
                      </p>

                    </div>


                    {/* Actions */}

                    <div className="flex items-center gap-2">


                      {!item.read && (

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(item.id);
                          }}
                          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-green-400 transition"
                          title="Mark as read"
                        >
                          <FaCheckCircle />
                        </button>

                      )}


                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(item.id);
                        }}
                        className="p-3 rounded-xl bg-white/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>


                    </div>


                  </div>

                </GlassCard>

              );

            })

          )}

        </div>

      </div>

    </div>

  );

}