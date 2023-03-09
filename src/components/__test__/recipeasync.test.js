import * as React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import Card from '../Card';
import { BrowserRouter } from 'react-router-dom';

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
  it('renders recipes component and displays data from the api call', async () => {

    axios.get.mockResolvedValueOnce({ data: mockData });
    
    render(<BrowserRouter>
        <Card
          key={mockData.id}
          flag={mockData.flag}
          image={mockData.image}
          title={mockData.title}
          link={`/SingleRecipe/${mockData.id}`}
         />
      </BrowserRouter>
    );

    const buttonElement = await  screen.findByText('Show More');

    expect(buttonElement).toBeInTheDocument();
  });
});