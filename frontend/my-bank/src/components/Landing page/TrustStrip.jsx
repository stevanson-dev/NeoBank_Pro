import {
  FaShieldAlt,
  FaBolt,
  FaLock,
  FaBell,
} from "react-icons/fa";

const trustItems = [
  [FaShieldAlt, "Secure Transactions"],
  [FaBolt, "Fast Transfers"],
  [FaLock, "PIN Protected"],
  [FaBell, "Real-Time Alerts"],
];

export default function TrustStrip() {
  return (
    <section className="border-b border-[#243452] bg-[#0B1220]">

      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

        {trustItems.map(([Icon, title], index) => (

          <div
            key={index}
            className="flex items-center justify-center gap-3 border-[#243452] px-5 py-7 md:border-r last:border-r-0"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111B2E] text-[#60A5FA]">
              <Icon />
            </div>

            <span className="text-sm font-semibold text-[#CBD5E1]">
              {title}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}