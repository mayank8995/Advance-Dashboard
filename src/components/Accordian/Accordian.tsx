import React, { useState } from 'react';
import type { ListType, TableQueryParams } from '../../types/types';
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
  tableQueryParams: TableQueryParams;
  content: ListType;
}
export default function Accordion({
  accordian,
  tableQueryParams,
  content,
}: Accordian) {
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
            if (
              field.indexOf('$') !== -1 &&
              accordian.fieldType === 'array-objects'
            ) {
              const title = field?.split('$')?.[0];
              if (title.length) {
                const value = extract(content, field.split('$'));
                const rowLabel =
                  FIELD_LABELS?.[tableQueryParams?.tableType]?.[
                    field.split('$')?.[0]
                  ];
                return (
                  <React.Fragment key={`item-${field}`}>
                    <div className="flex justify-between text-sm">
                      <span className="text-xs text-gray-500">{rowLabel}</span>
                      {value?.map((val) => (
                        <span
                          key={val}
                          className="text-xs font-semibold text-gray-900"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </React.Fragment>
                );
              }
            }
            const rowLabel =
              FIELD_LABELS?.[tableQueryParams?.tableType]?.[field];
            const value = content?.[field];
            return (
              <React.Fragment key={`item-${field}`}>
                <div className="flex justify-between text-sm">
                  {accordian?.showColumns && (
                    <span className="text-xs text-gray-500">{rowLabel}</span>
                  )}
                  {accordian?.fieldType === 'array' ? (
                    value?.map((val) => (
                      <span
                        key={val}
                        className="text-xs font-semibold text-gray-900"
                      >
                        {val}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-semibold text-gray-900">
                      {value}
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
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
        'mt-2 rounded-xl border border-gray-200 bg-gray-50/50 p-5 flex flex-col gap-3'
      }
      id={accordian?.id}
      aria-controls={`accordian-panel-${accordian?.id}`}
      onClick={handleAccordian}
    >
      <button
        type="button"
        className="flex justify-between text-sm font-semibold"
      >
        <span>{accordian?.label}</span>{' '}
        <span aria-hidden={!openAccordian} aria-expanded={openAccordian}>
          {!openAccordian ? <ChevronDown /> : <ChevronUp />}
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
