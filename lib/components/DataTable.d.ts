/**
 * DataTable — sortable, paginated data table with column definitions.
 *
 * Accepts typed column definitions + row data. Supports sort, pagination,
 * search, empty state, and custom cell renderers.
 *
 * Usage:
 *   <DataTable columns={cols} data={rows} pageSize={10} />
 */
import React from 'react';
import './DataTable.css';
export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => React.ReactNode;
    width?: string;
}
interface DataTableProps<T extends Record<string, unknown>> {
    columns: Column<T>[];
    data: T[];
    /** Unique key field in each row */
    keyField?: string;
    /** Empty state message */
    emptyMessage?: string;
    /** Row click handler */
    onRowClick?: (row: T) => void;
}
/**
 * DataTable — sortable data table with clean styling.
 *
 * Usage:
 *   <DataTable
 *     columns={[
 *       { key: 'name', label: 'Name', sortable: true },
 *       { key: 'status', label: 'Status', render: (v) => <StatusBadge label={v} /> },
 *     ]}
 *     data={items}
 *     keyField="id"
 *   />
 */
export declare function DataTable<T extends Record<string, unknown>>({ columns, data, keyField, emptyMessage, onRowClick, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
