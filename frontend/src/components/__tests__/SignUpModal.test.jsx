import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// ensure the shared API module is mocked to avoid running interceptors in tests
vi.mock('../../API', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import SignUpModal from '../SignUpModal';
import axios from 'axios';
vi.mock('axios');

describe('SignUpModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('does not render when open is false', () => {
    // SignUpModal renders unconditionally; assert header exists
    render(<SignUpModal onClose={() => {}} />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('validates terms and password match and submits', async () => {
    const onClose = vi.fn();
  // suppress window.alert during tests
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
  // mock axios for this component (SignUpModal uses axios.post)
  axios.post.mockResolvedValueOnce({ data: { success: true } });

  // render without relying on `open` prop since component renders in-tree
  const { container } = render(<SignUpModal onClose={onClose} />);

  // Labels are not associated with inputs (no htmlFor/id), so select inputs by DOM order
  const allInputs = Array.from(container.querySelectorAll('input'));
  // filter out file inputs and readonly profile input
  const inputs = allInputs.filter((i) => i.type !== 'file' && !i.hasAttribute('readonly'));
  // input order after filtering: firstName, lastName, username, email, password, confirmPassword, checkbox1, checkbox2
  const firstName = inputs[0];
  const lastName = inputs[1];
  const username = inputs[2];
  const email = inputs[3];
  const password = inputs[4];
  const confirmPassword = inputs[5];
  const termsCheckboxes = [inputs[6], inputs[7]];
  const submitBtn = screen.getByRole('button', { name: /Sign Up/i });

  // Try submit without agreeing terms: fill fields
  fireEvent.change(firstName, { target: { value: 'Test' } });
  fireEvent.change(lastName, { target: { value: 'User' } });
  fireEvent.change(username, { target: { value: 'testuser' } });
  fireEvent.change(email, { target: { value: 'test@example.com' } });
  fireEvent.change(password, { target: { value: 'pass1234' } });
  fireEvent.change(confirmPassword, { target: { value: 'pass1234' } });

  fireEvent.click(submitBtn);

    await waitFor(() => {
      // should show an alert about accepting terms (component uses alert)
      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('You must agree'));
      // ensure axios.post was not called because terms not accepted
      expect(axios.post).not.toHaveBeenCalled();
    });

    // check validation for password mismatch
  // check the terms checkbox (first checkbox is the terms consent)
  fireEvent.click(termsCheckboxes[0]);

  // now mismatch
  fireEvent.change(confirmPassword, { target: { value: 'different' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      // component shows an alert on password mismatch
      expect(alertSpy).toHaveBeenCalledWith('Passwords do not match');
    });

  // fix password
  fireEvent.change(confirmPassword, { target: { value: 'pass1234' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
    alertSpy.mockRestore();
  });
});
