const steps = [
  {
    number: "01",
    title: "Create your account",
    text: "Sign up and create your secure NeoBank Pro account.",
  },
  {
    number: "02",
    title: "Add your money",
    text: "Deposit money using your preferred payment method.",
  },
  {
    number: "03",
    title: "Manage everything",
    text: "Transfer, track, save and manage your finances.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-[#243452] bg-[#0B1220] px-6 py-24"
    >

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <span className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            Simple process
          </span>

          <h2 className="mt-3 text-4xl font-bold">
            Start banking in three steps
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#94A3B8]">
            Getting started with NeoBank Pro is simple.
          </p>

        </div>


        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {steps.map((step) => (

            <div
              key={step.number}
              className="rounded-2xl border border-[#243452] bg-[#111B2E] p-8"
            >

              <div className="text-5xl font-extrabold text-[#243452]">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-[#94A3B8]">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}