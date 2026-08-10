import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";


export default function TwoFactorAuth() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [generatedOtp, setGeneratedOtp] = useState("");

  const [enabled, setEnabled] = useState(false);



  const sendOTP = () => {

    if(phone.length >= 10){

      // Demo OTP
      setGeneratedOtp("123456");

      setStep(2);

    }

  };



  const verifyOTP = () => {

    if(otp === generatedOtp){

      setEnabled(true);
      setStep(3);

    }
    else{

      alert("Invalid OTP");

    }

  };



  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      <div className="max-w-5xl mx-auto px-6 pt-8">


        <div className="flex items-center gap-4">


          <button
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>


          <div>

            <h1 className="text-3xl font-bold">
              Two Factor Authentication
            </h1>

            <p className="text-gray-400">
              Secure your account
            </p>

          </div>


        </div>


      </div>




      <div className="max-w-xl mx-auto px-6 mt-8">


        <GlassCard className="p-8">


          {
            enabled ? (

              <div className="text-center">

                <FaCheckCircle 
                  className="mx-auto text-green-400"
                  size={50}
                />


                <h2 className="text-2xl font-bold mt-5">
                  2FA Enabled
                </h2>


                <p className="text-gray-400 mt-2">
                  Your account is protected now.
                </p>


              </div>


            ) : (


              <>


              {
                step === 1 && (

                  <div>


                    <div className="flex gap-3 items-center mb-6">

                      <FaShieldAlt className="text-cyan-400"/>

                      <h2 className="text-xl font-semibold">
                        Enter Mobile Number
                      </h2>

                    </div>



                    <input
                      type="tel"
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
                    />



                    <button
                      onClick={sendOTP}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
                    >

                      Send OTP

                    </button>


                  </div>

                )
              }





              {
                step === 2 && (

                  <div>


                    <h2 className="text-xl font-semibold">
                      Enter OTP
                    </h2>


                    <p className="text-gray-400 mt-2">
                      Demo OTP: 123456
                    </p>



                    <input
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e)=>setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full mt-5 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
                    />



                    <button
                      onClick={verifyOTP}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
                    >

                      Verify OTP

                    </button>


                  </div>

                )
              }


              </>

            )
          }



        </GlassCard>


      </div>


    </div>

  );
}