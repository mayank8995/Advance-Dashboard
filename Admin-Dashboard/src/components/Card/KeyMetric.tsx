// Card.tsx
export default function KeyMetric() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">

      {/* Card */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow"
        >

          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="ti ti-chart-bar text-blue-500 text-xl" />
            </div>
            {/* <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full font-medium">
              +2.1%
            </span> */}
             {/* Card Body */}
          <div>
            <p className="text-xs text-slate-400 mb-1">Total Employees</p>
            <p className="text-2xl font-bold text-slate-900">15,230</p>
          </div>
          </div>

         

          {/* Card Footer */}
         <></>

        </div>
      ))}

    </div>
  );
}