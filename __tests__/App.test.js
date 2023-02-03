import { render, screen } from "@testing-library/react"
import Home from "../pages/index"
import FormInput from "../components/FormInput"
import '@testing-library/jest-dom'

test('should show title', () => {
  render(<Home />)

  expect(screen.getByText('Salariator - Compare salários CLT e PJ')).toBeTruthy()
})

// Form Inputs
test('should show an asterix if input is required', () => {
  render(<FormInput label="this is my label" required />)
  expect(screen.getByText('*')).toBeVisible()
})

