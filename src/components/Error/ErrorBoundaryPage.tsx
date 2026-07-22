export const ErrorBoundaryPage = () => {
  return (
    <div className="p-6 sm:p-0  flex flex-col justify-center items-center h-screen max-h-screen">
      <div className="w-37.5 md:w-50 rounded-lg mb-2">
        <img src={'/ui-error-bordered.svg'} className="object-cover" />
      </div>
      <p className="text-sm md:text-xl font-medium text-rose-400 mb-2 text-center text-balance">
        Something went wrong!
      </p>
      {/* <h1 className="text-2xl font-semibold text-slate-500 dark:text-slate-100 mb-3">
        Couldn't load.
      </h1> */}
      <p className="text-slate-400 text-xs sm:text-sm mb-8  text-center text-balance">
        There was a problem in rendering. Please Contact the developer.
      </p>
    </div>
  );
};

export default ErrorBoundaryPage;
