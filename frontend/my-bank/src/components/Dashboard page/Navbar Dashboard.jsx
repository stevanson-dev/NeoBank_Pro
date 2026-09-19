import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Client } from "@stomp/stompjs";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

function Navbar({ user }) {
  const navigate = useNavigate();

  const fullName = user?.fullName || "User";
  const firstLetter = fullName.charAt(0).toUpperCase();

  const [unreadCount, setUnreadCount] = useState(0);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchUnreadCount = async () => {
    try {
      const token = getToken();

      if (!token) {
        setUnreadCount(0);
        return;
      }

      const response = await axios.get(
        `${API_URL}/notifications/unread-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const count = Number(response.data?.unreadCount) || 0;

      setUnreadCount(count);
    } catch (error) {
      console.error(
        "Failed to load unread notification count:",
        error
      );
    }
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setUnreadCount(0);
      return;
    }

    fetchUnreadCount();

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      heartbeatIncoming: 10000,

      heartbeatOutgoing: 10000,

      debug: () => {},
    });

    client.onConnect = () => {
      client.subscribe(
        "/user/queue/notifications",
        (message) => {
          try {
            JSON.parse(message.body);
            fetchUnreadCount();
          } catch (error) {
            console.error(
              "Failed to process navbar notification:",
              error
            );

            fetchUnreadCount();
          }
        }
      );

      fetchUnreadCount();
    };

    client.onStompError = (frame) => {
      console.error(
        "Navbar WebSocket STOMP error:",
        frame
      );
    };

    client.onWebSocketError = (error) => {
      console.error(
        "Navbar WebSocket connection error:",
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

  const openNotifications = () => {
    navigate("/notifications");
  };

  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400">
          Here's your banking overview.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl bg-[#101827] py-3 pl-11 pr-4 text-white outline-none border border-slate-700"
          />
        </div>

        <button
          onClick={openNotifications}
          className="relative rounded-xl bg-[#101827] p-3 text-white hover:bg-slate-800 transition"
          title="Notifications"
        >
          <MdNotifications size={24} />

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                min-w-5
                h-5
                px-1
                rounded-full
                bg-red-500
                text-white
                text-[10px]
                font-bold
                flex
                items-center
                justify-center
                border-2
                border-[#07162F]
              "
            >
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          )}
        </button>

        <button
  onClick={() => navigate("/profile")}
  className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white hover:bg-blue-700 transition"
  title="Profile"
>
  {firstLetter}
</button>

      </div>
    </div>
  );
}

export default Navbar;