import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0B1220] px-6 py-24">

      <div className="relative mx-auto max-w-6xl overflow-hidden `rounded-4xl` border border-[#243452] bg-[#111B2E] px-8 py-16 text-center shadow-2xl shadow-black/30">

        <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">

          <h2 className="text-4xl font-bold">
            Ready to take control of your money?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#94A3B8]">
            Experience a simpler way to manage your everyday banking.
          </p>

          <button
            onClick={() => navigate("/Register")}
            className="mt-8 rounded-xl bg-[#3B82F6] px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-[#2563EB]"
          >
            Get Started
          </button>

        </div>

      </div>

    </section>
  );
}