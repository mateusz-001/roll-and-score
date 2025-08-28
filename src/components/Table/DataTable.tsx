import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';

import { cn } from '@/utils';

export type Props<TData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  data: TData[];
  'aria-label'?: string;
  className?: string;
};

export const DataTable = <TData,>({ columns, data, className, ...rest }: Props<TData>) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-sm shadow-card border-2 border-primary md:rounded-2xl',
        className,
      )}
    >
      <table className="w-full min-w-[720px]" {...rest}>
        <thead className="bg-primary">
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className={cn(i % 2 === 0 ? 'bg-white' : 'bg-dark-gray/10')}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-sm text-dark text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
