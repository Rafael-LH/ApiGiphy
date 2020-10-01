import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Home works as expected', async () => {
  const { findByText } = render(<App />)
  const text = await findByText(/Buscar/i);
  expect(text).toBeVisible()
});
test('Search form could be used', async () => {
  render(<App />)
  const input = await screen.findByRole('textbox')
  fireEvent.change(input, { target: { value: 'naruto' } })
  const button = await screen.findByRole('button')
  fireEvent.click(button)

  // screen.debug() //Para hacer debug
  const title = await screen.findByText('naruto')
  expect(title).toBeVisible()
})
