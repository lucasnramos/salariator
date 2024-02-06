import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { clt, cnpj } from "../server/calculation";

const MOCK_CLT_FORM_DATA = {
  salarioBrutoMensal: "9420",
  numDependentes: "1",
  totalBeneficios: "1154",
  totalDescontos: "400",
};

const MOCK_PJ_FORM_DATA = {
  faturamentoMensal: "23000",
  despesas: "4000",
  proLabore: "1300",
};

test("should show title", () => {
  render(<Home />);

  expect(
    screen.getByText("Salariator - Compare salários CLT e PJ")
  ).toBeTruthy();
});

test("should calculate monthly salary for CLT", () => {
  const formData = {
    ...MOCK_CLT_FORM_DATA,
    ...MOCK_PJ_FORM_DATA,
  };
  const result = clt(formData);

  expect(result).toBeTruthy();
  expect(result.fgts).toBe(753.6);
  expect(result.inss).toBe(908.85);
  expect(result.salarioLiquido).toBe(7861.68);
  expect(result.porcentagemInss).toBe(0.1);
  expect(result.porcentagemIrrf).toBe(0.15);
});

test("should calculate monthly salary for CNPJ", () => {
  const formData = {
    ...MOCK_CLT_FORM_DATA,
    ...MOCK_PJ_FORM_DATA,
  };
  const result = cnpj(formData);

  expect(result).toBeTruthy();
  expect(result.aliquotaEfetiva).toBe(0.16);
  expect(result.das).toBe(3765);
  expect(result.receita).toBe(15235);
});
