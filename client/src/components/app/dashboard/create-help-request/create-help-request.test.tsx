import React from 'react';
import ReactDOM from 'react-dom';
import CreateHelp from './create-help-request';
import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<CreateHelp />);
});

test('renders learn react link', () => {
  render(<CreateHelp title="my header" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
