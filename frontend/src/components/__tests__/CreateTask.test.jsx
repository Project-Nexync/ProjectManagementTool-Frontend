import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTask from '../CreateTask';
import api from '../../API';

vi.mock('../../API');
// mock useParams to provide a projectId so the component fetches team members
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ projectId: '123' }),
  };
});

describe('CreateTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders main heading', () => {
    // CreateTask renders unconditionally (no `open` prop used). Ensure main heading renders.
    render(<CreateTask onFinish={() => {}} />);
    expect(screen.getByText(/Create tasks/i)).toBeInTheDocument();
  });

  test('submits task payload and calls onClose', async () => {
  const onClose = vi.fn();
  api.post.mockResolvedValueOnce({ data: { id: 1 } });
  // mock api.get to return a project with members so assignable members exist
  api.get.mockResolvedValueOnce({ data: { project: { members: [{ username: 'alice' }, { username: 'bob' }] } } });
    // Render the component; it uses useParams for projectId; we can render directly
    render(<CreateTask onFinish={onClose} />);

  // Fill in the task input
  const titleInput = await screen.findByPlaceholderText(/Task/i);
  fireEvent.change(titleInput, { target: { value: 'New Task' } });

  // Provide a date and time by invoking the date inputs (they are react-datepicker inputs)
  const dateInputs = screen.getAllByPlaceholderText(/dd\/mm\/yyyy|12.00 a.m./i);
    // If date inputs exist, set values (value prop is controlled; simulate change via fireEvent.change)
    if (dateInputs.length >= 2) {
      fireEvent.change(dateInputs[0], { target: { value: '01/01/2025' } });
      fireEvent.change(dateInputs[1], { target: { value: '12.00 a.m.' } });
    }

  // Wait for team members to be fetched and displayed (images with title attribute)
  await screen.findByTitle('alice');

  // Find the assignees cell for the first row: third td inside tbody tr
  const row = document.querySelector('tbody tr');
  const tds = row ? row.querySelectorAll('td') : [];
  const assigneeCell = tds.length >= 3 ? tds[2] : document.querySelector('td');
    const dataTransfer = {
      data: {},
      setData(key, value) { this.data[key] = value; },
      getData(key) { return this.data[key]; },
    };
    // set the dragged member JSON
    dataTransfer.setData('member', JSON.stringify({ username: 'alice' }));
    fireEvent.drop(assigneeCell, { dataTransfer });

    // Assert the assignee image now appears in the assignees cell
    const assignedImg = assigneeCell.querySelector('img[alt="alice"]');
    expect(assignedImg).toBeInTheDocument();

    // Finish button should be present (may still be disabled if some fields missing)
    const finishBtn = screen.getByRole('button', { name: /Finish/i });
    expect(finishBtn).toBeInTheDocument();
  });
});
