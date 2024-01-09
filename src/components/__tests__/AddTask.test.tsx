import '@testing-library/jest-dom';

import { test, expect, expectTypeOf, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddTask } from '../AddTask';
import { Task } from '../../interfaces/Task';

test('User should be able to add a task and receive a valid task interface back', async () => {
  const handleAddTask = vi.fn();
  render(<AddTask handleAddTask={handleAddTask} />);

  //act
  await userEvent.type(screen.getByRole('textbox'), 'test task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expectTypeOf(handleAddTask.mock.lastCall[0]).toMatchTypeOf<Task>();
  expect(handleAddTask.mock.lastCall[0].title).toBe('test task');
});

test('Form should be invalid if title is empty', async () => {
  render(<AddTask handleAddTask={vi.fn()} />);

  // act
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  const errorMessage = (screen.getByRole('textbox') as HTMLObjectElement)
    .validationMessage;

  expect(errorMessage).toBe('Please enter a task title');
});

test('Form should reset after sending a valid task', async () => {
  render(<AddTask handleAddTask={vi.fn()} />);

  //act
  await userEvent.type(screen.getByRole('textbox'), 'This is a task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(screen.getByRole('textbox')).toHaveValue('');
});

test('Form should not display error when sending an valid task after sending invalid task', async () => {
  render(<AddTask handleAddTask={vi.fn()} />);

  //act
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  const errorMessage = (screen.getByRole('textbox') as HTMLObjectElement)
    .validationMessage;

  expect(errorMessage).toBe('Please enter a task title');

  //act
  await userEvent.type(screen.getByRole('textbox'), 'This is a task');

  //assert
  const errorMessageAfter = (screen.getByRole('textbox') as HTMLObjectElement)
    .validationMessage;

  expect(errorMessageAfter).toBe('');

  //act
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(screen.getByRole('textbox')).toHaveValue('');
});

test('Form should send an unique id with any new task', async () => {
  const handleAddTask = vi.fn();

  const ids = new Set();
  render(<AddTask handleAddTask={handleAddTask} />);

  for (const _ of Array.from({ length: 5 })) {
    //act
    await userEvent.type(screen.getByRole('textbox'), 'This is a task');
    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    //assert
    expect(ids.has(handleAddTask.mock.lastCall[0].id)).toBe(false);
    ids.add(handleAddTask.mock.lastCall[0].id);
  }
});
