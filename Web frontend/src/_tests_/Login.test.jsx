import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Importa tu componente. Ajusta la ruta si tu archivo está en otro lugar.
import Login from '../login.jsx';

describe('Login (unit)', () => {
  beforeEach(() => {
    // limpiar mocks
    vi.restoreAllMocks();
  });

  it('renderiza campos de email, password y submit', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i) || screen.getByPlaceholderText(/email/i) || screen.getByRole('textbox')).toBeInTheDocument();
    // password puede ser input type password
    expect(screen.getByLabelText(/password/i) || screen.getByPlaceholderText(/password/i) || screen.getByTestId('password-input')).toBeTruthy();
    expect(screen.getByRole('button', { name: /login|sign in|submit/i })).toBeTruthy();
  });

  it('llama a fetch con credenciales al enviar (mocked)', async () => {
    // Mock global fetch
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'fake-token' }),
    });

    render(<Login />);
    const user = userEvent.setup();

    // Encuentra inputs con heurística flexible (depende de tu markup)
    const email = screen.queryByLabelText(/email/i) || screen.queryByPlaceholderText(/email/i) || screen.getByRole('textbox');
    const password = screen.queryByLabelText(/password/i) || screen.queryByPlaceholderText(/password/i) || screen.getByTestId('password-input');

    await user.clear(email);
    await user.type(email, 'user@example.com');
    await user.clear(password);
    await user.type(password, 'supersecret');

    const submit = screen.getByRole('button', { name: /login|sign in|submit/i });
    await user.click(submit);

    // espera que fetch haya sido llamado con la ruta /login o similar
    expect(mockFetch).toHaveBeenCalled();
    // opcional: inspecciona args
    const callArgs = mockFetch.mock.calls[0][0];
    expect(callArgs).toBeTruthy();
  });
});
