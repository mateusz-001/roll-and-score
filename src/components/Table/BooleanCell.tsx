import { Check, X } from 'lucide-react';
import * as React from 'react';

interface Props {
  value: boolean;
}

export const BooleanCell: React.FC<Props> = ({ value }) => {
  return value ? (
    <span className="flex items-center justify-center text-green-500">
      <Check className="h-4 w-4" aria-hidden />
      <span className="sr-only">Yes</span>
    </span>
  ) : (
    <span className="flex items-center justify-center text-red-500">
      <X className="h-4 w-4" aria-hidden />
      <span className="sr-only">No</span>
    </span>
  );
};
