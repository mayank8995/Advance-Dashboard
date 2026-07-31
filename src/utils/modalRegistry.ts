import FilterModal from '../components/FilterComponent/FilterModal';
import EmployeeDetailModal from '../components/Overlay/DetailModal';
import SortModalComponent from '../components/SortModal/SortModalComponent';

export const MODAL_COMPONENTS = {
  FILTER: FilterModal,
  SORT_MODAL: SortModalComponent,
  EMP_DETAIL_MODAL: EmployeeDetailModal,
} as const;

export type ModalType = keyof typeof MODAL_COMPONENTS;
