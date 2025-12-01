// src/_tests_/FieldText.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import FieldText from '../UserPages/PageComponents/TextField.jsx';

describe('FieldText (unit)', () => {
  it('muestra el contenido y aplica estilos (bold + size)', () => {
    const field = {
      content: 'Hola prueba',
      style: { bold: true, italic: false, size: 20 },
    };

    render(<FieldText field={field} />);

    const node = screen.getByText(/Hola prueba/);
    expect(node).toBeInTheDocument();
    // comprobamos estilo inline (font-weight y font-size)
    expect(node).toHaveStyle({ fontWeight: '700' });
    expect(node).toHaveStyle({ fontSize: '20px' });
  });

  it('dispara onEdit al hacer doble click', async () => {
    const onEdit = vi.fn();
    const field = { content: 'DobleClick', style: {} };
    render(<FieldText field={field} onEdit={onEdit} />);

    await userEvent.dblClick(screen.getByText('DobleClick'));
    expect(onEdit).toHaveBeenCalled();
  });
});
