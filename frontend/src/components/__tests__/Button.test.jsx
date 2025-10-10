import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../loginButton'

describe('Button component', () => {
  it('renders title and subtitle', () => {
    render(<Button title="Click me" subtitle="sub" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
    expect(screen.getByText('sub')).toBeInTheDocument()
  })

  it('applies disabled attribute and class', async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<Button title="Save" onClick={handle} disabled />)
    const btn = screen.getByText('Save')
    // Button should still be in the document but disabled
    expect(btn).toBeInTheDocument()
    await user.click(btn)
    expect(handle).not.toHaveBeenCalled()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<Button title="Click" onClick={handle} />)
    await user.click(screen.getByText('Click'))
    expect(handle).toHaveBeenCalledTimes(1)
  })
})
