import '@testing-library/jest-dom';

import { test, expect, vi, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { App } from '../App';
import userEvent from '@testing-library/user-event';

test('should render with emtpy when first started', () => {
  render(<App />);

  expect(screen.getByText('You have no tasks')).toBeInTheDocument();
});

test('should Create a new item in the list', async () => {
  render(<App />);

  //act

  await userEvent.type(screen.getByRole('textbox'), 'test task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(screen.getByText('test task')).toBeInTheDocument();
});

test('should Create a new item in the list and it should have the right display', async () => {
  render(<App />);

  //assert
  expect(screen.getByText('test task').classList.toString()).toBe('');
});

test('should update the task to be completed', async () => {
  render(<App />);

  await userEvent.click(
    within(screen.getAllByRole('listitem')[0]).getAllByRole('button')[0]
  );

  //assert
  expect(screen.getByText('test task').classList.toString()).not.toBe('');
});

test('should remove the task from the list', async () => {
  render(<App />);

  await userEvent.click(
    within(screen.getAllByRole('listitem')[0]).getAllByRole('button')[1]
  );

  //assert
  expect(screen.queryByText('test task')).not.toBeInTheDocument();
});
