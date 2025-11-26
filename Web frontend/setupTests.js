// setupTests.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock de react-router-dom.useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});