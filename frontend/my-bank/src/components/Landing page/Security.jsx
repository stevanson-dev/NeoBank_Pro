import {
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const securityItems = [
  "PIN protected transactions",
  "Real-time transaction alerts",
  "Secure account access",
  "Clear transaction history",
];

export default function Security() {
  return (
    <section
      id="security"
      className="border-b border-[#243452] bg-[#0B1220] px-6 py-24"
    >

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        <div>

          <span className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            Security first
          </span>

          <h2 className="mt-3 text-4xl font-bold leading-tight">
            Your money deserves
            <span className="block text-[#3B82F6]">
              serious protection.
            </span>
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-[#94A3B8]">
            NeoBank Pro is designed with multiple layers of protection
            to keep your financial activity safe and transparent.
          </p>

          <div className="mt-8 space-y-5">

            {securityItems.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16233A] text-[#60A5FA]">
                  <FaCheckCircle />
                </div>

                <span className="font-medium text-[#CBD5E1]">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>


        <div className="rounded-[28px] border border-[#243452] bg-[#111B2E] p-8">

          <div className="rounded-2xl border border-[#243452] bg-[#0B1220] p-7">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16233A] text-2xl text-[#60A5FA]">
                <FaShieldAlt />
              </div>

              <div>
                <h3 className="font-bold">
                  Protected Account
                </h3>

                <p className="text-sm text-[#94A3B8]">
                  Security status: Active
                </p>
              </div>

            </div>


            <div className="mt-7 space-y-3">

              {[
                ["PIN Protection", "Active"],
                ["Transaction Alerts", "Enabled"],
                ["Account Access", "Secure"],
              ].map(([name, status]) => (

                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-[#243452] bg-[#111B2E] p-4"
                >

                  <span className="text-sm text-[#94A3B8]">
                    {name}
                  </span>

                  <span className="text-sm font-semibold text-[#60A5FA]">
                    {status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}