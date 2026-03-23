import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ErrorBoundary } from '@/components/ErrorBoundary';

describe('PageHeader', () => {
  it('renders title and description', () => {
    render(<PageHeader title="Dashboard" description="Overview" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<PageHeader title="Test" actions={<button>Export</button>} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });
});

describe('Card', () => {
  it('renders title and value', () => {
    render(<Card title="Users" value={1234} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Card title="T" value={1} description="+12% this month" />);
    expect(screen.getByText('+12% this month')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card><p>Custom content</p></Card>);
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });
});

describe('StatusBadge', () => {
  it('renders label', () => {
    render(<StatusBadge label="Active" variant="success" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});

describe('LoadingState', () => {
  it('renders spinner with message', () => {
    render(<LoadingState spinner message="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No items" description="Add one to start" />);
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('Add one to start')).toBeInTheDocument();
  });

  it('renders action button', () => {
    render(<EmptyState title="Empty" action={<button>Add</button>} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});

describe('ConfirmDialog', () => {
  it('renders when open', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Delete?"
        message="Cannot undo"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('Delete?')).toBeInTheDocument();
    expect(screen.getByText('Cannot undo')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ConfirmDialog
        open={false}
        title="Delete?"
        message="Cannot undo"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.queryByText('Delete?')).not.toBeInTheDocument();
  });

  it('calls onConfirm and onCancel', () => {
    let confirmed = false;
    let cancelled = false;
    render(
      <ConfirmDialog
        open={true}
        title="Test"
        message="msg"
        onConfirm={() => { confirmed = true; }}
        onCancel={() => { cancelled = true; }}
      />
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(confirmed).toBe(true);

    fireEvent.click(screen.getByText('Cancel'));
    expect(cancelled).toBe(true);
  });
});

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders fallback on error', () => {
    const BrokenComponent = () => {
      throw new Error('Crash');
    };
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<p>Something broke</p>}>
        <BrokenComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something broke')).toBeInTheDocument();
    spy.mockRestore();
  });
});
