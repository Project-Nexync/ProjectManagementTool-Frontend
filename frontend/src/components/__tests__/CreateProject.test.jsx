import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateProject from '../CreateProject';
import api from '../../API';

vi.mock('../../API');

describe('CreateProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('does not render when open is false', () => {
    const { container } = render(<CreateProject open={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test('submits project payload and calls onClose', async () => {
    const onClose = vi.fn();
    api.post.mockResolvedValueOnce({ data: { id: 1 } });

    render(<CreateProject open={true} onClose={onClose} />);

    const nameInput = screen.getByPlaceholderText(/Project name/i);
    const descInput = screen.getByPlaceholderText(/Project description/i);
    const submitBtn = screen.getByRole('button', { name: /Create Project/i });

    fireEvent.change(nameInput, { target: { value: 'New Project' } });
    fireEvent.change(descInput, { target: { value: 'Desc' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
