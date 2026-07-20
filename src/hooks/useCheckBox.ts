import { useState, type ChangeEvent } from 'react';
import type { Employee } from '../types/types';

export function useCheckBox(list: Employee[]) {
  const [selectedRow, setSelectedRow] = useState(new Set());
  const handleOnChange = function (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) {
    if (!event.target?.id) return;
    const id = event.target.id;
    if (event.target.id === 'selectAll') {
      if (!event.target.checked) {
        setSelectedRow(new Set());
      } else {
        console.log('llist>>>>', list);
        const Ids = list.map((item: Employee) => {
          if (!item) return;
          return String(item.id);
        });
        setSelectedRow(new Set(['selectAll', ...Ids]));
      }
    } else {
      setSelectedRow((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(String(id));
        }
        return next;
      });
    }
  };
  return {
    selectedRow,
    handleOnChange,
    setSelectedRow,
  };
}
