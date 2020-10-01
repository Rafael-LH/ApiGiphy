import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const { getByText } = render(<App />)
  // Lo que hace es decir espero que este elemento que es Última búsqueda el cual lo estoy guardando en title
  const title = getByText(/Última búsqueda/i);
  expect(title).toBeInTheDocument(); // este en el documento 
});

// Tambien podemos preguntar de manera asincrona
test('renders without crashing', async () => {
  const { findByText } = render(<App />)
  // Lo que hace es decir espero que este elemento que es Última búsqueda el cual lo estoy guardando en title
  const title = await findByText(/Última búsqueda/i);
  expect(title).toBeInTheDocument(); // este en el documento 
});
