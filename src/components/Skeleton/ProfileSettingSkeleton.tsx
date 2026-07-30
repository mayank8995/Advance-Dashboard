import React from 'react';
import { className, labelclassName } from '../../utils/constants';

const ProfileSettingSkeleton = React.memo(() => {
  return (
    <div className="h-full w-full bg-slate-200 dark:bg-gray-800">
      <div className="p-4  dark:bg-gray-800">
        <div className="animate-pulse mb-6">
          {/* <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100"></h1> */}
          {/* <h2 className="text-sm text-slate-400 mt-1 dark:text-slate-300"></h2> */}
        </div>
        <div className="bg-slate-300 rounded-2xl  shadow-sm border border-slate-100 p-2 flex flex-col gap-3  dark:bg-linear-to-br dark:bg-slate-900 dark:border-none">
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
            <div className="bg-linear-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 h-full dark:bg-linear-to-br dark:from-slate-900 dark:to-green-950/20">
              <div className="animate-pulse flex items-center gap-2 mb-4">
                {/* <div className="w-1 h-5 bg-slate-200 rounded-full" /> */}
                {/* <h2 className="text-base font-bold text-slate-800 dark:text-slate-100"></h2> */}
              </div>

              <div className="flex flex-col items-center justify-center gap-4 ">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                    <div className="aspect-square w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-center">
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <div className="w-1 h-5 bg-slate-500 rounded-full" /> */}
                {/* <h2 className="text-base font-bold text-slate-800 dark:text-slate-100"></h2> */}
              </div>
              <div className="flex flex-col-reverse">
                <div className={`${className} bg-slate-200`} />
                <div className={`${labelclassName} bg-slate-200`}></div>
              </div>
              <div className="flex flex-col-reverse">
                <div className={`${className} bg-slate-200`} />
                <div className={`${labelclassName} bg-slate-200`}></div>
              </div>
              <div className="flex flex-col-reverse">
                <div className={`${className} bg-slate-200`} />
                <div className={`${labelclassName} bg-slate-200`}></div>
              </div>
              <div className="flex flex-col-reverse">
                <div className={`${className} bg-slate-200`} />
                <div className={`${labelclassName} bg-slate-200`}></div>
              </div>
              <div className="flex flex-col-reverse">
                <div className={`${className} bg-slate-200`} />
                <div className={`${labelclassName} bg-slate-200`}></div>
              </div>
            </div>
          </div>
          <hr className="border-t-2  border-gray-300 border-dotted dark:border-gray-600"></hr>
          <div className="p-4">
            <div className="animate-pulse flex items-center gap-2 mb-4">
              {/* <div className="w-1 h-5 bg-slate-500 rounded-full" /> */}
              <h2></h2>
            </div>
            <div className="animate-pulse flex flex-col-reverse">
              <div className={`${className} bg-slate-200`} />
              <div className={`${labelclassName} bg-slate-200`}></div>
            </div>
            <div className="animate-pulse flex flex-col-reverse">
              <div className={`${className} bg-slate-200`} />
              <div className={`${labelclassName} bg-slate-200`}></div>
            </div>
            <div className="animate-pulse flex flex-col-reverse">
              <div className={`${className} bg-slate-200`} />
              <div className={`${labelclassName} bg-slate-200`}></div>
            </div>
            <div className="animate-pulse flex flex-col-reverse">
              <div className={`${className} bg-slate-200`} />
              <div className={`${labelclassName} bg-slate-200`}></div>
            </div>
          </div>
          <hr className="border-t-2  border-gray-300 border-dotted dark:border-gray-600"></hr>
        </div>
      </div>
    </div>
  );
});

export default ProfileSettingSkeleton;
