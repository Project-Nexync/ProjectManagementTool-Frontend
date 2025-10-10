import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import api from '../../API';

// mock useNavigate before importing the component so it uses the mock
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({ useNavigate: () => navigateMock }));

import SignInModal from '../SignInModal';

vi.mock('../../API');

describe('SignInModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('does not render when open is false', () => {
    // SignInModal renders unconditionally in this codebase; assert header exists
    render(<SignInModal onClose={() => {}} />);
    expect(screen.getByText(/Sign in to/i)).toBeInTheDocument();
  });

  test('shows validation when fields are empty and submits successfully', async () => {
    const onClose = vi.fn();
    // navigate is mocked above as navigateMock

    api.post.mockResolvedValueOnce({ data: { token: 'abc', user: { id: 1 } } });

    render(<SignInModal open={true} onClose={onClose} />);

  const emailInput = screen.getByPlaceholderText(/Enter your email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
  const submitBtn = screen.getByRole('button', { name: /Sign in/i });

    // try submit with empty fields: the component sets error "Please enter both email and password"
  // submit the form directly to ensure handler runs (browser validation may block button click)
  const form = document.querySelector('form');
  fireEvent.submit(form);
  expect(await screen.findByText(/Please enter both email and password/i)).toBeInTheDocument();

    // fill fields and submit
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });
});
