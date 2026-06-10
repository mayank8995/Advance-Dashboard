import { useState } from 'react';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  function toggle(enable: boolean){
        const root = document.documentElement;

    if (!enable) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
        setEnabled(enable)
  }

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input 
        type="checkbox" 
        checked={enabled}
        onChange={() => toggle(!enabled)}
        className="sr-only" 
      />
      {/* Track */}
      <div className={`relative w-11 h-6 transition-colors duration-200 ease-in-out rounded-full ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
        {/* Thumb */}
        <div className={`absolute top-[2px] left-[2px] bg-white h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
      {/* <span className="ml-3 text-sm font-medium text-gray-900">
        {enabled ? 'On' : 'Off'}
      </span> */}
    </label>
  );
}