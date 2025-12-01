// src/_tests_/PersonalPage.integration.test.jsx
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// Mock react-rnd so it doesn't attempt layout in jsdom
vi.mock('react-rnd', () => ({
  Rnd: ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
  },
}));

import PersonalPage from '../UserPages/PersonalPage.jsx';

describe('PersonalPage (integration)', () => {
  it('añade un Text field, abre modal, edita y guarda el contenido', async () => {
    render(<PersonalPage />);

    // click en el botón "Text field" del panel izquierdo
    const addTextBtn = screen.getByRole('button', { name: /Text field/i });
    await userEvent.click(addTextBtn);

    // debería aparecer el field con el texto por defecto "Edit me"
    const fieldNode = await screen.findByText(/Edit me/i, {}, { timeout: 2000 });
    expect(fieldNode).toBeInTheDocument();

    // doble click → se abre el modal del editor
    await userEvent.dblClick(fieldNode);

    // Esperamos al dialog (modal) y luego buscamos el textbox DENTRO de ese dialog
    const dialog = await screen.findByRole('dialog');
    const textarea = within(dialog).getByRole('textbox');
    expect(textarea).toBeInTheDocument();

    // editar el contenido y guardar
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Texto desde integration test');

    // buscamos el botón Save dentro del dialog también (más robusto)
    const saveBtn = within(dialog).getByRole('button', { name: /Save/i });
    await userEvent.click(saveBtn);

    // esperamos a que el canvas se actualice con el nuevo texto
    await waitFor(() => {
      expect(screen.getByText('Texto desde integration test')).toBeInTheDocument();
    });
  });
});
