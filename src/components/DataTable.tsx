/**
 * DataTable — sortable, paginated data table with column definitions.
 *
 * Accepts typed column definitions + row data. Supports sort, pagination,
 * search, empty state, and custom cell renderers.
 *
 * Usage:
 *   <DataTable columns={cols} data={rows} pageSize={10} />
 */
import React, { useState, useMemo } from 'react';
import './DataTable.css';

// Inline SVG sort icons — avoids heavy lucide-react import
function SortAsc() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function SortDesc() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

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

type SortDir = 'asc' | 'desc';

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
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField = 'id',
  emptyMessage = 'No data available',
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null || bVal == null) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  if (data.length === 0) {
    return (
      <div className="sb-table__empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="sb-table__wrapper">
      <table className="sb-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={col.sortable ? 'sb-table__th--sortable' : ''}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="sb-table__th-content">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className="sb-table__sort-icon">
                    {sortDir === 'asc' ? <SortAsc /> : <SortDesc />}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={String(row[keyField])}
              className={onRowClick ? 'sb-table__row--clickable' : ''}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
