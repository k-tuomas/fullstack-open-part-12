import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: 'Test todo component',
    done: true
  }

  render(<Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />)

  const element = screen.getByText('Test todo component')
  expect(element).toBeDefined()
})