export default function Pagination() {

  return (

    <div className="flex justify-between items-center mt-8">


      {/* Previous */}
      <button
        className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
      >
        Previous
      </button>



      {/* Pages */}
      <div className="flex gap-3">


        <button className="w-10 h-10 rounded-xl bg-blue-600 text-white">
          1
        </button>


        <button className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20">
          2
        </button>


        <button className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20">
          3
        </button>


      </div>



      {/* Next */}
      <button
        className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
      >
        Next
      </button>


    </div>

  );
}