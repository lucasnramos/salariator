import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import FormInput from "../components/FormInput";
import "@testing-library/jest-dom";
import { clt, cnpj } from "../server/calculation";
 

const MOCK_CLT_FORM_DATA = {
    salarioBrutoMensal: "9420",
    numDependentes: "1",
    totalBeneficios: "1154",
    totalDescontos: "400",
}

const MOCK_PJ_FORM_DATA = {
    faturamentoMensal: "23000",
    despesas: "4000",
    proLabore: "1300",
}


test("should show title", () => {
  render(<Home />);

  expect(
    screen.getByText("Salariator - Compare salários CLT e PJ")
  ).toBeTruthy();
});

test("should calculate yearly salary for CLT", () => {
  const formData = {
    ...MOCK_CLT_FORM_DATA,
    ...MOCK_PJ_FORM_DATA,
  };
  const result = clt(formData);
  console.log(result);

  expect(result).toBeTruthy();
});

test("should calculate yearly salary for CNPJ", () => {
  const formData = {
    ...MOCK_CLT_FORM_DATA,
    ...MOCK_PJ_FORM_DATA,
  };
  const result = cnpj(formData);
  console.log(result);

  expect(result).toBeTruthy();
});
