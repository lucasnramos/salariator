import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import FormInput from "../components/FormInput";
import "@testing-library/jest-dom";
import { clt } from "../server/calculation";

test("should show title", () => {
  render(<Home />);

  expect(
    screen.getByText("Salariator - Compare salários CLT e PJ")
  ).toBeTruthy();
});

// Form Inputs
test("should show an asterix if input is required", () => {
  render(<FormInput label="this is my label" required />);
  expect(screen.getByText("*")).toBeVisible();
});

test("should calculate yearly salary for CLT", () => {
  const formData = {
    salarioBrutoMensal: "8971.87",
    numDependentes: "1",
    totalBeneficios: "1154",
    totalDescontos: "400",
    faturamentoMensal: "23000",
    despesas: "8000",
    rbt12: "23000",
    proLabore: "1212",
  };
  const result = clt(formData);
  console.log(result);

  expect(result).toBeTruthy();
});
