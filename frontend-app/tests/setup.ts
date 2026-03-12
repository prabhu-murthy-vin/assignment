import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

/**
 * Vitest + React Testing Library Setup
 * 
 * Global configuration for frontend testing:
 * - jsdom environment for DOM simulation
 * - React Testing Library for component testing
 * - jest-dom matchers for extended assertions
 */
