import { test, expect } from 'vitest';
import { sortTasks } from '../sortTasks';
import { Task } from '../../interfaces/Task';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    created_at: new Date('2023-01-01T00:00:00').getTime(),
    done_at: undefined,
  },
  {
    id: '2',
    title: 'Task 2',
    created_at: new Date('2023-01-02T00:00:00').getTime(),
    done_at: new Date('2023-01-04T00:00:00').getTime(),
  },
  {
    id: '3',
    title: 'Task 3',
    created_at: new Date('2023-01-02T00:00:00').getTime(),
    done_at: undefined,
  },
];

test('sorts tasks correctly by done at', () => {
  const result = sortTasks(tasks);

  expect(result).toMatchSnapshot();
});

test('Tasks should be sorted correctly when there is no done from the past to the future', () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      created_at: new Date('1995-12-17T00:00:00').getTime(),
      done_at: undefined,
    },
    {
      id: '2',
      title: 'Task 2',
      created_at: new Date('2023-01-01T00:00:00').getTime(),
      done_at: undefined,
    },
    {
      id: '3',
      title: 'Task 3',
      created_at: new Date('2024-01-01T00:00:00').getTime(),
      done_at: undefined,
    },
  ];
  const result = sortTasks(tasks);

  expect(result).toMatchSnapshot();
});

test('Completed task should order at the botton from the most recent to the most old', () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      created_at: new Date('1995-12-17T00:00:00').getTime(),
      done_at: undefined,
    },
    {
      id: '4',
      title: 'Task 4',
      created_at: new Date('2024-01-01T00:00:00').getTime(),
      done_at: new Date('2024-01-02T00:00:00').getTime(),
    },
    {
      id: '2',
      title: 'Task 2',
      created_at: new Date('2023-01-01T00:00:00').getTime(),
      done_at: undefined,
    },
    {
      id: '3',
      title: 'Task 3',
      created_at: new Date('2024-01-01T00:00:00').getTime(),
      done_at: undefined,
    },

    {
      id: '5',
      title: 'Task 5',
      created_at: new Date('2023-01-01T00:00:00').getTime(),
      done_at: new Date('2023-01-02T00:00:00').getTime(),
    },
  ];
  const result = sortTasks(tasks);
  expect(result).toMatchSnapshot();
});
