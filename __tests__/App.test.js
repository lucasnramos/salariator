import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { clt, cnpj, cnpjAnual, cltAnual } from "../server/calculation";

const MOCK_CLT_FORM_DATA = {
  salarioBrutoMensal: "9420",
  numDependentes: "1",
  totalBeneficios: "1154",
  totalDescontos: "730",
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
  expect(result.irrf).toBe(1392.43);
  expect(result.inss).toBe(908.85);
  expect(result.salarioLiquido).toBe(7542.72);
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

test("should calculate Yearly salary for CLT", () => {
  const formData = {
    ...MOCK_CLT_FORM_DATA,
    ...MOCK_PJ_FORM_DATA,
  };
  const monthly = clt(formData);
  const result = cltAnual(monthly);
  console.log(result);

  expect(result).toBeTruthy();
  expect(result.salarioAnual).toBe(113040);
  expect(result.fgtsAnual).toBe(9043.2);
  expect(result.adicionalFerias).toBe(3140);
  expect(result.salarioLiquidoAnual).toBe(110238.56);
});

test("should calculate Yearly salary for CNPJ", () => {
  const formData = {
    ...MOCK_CLT_FORM_DATA,
    ...MOCK_PJ_FORM_DATA,
  };
  const monthly = cnpj(formData);
  const result = cnpjAnual(monthly);

  expect(result).toBeTruthy();
  expect(result.faturamentoAnual).toBe(276000);
  expect(result.proLaboreAnual).toBe(15740.76);
  expect(result.receitaAnual).toBe(182820);
});
