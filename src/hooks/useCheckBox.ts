import { useState, type ChangeEvent } from 'react';
import type { ListType } from '../types/types';

export function useCheckBox(list: ListType[]) {
  const [selectedRow, setSelectedRow] = useState(() => new Set());
  const handleOnChange = function (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) {
    if (!event.target?.id) {
      return;
    }
    const id = event.target.id;
    if (event.target.id === 'selectAll') {
      if (!event.target.checked) {
        setSelectedRow(new Set());
      } else {
        const Ids = list.map((item: ListType) => {
          if (!item) {
            return;
          }
          return String(item?.id);
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
