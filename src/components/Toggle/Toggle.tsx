import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Toggle() {
  const { toggleTheme } = useTheme();
  const [enabled, setEnabled] = useState<boolean>(
    localStorage.getItem('theme') === 'dark'
  );
  function toggle(enable: boolean) {
    const root = document.documentElement;
    if (enable) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    setEnabled(enable);
    toggleTheme();
  }

  return (
    <label
      htmlFor="theme"
      className="inline-flex items-center cursor-pointer select-none"
    >
      <input
        id="theme"
        name="theme"
        type="checkbox"
        checked={enabled}
        onChange={() => toggle(!enabled)}
        className="sr-only"
      />
      {/* Track */}
      <div
        className={`relative w-12 h-6 transition-colors duration-200 ease-in-out rounded-full ${enabled ? 'bg-gray-600' : 'bg-blue-400'}`}
      >
        {/* Thumb */}
        <div
          className={`absolute  ${enabled ? 'top-[2px] left-[6px]' : 'top-[2px] left-[2px]'} bg-white h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
        <div
          className={`absolute ${enabled ? '' : 'left-[5px]'} transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-0' : 'translate-x-5'}`}
        >
          {enabled ? (
            <Moon width={20} className="text-slate-100" fill="white" />
          ) : (
            <Sun width={20} className="text-amber-300" fill="yellow" />
          )}
        </div>
      </div>
    </label>
  );
}
