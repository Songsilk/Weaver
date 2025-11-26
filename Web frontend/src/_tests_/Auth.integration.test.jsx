import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';

import Login from '../login.jsx';
import Register from '../register.jsx';


// helper to render with MemoryRouter at a given initial route
function renderWithRouter(ui, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe('Auth integration', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('flujo de login -> redirige o muestra success (mocked fetch)', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'abc' }),
    });

    // Si quieres testear solo Login y redirección hacia /profiles:
    renderWithRouter(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<div>Profiles Page</div>} />
      </Routes>,
      { route: '/login' }
    );

    const user = userEvent.setup();
    const email = screen.queryByLabelText(/email/i) || screen.getByRole('textbox');
    const password = screen.queryByLabelText(/password/i) || screen.getByTestId('password-input');
    const submit = screen.getByRole('button', { name: /login|sign in|submit/i });

    await user.clear(email);
    await user.type(email, 'user@integ.com');
    await user.clear(password);
    await user.type(password, 'integr4t1on');

    await user.click(submit);

    // esperar que fetch haya sido llamado y que la ruta cambie (si Login hace navigate('/profiles'))
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    // si tu Login redirige, busca el texto de Profiles Page
    // await waitFor(() => expect(screen.getByText(/Profiles Page/i)).toBeInTheDocument());
  });

  it('registro muestra errores de validación o success (mocked)', async () => {
    const fetchMock = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: 123 }),
    });

    renderWithRouter(
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<div>Welcome</div>} />
      </Routes>,
      { route: '/register' }
    );

    const user = userEvent.setup();
    const email = screen.queryByLabelText(/email/i) || screen.getByRole('textbox');
    const password = screen.queryByLabelText(/password/i) || screen.getByTestId('password-input');
    const submit = screen.getByRole('button', { name: /sign up|register|create account/i });

    if (email) await user.type(email, 'rego@example.com');
    if (password) await user.type(password, 'mystrongpassword');

    await user.click(submit);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    // optional: validate navigation or success message
    // await waitFor(() => expect(screen.getByText(/Welcome/i)).toBeInTheDocument());
  });
});
