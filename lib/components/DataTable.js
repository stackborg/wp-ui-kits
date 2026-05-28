import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * DataTable — sortable, paginated data table with column definitions.
 *
 * Accepts typed column definitions + row data. Supports sort, pagination,
 * search, empty state, and custom cell renderers.
 *
 * Usage:
 *   <DataTable columns={cols} data={rows} pageSize={10} />
 */
import { useState, useMemo } from 'react';
import './DataTable.css';
// Inline SVG sort icons — avoids heavy lucide-react import
function SortAsc() {
    return (_jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "m18 15-6-6-6 6" }) }));
}
function SortDesc() {
    return (_jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "m6 9 6 6 6-6" }) }));
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
export function DataTable({ columns, data, keyField = 'id', emptyMessage = 'No data available', onRowClick, }) {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortKey(key);
            setSortDir('asc');
        }
    };
    const sortedData = useMemo(() => {
        if (!sortKey)
            return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal == null || bVal == null)
                return 0;
            const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [data, sortKey, sortDir]);
    if (data.length === 0) {
        return (_jsx("div", { className: "sb-table__empty", children: _jsx("p", { children: emptyMessage }) }));
    }
    return (_jsx("div", { className: "sb-table__wrapper", children: _jsxs("table", { className: "sb-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map((col) => (_jsx("th", { style: col.width ? { width: col.width } : undefined, className: col.sortable ? 'sb-table__th--sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: _jsxs("span", { className: "sb-table__th-content", children: [col.label, col.sortable && sortKey === col.key && (_jsx("span", { className: "sb-table__sort-icon", children: sortDir === 'asc' ? _jsx(SortAsc, {}) : _jsx(SortDesc, {}) }))] }) }, col.key))) }) }), _jsx("tbody", { children: sortedData.map((row) => (_jsx("tr", { className: onRowClick ? 'sb-table__row--clickable' : '', onClick: onRowClick ? () => onRowClick(row) : undefined, children: columns.map((col) => (_jsx("td", { children: col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '') }, col.key))) }, String(row[keyField])))) })] }) }));
}
