import '@testing-library/jest-dom';

import { test, expect, expectTypeOf, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddTask } from '../AddTask';
import { Task } from '../../interfaces/Task';

test('User should be able to add a task and receive a valid task interface back', async () => {
  let taskRecevied: Task;
  render(
    <AddTask
      handleAddTask={(task) => {
        taskRecevied = task;
      }}
    />
  );

  //act
  await userEvent.type(screen.getByRole('textbox'), 'test task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expectTypeOf(taskRecevied).toMatchTypeOf<Task>();
  expect(taskRecevied.title).toBe('test task');
});

test('Form should be invalid if title is empty', async () => {
  render(<AddTask handleAddTask={() => {}} />);

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
  let taskRecevied: Task;
  const ids = new Set();
  render(
    <AddTask
      handleAddTask={(task) => {
        taskRecevied = task;
      }}
    />
  );

  for (const _ of Array.from({ length: 5 })) {
    //act
    await userEvent.type(screen.getByRole('textbox'), 'This is a task');
    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    //assert
    expect(ids.has(taskRecevied.id)).toBe(false);
    ids.add(taskRecevied.id);
  }
});
