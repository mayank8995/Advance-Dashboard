
export default function Chart() {
  return (
    <>
     <div className="flex-[0] min-w-0">
        <div
          className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow"
        >

          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="ti ti-chart-bar text-blue-500 text-xl" />
            </div>
            <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full font-medium">
              +2.1%
            </span>
          </div>

          {/* Card Body */}
          <div>
            <p className="text-xs text-slate-400 mb-1">Total Employees</p>
            <p className="text-2xl font-bold text-slate-900">15,230</p>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">Updated just now</span>
            <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
              View →
            </button>
          </div>

        </div>
    </div>
    </>
  );
}