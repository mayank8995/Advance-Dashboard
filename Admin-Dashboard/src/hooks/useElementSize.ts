import { useEffect, useRef, useState } from 'react';

// Define the shape of the data returned by the hook
interface ElementDimensions {
  width: number;
  height: number;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl';
}

// Configurable element-level breakpoints (in pixels)
const BREAKPOINTS = {
  md: 480,
  lg: 768,
  xl: 1024,
};

export function useElementSize<T extends HTMLElement>() {
  // Use a generic ref to match any HTML element type
  const elementRef = useRef<T | null>(null);
  
  const [size, setSize] = useState<ElementDimensions>({
    width: 0,
    height: 0,
    breakpoint: 'sm',
  });

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      
      const entry = entries[0];
      let width = 0;
      let height = 0;

      // Best practice: Use borderBoxSize if supported by browser for exact accuracy
      if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
        width = entry.borderBoxSize[0].inlineSize;
        height = entry.borderBoxSize[0].blockSize;
      } else {
        // Fallback for older legacy browsers
        width = entry.contentRect.width;
        height = entry.contentRect.height;
      }

      // Compute element-specific breakpoints
      let currentBreakpoint: ElementDimensions['breakpoint'] = 'sm';
      if (width >= BREAKPOINTS.xl) {
        currentBreakpoint = 'xl';
      } else if (width >= BREAKPOINTS.lg) {
        currentBreakpoint = 'lg';
      } else if (width >= BREAKPOINTS.md) {
        currentBreakpoint = 'md';
      }

      setSize({
        width: Math.round(width),
        height: Math.round(height),
        breakpoint: currentBreakpoint,
      });
    });

    // Start watching the target element
    resizeObserver.observe(targetElement);

    // Clean up observer mapping on unmount to prevent memory leaks
    return () => {
      if (targetElement) {
        resizeObserver.unobserve(targetElement);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Return the ref hook attachment and computed states
  return [elementRef, size] as const;
}
