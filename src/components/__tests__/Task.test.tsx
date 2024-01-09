import '@testing-library/jest-dom';

import { test, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Task } from '../Task';
import userEvent from '@testing-library/user-event';

const handleDelete = vi.fn();
const handleToggleTaskStatus = vi.fn();

afterEach(() => {
  handleDelete.mockReset();
  handleToggleTaskStatus.mockReset();
});

test('Correctly displays the not completed task', () => {
  const { container } = render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 1').classList.toString()).toBe('');
  const svg = container.querySelector('svg');
  expect(svg?.classList.toString().includes('unChecked')).toBeTruthy();
});

test('Correctly displays the completed task', () => {
  const { container } = render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
        done_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 1').classList.toString()).not.toBe('');
  const svg = container.querySelector('svg');
  expect(svg?.classList.toString().includes('checked')).toBeTruthy();
});

test('Should call handleDelete when the delete button is clicked', async () => {
  render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
        done_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  //act
  await userEvent.click(screen.getAllByRole('button')[1]);

  //assert
  expect(handleDelete).toHaveBeenCalledWith('1');
});

test('Should call handleToggleTaskStatus when the toggle button is clicked', async () => {
  render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  //act
  await userEvent.click(screen.getAllByRole('button')[0]);

  //assert
  expect(handleToggleTaskStatus).toHaveBeenCalledWith('1');
});

test('Should have the normabl button svg when the toggle button is not hovered', async () => {
  const { container } = render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  //act

  //assert
  const svg = container.querySelector('svg');
  const svgNodeChildLength = svg?.childNodes.length;

  expect(svgNodeChildLength).toBe(2);
});

test('Should have a different svg when the toggle button is hovered', async () => {
  const { container } = render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  //act
  await userEvent.hover(screen.getAllByRole('button')[0]);

  //assert
  const svg = container.querySelector('svg');
  const svgNodeChildLength = svg?.childNodes.length;

  expect(svgNodeChildLength).toBe(3);
});

test('Shouldchange svg depending on hover on toggle', async () => {
  const { container } = render(
    <Task
      task={{
        id: '1',
        title: 'Task 1',
        created_at: Date.now(),
      }}
      handleDelete={handleDelete}
      handleToggleTaskStatus={handleToggleTaskStatus}
    />
  );

  //act
  await userEvent.hover(screen.getAllByRole('button')[0]);

  //assert
  const svgHover = container.querySelector('svg');
  const svgHoverNodeChildLength = svgHover?.childNodes.length;

  expect(svgHoverNodeChildLength).toBe(3);

  await userEvent.unhover(screen.getAllByRole('button')[0]);

  const svgunHover = container.querySelector('svg');
  const svgunHoverNodeChildLength2 = svgunHover?.childNodes.length;

  expect(svgunHoverNodeChildLength2).toBe(2);
});
