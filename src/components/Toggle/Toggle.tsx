import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

    useEffect(() => {
      if(localStorage.getItem("theme") === 'dark'){
        toggle(true)
      }
    },[])

  function toggle(enable: boolean){
        const root = document.documentElement;
console.log("enable>>>",enable)
    if (enable) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme","dark")
    } else {
        root.removeAttribute('data-theme');
        localStorage.removeItem("theme")
    }
        setEnabled(enable)
        // Use CustomEvent to include details since Event has no newValue property
        const event = new CustomEvent('storage', { detail: { newValue: enable } });
        window.dispatchEvent(event);
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
      <div className={`relative w-12 h-6 transition-colors duration-200 ease-in-out rounded-full ${enabled ? 'bg-gray-600' : 'bg-blue-400'}`}>
        {/* Thumb */}
        <div className={`absolute  ${enabled ? 'top-[2px] left-[6px]' : 'top-[2px] left-[2px]'} bg-white h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        <div className={`absolute ${enabled ? '' : 'left-[5px]'} transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-0' : 'translate-x-5'}`}>
        {enabled ? <Moon  width={20} className="text-slate-100" fill='white'/> : <Sun width={20} className="text-amber-300" fill='yellow'/>}
      </div>
      </div>
    </label>
  );
}