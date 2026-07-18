import { Badge } from '../UtilComponents/Badge';
import NameBadge from '../UtilComponents/NameBadge';
import { Rating } from '../UtilComponents/Rating';
import ReviewReasonBadge from '../UtilComponents/ReviewReasonBadge';
import StatusBadge from '../UtilComponents/StatusBadge';

export const columns_employees = [
  {
    key: 'id',
    header: 'id',
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string) => <NameBadge value={value} />,
  },
  {
    key: 'designation',
    header: 'Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'yearsOfExperience',
    header: 'Years of Experience',
  },
  {
    key: 'location',
    header: 'Location',
  },
  {
    key: 'workMode',
    header: 'Work Mode',
    render: (value: string) => <Badge value={value} />,
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (value: string) => <Rating value={value} />,
  },
];

export const columns_top_performers = [
  {
    key: 'id',
    header: 'id',
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string) => <NameBadge value={value} />,
  },
  {
    key: 'designation',
    header: 'Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (value: string) => <Rating value={value} />,
  },
];
export const columns_top_projects = [
  {
    key: 'name',
    header: 'Name',
    render: (value: string) => <NameBadge value={value} />,
  },
  {
    key: 'projectName',
    header: 'Project Name',
  },
  {
    key: 'riskStatus',
    header: 'Risk Status',
    render: (value: string) => <StatusBadge value={value} />,
  },
  {
    key: 'status',
    header: 'Status',
    render: (value: string) => <StatusBadge value={value} />,
  },
];
export const columns_promotedThisYear = [
  {
    key: 'id',
    header: 'id',
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string) => <NameBadge value={value} />,
  },
  {
    key: 'currentDesignation',
    header: 'Current Designation',
  },
  {
    key: 'previousDesignation',
    header: 'Previous Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'promotedOn',
    header: 'Promoted On',
  },
];

export const columns_requiringReview = [
  {
    key: 'id',
    header: 'id',
  },
  {
    key: 'name',
    header: 'Name',
    render: (value: string) => <NameBadge value={value} />,
  },
  {
    key: 'designation',
    header: 'Designation',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'reviewReason',
    header: 'Review Reason',
    render: (value: string) => <ReviewReasonBadge value={value} />,
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (value: string) => <Rating value={value} />,
  },
];
