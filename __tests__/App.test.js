import { render, screen } from "@testing-library/react"
import Home from "../pages/index"

test('Dummy test', () => {
  expect(2).toBe(2)
})

test('Should show title', () => {
  render(<Home />)

  expect(screen.getByText('Salariator - Compare salários CLT e PJ')).toBeTruthy()
})

