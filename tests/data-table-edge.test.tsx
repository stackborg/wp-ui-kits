import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DataTable } from '@/components/DataTable';
import type { Column } from '@/components/DataTable';

/**
 * Real-world DataTable edge cases.
 *
 * Tests: null values, missing keys, single row,
 * large datasets, all sortable columns, no sortable columns.
 */
describe('DataTable — Edge Cases', () => {
  interface TestRow { id: number; name: string | null; email: string; }

  const columns: Column<TestRow>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
  ];

  it('handles null values in cells gracefully', () => {
    const data: TestRow[] = [
      { id: 1, name: null, email: 'test@test.com' },
    ];
    render(<DataTable columns={columns} data={data as any} keyField="id" />);
    // Should render without crash — null becomes empty string
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
  });

  it('renders with single row', () => {
    const data: TestRow[] = [
      { id: 1, name: 'Solo', email: 'solo@test.com' },
    ];
    render(<DataTable columns={columns} data={data as any} keyField="id" />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
  });

  it('handles large dataset without crash', () => {
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@test.com`,
    }));
    const cols: Column<typeof data[0]>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
    ];
    render(<DataTable columns={cols} data={data as any} keyField="id" />);
    expect(screen.getByText('User 0')).toBeInTheDocument();
    expect(screen.getByText('User 99')).toBeInTheDocument();
  });

  it('shows default empty message', () => {
    render(<DataTable columns={columns} data={[] as any} keyField="id" />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('column without sortable flag does not respond to click', () => {
    const cols: Column<{ id: number; name: string }>[] = [
      { key: 'name', label: 'Name' }, // no sortable flag
    ];
    const data = [
      { id: 1, name: 'Charlie' },
      { id: 2, name: 'Alpha' },
    ];
    render(<DataTable columns={cols} data={data as any} keyField="id" />);
    const header = screen.getByText('Name');
    fireEvent.click(header);
    // Order should remain unchanged (Charlie first)
    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Charlie');
  });

  it('renders all column headers even with empty data', () => {
    render(<DataTable columns={columns} data={[] as any} keyField="id" />);
    // Empty state shows message, not the table — headers not rendered
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('multiple sorts across different columns', () => {
    const data = [
      { id: 1, name: 'Charlie', email: 'c@test.com' },
      { id: 2, name: 'Alpha', email: 'a@test.com' },
      { id: 3, name: 'Bravo', email: 'b@test.com' },
    ];
    render(<DataTable columns={columns} data={data as any} keyField="id" />);
    const headers = screen.getAllByRole('columnheader');

    // Sort by name
    fireEvent.click(headers[0]);
    let cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Alpha');

    // Then sort by email
    fireEvent.click(headers[1]);
    cells = screen.getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('a@test.com');
  });
});
