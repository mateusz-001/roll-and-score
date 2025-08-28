import type { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { BooleanCell } from './BooleanCell';
import { DataTable } from './DataTable';

interface UserRow {
  name: string;
  email: string;
  role: string;
  active: boolean;
  verified: boolean;
}

const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'active',
    header: 'Active',
    enableSorting: false,
    cell: ({ getValue }) => <BooleanCell value={getValue<boolean>()} />,
  },
  {
    accessorKey: 'verified',
    header: 'Verified',
    enableSorting: false,
    cell: ({ getValue }) => <BooleanCell value={getValue<boolean>()} />,
  },
];

const data: UserRow[] = [
  { name: 'Alice Johnson', email: 'alice@acme.com', role: 'Editor', active: true, verified: true },
  { name: 'Bob Smith', email: 'bob@acme.com', role: 'Viewer', active: false, verified: true },
  { name: 'Charlie Ray', email: 'charlie@acme.com', role: 'Admin', active: true, verified: false },
];

export const UsersTableDemo: React.FC = () => {
  return (
    <DataTable<UserRow> columns={columns} data={data} aria-label="Users list" className="mt-6" />
  );
};
