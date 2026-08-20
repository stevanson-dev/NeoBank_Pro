import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function Profile() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get logged-in user's profile
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get("/auth/me");

        setProfile({
          name: response.data.fullName,
          email: response.data.email,
          phone: response.data.mobile,
          address: "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);

        setError("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // Save profile
  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await api.put("/auth/profile", {
        fullName: profile.name,
        email: profile.email,
        mobile: profile.phone,
      });

      setProfile({
        ...profile,
        name: response.data.fullName,
        email: response.data.email,
        phone: response.data.mobile,
      });

      setSuccess("Profile updated successfully");

      setEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}

      <div className="max-w-7xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your personal information
            </p>

          </div>

        </div>

      </div>

      {/* Profile */}

      <div className="max-w-7xl mx-auto px-6 mt-8 pb-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Card */}

          <GlassCard className="p-8 text-center">

            <div className="w-28 h-28 mx-auto rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-4xl font-bold">

              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "S"}

            </div>

            <h2 className="text-2xl font-bold mt-5">
              {loading ? "Loading..." : profile.name}
            </h2>

            <p className="text-gray-400 mt-1">
              NeoBank Pro Customer
            </p>

            <div className="flex items-center justify-center gap-2 text-green-400 mt-4">

              <FaCheckCircle />

              Verified Account

            </div>

            <button
              onClick={() => {
                setEditing(!editing);
                setError("");
                setSuccess("");
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition"
            >

              <FaEdit />

              {editing ? "Cancel Editing" : "Edit Profile"}

            </button>

          </GlassCard>

          {/* Personal Information */}

          <div className="lg:col-span-2">

            <GlassCard className="p-8">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Personal Information
                </h2>

              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}

                <div>

                  <label className="text-gray-400 text-sm">
                    Full Name
                  </label>

                  <div className="relative mt-2">

                    <FaUser className="absolute left-4 top-4 text-gray-400" />

                    <input
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!editing || loading}
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none disabled:opacity-70"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label className="text-gray-400 text-sm">
                    Email Address
                  </label>

                  <div className="relative mt-2">

                    <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                    <input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!editing || loading}
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none disabled:opacity-70"
                    />

                  </div>

                </div>

                {/* Phone */}

                <div>

                  <label className="text-gray-400 text-sm">
                    Phone Number
                  </label>

                  <div className="relative mt-2">

                    <FaPhone className="absolute left-4 top-4 text-gray-400" />

                    <input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!editing || loading}
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none disabled:opacity-70"
                    />

                  </div>

                </div>

                {/* Address */}

                <div>

                  <label className="text-gray-400 text-sm">
                    Address
                  </label>

                  <div className="relative mt-2">

                    <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

                    <input
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none disabled:opacity-70"
                    />

                  </div>

                </div>

              </div>

              {/* Error */}

              {error && (
                <p className="mt-6 text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Success */}

              {success && (
                <p className="mt-6 text-sm text-green-400">
                  {success}
                </p>
              )}

              {/* Save */}

              {editing && (
                <button
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}

            </GlassCard>

            {/* Security */}

            <GlassCard className="p-8 mt-8">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">

                    <FaLock />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      Password & Security
                    </h2>

                    <p className="text-gray-400 mt-1">
                      Keep your account secure
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => navigate("/settings")}
                  className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition"
                >
                  Manage
                </button>

              </div>

            </GlassCard>

          </div>

        </div>

      </div>

    </div>
  );
}