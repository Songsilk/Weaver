import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Register from '../register.jsx';

describe('Register (unit)', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('renderiza fields relevantes y submit', () => {
    render(<Register />);
    // comprobaciones flexibles
    expect(screen.getByRole('button', { name: /sign up|register|create account/i })).toBeTruthy();
  });

  it('envía datos al endpoint de registro (mocked fetch)', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    render(<Register />);
    const user = userEvent.setup();

    const email = screen.queryByLabelText(/email/i) || screen.queryByPlaceholderText(/email/i) || screen.getByRole('textbox');
    const password = screen.queryByLabelText(/password/i) || screen.queryByPlaceholderText(/password/i) || screen.getByTestId('password-input');
    const submit = screen.getByRole('button', { name: /sign up|register|create account/i });

    if (email) {
      await user.clear(email);
      await user.type(email, 'newuser@example.com');
    }
    if (password) {
      await user.clear(password);
      await user.type(password, 'password123');
    }

    await user.click(submit);

    expect(mockFetch).toHaveBeenCalled();
  });
});
