import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Recipes from '../Recipes';

describe('Recipes', () => {
  test('renders recipes component', async () => {
    render(<Recipes />);
    expect(await screen.findByText("Show More")).toBeInTheDocument();
  });
});