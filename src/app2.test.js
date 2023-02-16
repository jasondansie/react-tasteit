import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from './App'

test('renders the landing page', () => {
    const { getByText, getByLabelText } = render(<BrowserRouter><App /></BrowserRouter>)  ;

    screen.getByText("TasteITa");
})