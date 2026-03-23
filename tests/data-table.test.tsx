import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DataTable } from '@/components/DataTable';
import type { Column } from '@/components/DataTable';

interface TestRow {
  id: number;
  name: string;
  email: string;
  status: string;
}

const testData: TestRow[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@test.com', status: 'inactive' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com', status: 'active' },
];

const columns: Column<TestRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', render: (v) => <span data-testid="badge">{String(v)}</span> },
];

describe('DataTable', () => {
  it('renders all rows', () => {
    render(<DataTable columns={columns} data={testData} keyField="id" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable columns={columns} data={testData} keyField="id" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('uses custom render function', () => {
    render(<DataTable columns={columns} data={testData} keyField="id" />);
    const badges = screen.getAllByTestId('badge');
    expect(badges).toHaveLength(3);
    expect(badges[0].textContent).toBe('active');
  });

  it('shows empty message when no data', () => {
    render(<DataTable columns={columns} data={[]} keyField="id" emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('sorts by column when clicked', () => {
    render(<DataTable columns={columns} data={testData} keyField="id" />);
    // Click the header cell to sort
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers[0]; // first column = Name
    fireEvent.click(nameHeader);

    // After ascending sort: Alice, Bob, Charlie — already the default order
    const cells = screen.getAllByRole('cell');
    // First cell of first row = Alice's name
    expect(cells[0]).toHaveTextContent('Alice');
  });

  it('reverses sort on second click', () => {
    render(<DataTable columns={columns} data={testData} keyField="id" />);
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers[0];
    fireEvent.click(nameHeader); // asc
    fireEvent.click(nameHeader); // desc

    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Charlie');
  });

  it('calls onRowClick when row clicked', () => {
    const handleClick = vi.fn();
    render(<DataTable columns={columns} data={testData} keyField="id" onRowClick={handleClick} />);

    fireEvent.click(screen.getByText('Alice'));
    expect(handleClick).toHaveBeenCalledWith(testData[0]);
  });

  it('non-sortable column does not sort', () => {
    render(<DataTable columns={columns} data={testData} keyField="id" />);
    const emailHeader = screen.getByText('Email');
    fireEvent.click(emailHeader); // should not change order

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Alice');
  });
});
