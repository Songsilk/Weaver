// src/_tests_/mocks/server.js
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// handlers: agrega aquí todos los endpoints que tu frontend consulta en tests
const handlers = [
  rest.post('/api/save-profile', (req, res, ctx) => {
    // ejemplo: devuelve un OK
    return res(ctx.status(200), ctx.json({ ok: true }));
  }),
  // añade más handlers si los necesitas
];

const server = setupServer(...handlers);

export { server, rest, handlers };
