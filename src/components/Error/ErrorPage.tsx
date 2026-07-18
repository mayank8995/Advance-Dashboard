import type { QueryClientConfigProps } from '../../types/types';

export const ErrorPage = ({ refetchAll }: QueryClientConfigProps) => {
  return (
    <div className="p-6 sm:p-0  flex flex-col justify-center items-center">
      <div className="w-15 h-15 rounded-lg mb-2">
        <img
          src={'/connection_error_icon.svg'}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-sm font-medium text-rose-400 mb-2 text-center text-balance">
        Something went wrong!
      </p>
      <h1 className="text-2xl font-semibold text-slate-500 dark:text-slate-100 mb-3">
        Couldn't load.
      </h1>
      <p className="text-slate-400 text-sm mb-8  text-center text-balance">
        There was a problem connecting to the server. Check your connection and
        try again.
      </p>

      {refetchAll && (
        <button
          onClick={() => refetchAll?.()}
          className="cursor-pointer py-2.5 px-5 rounded-lg bg-[#534ab7] text-white text-sm font-medium hover:bg-[#463f9e] transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
