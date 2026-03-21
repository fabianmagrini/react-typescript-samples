import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PageSkeleton from '../PageSkeleton';

describe('PageSkeleton', () => {
  it('renders without crashing', () => {
    render(<PageSkeleton />);
  });

  it('has the animate-pulse class for the skeleton animation', () => {
    const { container } = render(<PageSkeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders exactly 3 card skeleton blocks', () => {
    const { container } = render(<PageSkeleton />);
    // The 3 card skeletons are siblings inside the grid div
    const grid = container.querySelector('.grid');
    expect(grid?.children).toHaveLength(3);
  });

  it('renders a heading skeleton', () => {
    const { container } = render(<PageSkeleton />);
    // First child inside the outer div is the heading placeholder
    const heading = container.querySelector('.h-8');
    expect(heading).toBeInTheDocument();
  });

  it('renders a content area skeleton', () => {
    const { container } = render(<PageSkeleton />);
    const content = container.querySelector('.h-64');
    expect(content).toBeInTheDocument();
  });
});
