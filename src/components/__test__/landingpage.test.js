import { render, screen } from "@testing-library/react";
import App from '../../App'

test('renders the landing page', () => {
    render(<App />)  ;

    screen.getByText("TasteIT");
    screen.getByText("Looking for recipes?");
    screen.getByText("Want to know more about our projects?");
})