import React, { useState } from 'react';
import type { Employee } from '../../types/types';
import { extract } from '../../services/utils.service';
import { FIELD_LABELS } from '../../utils/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

type AccordionSection = {
  id: string;
  label?: string;
  showColumns?: boolean;
  initialState: boolean;
  fieldType: string;
  fields: string[];
  render?: () => React.ReactNode;
};
interface Accordian {
  accordian: AccordionSection;
  content: Employee;
}
export default function Accordion({ accordian, content }: Accordian) {
  const [openAccordian, setOpenAccordian] = useState(
    () => accordian.initialState
  );
  function handleAccordian() {
    setOpenAccordian((prev) => !prev);
  }

  function rendeFields() {
    try {
      return (
        <>
          {accordian?.fields?.map((field) => {
            let value = null;
            let rowLabel = null;
            if (
              field.indexOf('$') !== -1 &&
              accordian.fieldType === 'array-objects'
            ) {
              const title = field?.split('$')?.[0];
              if (title.length) {
                value = extract(content, field.split('$'));
                rowLabel =
                  FIELD_LABELS[field.split('$')?.[0] as keyof Employee];
                return (
                  <React.Fragment key={`item-${field}`}>
                    <div className="flex justify-between">
                      <span className="text-xs xl:text-sm font-medium text-gray-500">
                        {rowLabel}
                      </span>
                      {value?.map((val) => (
                        <span
                          key={val}
                          className="text-xs xl:text-sm  font-semibold text-gray-900 dark:text-white"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </React.Fragment>
                );
              }
            }
            rowLabel = FIELD_LABELS[field as keyof Employee];
            value = content?.[field as keyof Employee];
            return (
              <React.Fragment key={`item-${field}`}>
                <div className="flex justify-between">
                  {accordian?.showColumns && (
                    <span className="text-xs xl:text-sm font-medium text-gray-500 leading-normal">
                      {rowLabel}
                    </span>
                  )}
                  {Array.isArray(value) && accordian?.fieldType === 'array' ? (
                    value?.map((val) => (
                      <span
                        key={String(val)}
                        className="text-xs xl:text-sm font-medium text-gray-900 leading-normal dark:text-white"
                      >
                        {String(val)}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs xl:text-sm font-medium text-gray-900 leading-normal dark:text-white">
                      {String(value)}
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
            return null;
          })}
        </>
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div
      className={
        'mt-2 rounded-2xl bg-linear-to-br from-white to-indigo-50/40 border border-slate-100 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-slate-900/50 p-2 flex flex-col gap-3 shadow-sm'
      }
      id={accordian?.id}
      aria-controls={`accordian-panel-${accordian?.id}`}
      onClick={handleAccordian}
    >
      <button
        type="button"
        className="flex justify-between font-semibold items-center cursor-pointer"
      >
        <span className="dark:text-white text-sm">{accordian?.label}</span>{' '}
        <span aria-hidden={!openAccordian} aria-expanded={openAccordian}>
          {!openAccordian ? (
            <ChevronDown className="dark:text-white" size={18} />
          ) : (
            <ChevronUp className="dark:text-white" size={18} />
          )}
        </span>
      </button>
      {openAccordian && (
        <div
          className=""
          id={`accordian-panel-${accordian?.id}`}
          aria-labelledby={accordian?.id}
        >
          {rendeFields()}
        </div>
      )}
    </div>
  );
}
