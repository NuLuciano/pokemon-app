import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('Renders welcome in landing page', () => {
  render(
  <Router>
    <App/>
  </Router>);
  const linkElement = screen.getByText(/Welcome!/i);
  expect(linkElement).toBeInTheDocument();
});