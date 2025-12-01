// vitest.setup.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

let serverExists = false;

try {
  // usamos import dinámico para capturar fallos de importación
  // (permite dar un error claro en caso de que msw no esté instalado)
  // Nota: vitest/Node soporta top-level await; si tu versión no, cambia a then/catch.
  // Pero la mayoría de setups modernos de Vitest permiten esto.
  // Alternativa: usar require(...) en CommonJS si tu entorno lo necesita.
  const mod = await import('./src/_tests_/mocks/server.js');
  if (mod && mod.server) {
    beforeAll(() => mod.server.listen());
    afterEach(() => mod.server.resetHandlers());
    afterAll(() => mod.server.close());
    serverExists = true;
  } else {
    // no hay server exportado
    // eslint-disable-next-line no-console
    console.warn('[vitest.setup] msw server not exported from mocks/server.js');
  }
} catch (err) {
  // msw no está disponible o hubo error al importar el archivo
  // eslint-disable-next-line no-console
  console.warn('[vitest.setup] MSW init failed — tests will fallback to simple fetch mock.', err);
}

// mock react-router-dom navigate para que no pete
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Fallback: si msw no está disponible, definimos un global.fetch simple
if (!serverExists && typeof globalThis.fetch === 'undefined') {
  // eslint-disable-next-line no-console
  console.warn('[vitest.setup] installing global.fetch fallback mock');
  globalThis.fetch = vi.fn((url, opts) =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
      text: async () => '',
    })
  );
}
