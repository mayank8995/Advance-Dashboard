function debounce(fn, delay) {
  let timer;

  return function(...args) {
    clearTimeout(timer);
        if(!timer){
            fn.apply(this,...args);
        }
    timer = setTimeout(() => {
      timer = undefined;
    }, delay);
  };
}