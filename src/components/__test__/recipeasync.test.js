import * as React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Recipes from '../Recipes';

jest.mock('axios');

const mockData = {
  
      "id": 1,
      "title": "bread",
      "author": "Jason",
      "country": "Libya",
      "flag": "https://flagcdn.com/w320/ly.png",
      "description": "aödajkfadkööadsjk",
      "image": "/images/barbecue.jpg",
      "instructions": "",
      "quantity": [
          "1",
          "3"
      ],
      "ingredients": [
          "water",
          "eggs"
      ]
};


describe('Recipes', () => {
  test('renders recipes component and displays data from the api call', async () => {

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<Recipes />);

    const buttonElement = await screen.findByText('bread');

    expect(buttonElement).toBeInTheDocument();
  });
});