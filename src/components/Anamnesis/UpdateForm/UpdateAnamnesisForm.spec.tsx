import { render, fireEvent, screen } from '@testing-library/react';
import UpdateAnamnesisForm from './UpdateAnamnesisForm';
import mockForms from '../../../mockDatas/forms';

const forms = [mockForms[0]];

describe('UpdateAnamnesisForm', () => {
  const setup = () => {
    const setForms = jest.fn();
    const handlePreviousPage = jest.fn();
    
    render(
      <UpdateAnamnesisForm
        id="1"
        forms={forms}
        setForms={setForms}
        handlePreviousPage={handlePreviousPage}
      />
    );

    return {
      setForms,
      handlePreviousPage,
    };
  };

  it('updates form title and description correctly', () => {
    const { setForms } = setup();

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Form 1' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Updated Description 1' } });

    fireEvent.click(screen.getByText('Update Form'));

    expect(setForms).toHaveBeenCalledWith([
      {
        id: 1,
        title: 'Updated Form 1',
        description: 'Updated Description 1',
        createdAt: '2023-01-01',
        sections: mockForms[0].sections,
      },
    ]);
  });

  it('adds a new section', () => {
    setup();
    fireEvent.click(screen.getByText('Add Section'));

    expect(screen.getAllByPlaceholderText('Section Title').length).toBe(2);
  });

  it('adds a new question to a section', () => {
    setup();
    fireEvent.click(screen.getByText('Add Question'));

    expect(screen.getAllByPlaceholderText('Question Text').length).toBe(3);
  });

  it('calls handlePreviousPage when "Back" button is clicked', () => {
    const { handlePreviousPage } = setup();
    fireEvent.click(screen.getByText('Back'));
    expect(handlePreviousPage).toHaveBeenCalled();
  });
});

// npx jest src/components/Anamnesis/UpdateForm/UpdateAnamnesisForm.spec.tsx