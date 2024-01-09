import '@testing-library/jest-dom';

import { test, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ListTask } from '../ListTasks';
import { Task } from '../../interfaces/Task';
import userEvent from '@testing-library/user-event';

const tasks: Task[] = [
  { id: '1', title: 'Task 1', created_at: Date.now(), done_at: undefined },
  { id: '2', title: 'Task 2', created_at: Date.now(), done_at: Date.now() },
  { id: '3', title: 'Task 3', created_at: Date.now(), done_at: undefined },
];

const handleUpdateOrCreateTask = vi.fn();
const handleRemoveTask = vi.fn();

test('renders the correct number of tasks', () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getAllByRole('listitem').length).toBe(tasks.length);
});

test('Task Created should show the right numbers when there are tasks', () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByTestId('tasksCreated')).toHaveTextContent('3');
});

test('Task Created should show the right numbers when there are no tasks', () => {
  render(
    <ListTask
      tasks={[]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByTestId('tasksCreated')).toHaveTextContent('0');
});

test('calls handleToggleTaskStatus when a task is clicked', async () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  const taskElement = within(screen.getAllByRole('listitem')[0]).getAllByRole(
    'button'
  )[0];

  await userEvent.click(taskElement);

  expect(handleUpdateOrCreateTask).toHaveBeenCalledOnce();
});

test('update the done_at property when a task is clicked', async () => {
  const handleUpdateOrCreateTask = vi.fn();

  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  const taskElement = within(screen.getAllByRole('listitem')[0]).getAllByRole(
    'button'
  )[0];

  await userEvent.click(taskElement);

  expect(handleUpdateOrCreateTask.mock.lastCall[0]).not.undefined;
});

test('calls handleRemoveTask when a task is deleted', async () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  const deleteButton = within(screen.getAllByRole('listitem')[0]).getAllByRole(
    'button'
  )[1];

  await userEvent.click(deleteButton);

  expect(handleRemoveTask).toHaveBeenCalledWith('1');
});

test('Should display the empty component when there is no task', () => {
  render(
    <ListTask
      tasks={[]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('You have no tasks')).toBeInTheDocument();
});

test('Add task should be able to add a new task in the list when there is no task', async () => {
  handleUpdateOrCreateTask.mockReset();

  render(
    <ListTask
      tasks={[]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  //act
  await userEvent.type(screen.getByRole('textbox'), 'test task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(handleUpdateOrCreateTask.mock.lastCall[0].title).toBe('test task');
});

test('Add task should be able to add a new task in the list when there mutliple tasks', async () => {
  handleUpdateOrCreateTask.mockReset();

  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  //act
  await userEvent.type(screen.getByRole('textbox'), 'test task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(handleUpdateOrCreateTask.mock.lastCall[0].title).toBe('test task');
});

test('Add task without title should not be able to add a new task in the list when there is no task', async () => {
  handleUpdateOrCreateTask.mockReset();

  render(
    <ListTask
      tasks={[]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  //act
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(handleUpdateOrCreateTask).not.toHaveBeenCalled();
});

test('Should not throw error when there is twice the same name in tasks', async () => {
  handleUpdateOrCreateTask.mockReset();

  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  //act
  await userEvent.type(screen.getByRole('textbox'), 'Task 1');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  //assert
  expect(handleUpdateOrCreateTask.mock.lastCall[0].title).toBe('Task 1');
});

test('Complete task should show the right numbers when there is one', () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('1 out of 3')).toBeInTheDocument();
});

test('Complete task should show the right numbers when there is two out of three', () => {
  render(
    <ListTask
      tasks={[
        {
          id: '1',
          title: 'Task 1',
          created_at: Date.now(),
          done_at: Date.now(),
        },
        {
          id: '2',
          title: 'Task 2',
          created_at: Date.now(),
          done_at: Date.now(),
        },
        {
          id: '3',
          title: 'Task 3',
          created_at: Date.now(),
          done_at: undefined,
        },
      ]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('2 out of 3')).toBeInTheDocument();
});

test('Complete task should show the right numbers when there is 3 out of three', () => {
  render(
    <ListTask
      tasks={[
        {
          id: '1',
          title: 'Task 1',
          created_at: Date.now(),
          done_at: Date.now(),
        },
        {
          id: '2',
          title: 'Task 2',
          created_at: Date.now(),
          done_at: Date.now(),
        },
        {
          id: '3',
          title: 'Task 3',
          created_at: Date.now(),
          done_at: Date.now(),
        },
      ]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('3 out of 3')).toBeInTheDocument();
});

test('Complete task should show the right numbers when there is no tasks', () => {
  render(
    <ListTask
      tasks={[]}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('0 out of 0')).toBeInTheDocument();
});

test('Task should render correctly', () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 1').classList.toString()).toBe('');
});

test('Task should render correctly when done', () => {
  render(
    <ListTask
      tasks={tasks}
      handleUpdateOrCreateTask={handleUpdateOrCreateTask}
      handleRemoveTask={handleRemoveTask}
    />
  );

  expect(screen.getByText('Task 2')).toBeInTheDocument();
  expect(screen.getByText('Task 2').classList.toString()).not.toBe('');
});
