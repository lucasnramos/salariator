import { SalarioBase } from "../models";

function calculeSalarioBase({
  salarioBruto,
  qtdeDependentes = 0,
}: SalarioBase) {
  const DESCONTO_POR_DEPENDENTE = 189.59;
  const valorInss = calculeInss(salarioBruto);
  return salarioBruto - valorInss - qtdeDependentes * DESCONTO_POR_DEPENDENTE;
}

function calculeIrrf({ salarioBruto, qtdeDependentes }: SalarioBase): number {
  const salarioBase = calculeSalarioBase({ salarioBruto, qtdeDependentes });
  const faixa1 = 2112;
  const faixa2 = 2826.65;
  const faixa3 = 3751.05;
  const faixa4 = 4664.68;

  if (salarioBruto < faixa1) return 0;

  if (salarioBase > faixa1 && salarioBase <= faixa2) {
    return salarioBase * 0.075 - 158.4;
  } else if (salarioBase <= faixa3) {
    return salarioBase * 0.15 - 370.4;
  } else if (salarioBase <= faixa4) {
    return salarioBase * 0.225 - 651.73;
  } else if (salarioBase > faixa4) {
    return salarioBase * 0.275 - 884.96;
  } else {
    return 0;
  }
}

function calculeInss(salarioBruto: number): number {
  const faixa1 = 1302;
  const faixa2 = 2571.29;
  const faixa3 = 3856.94;
  const faixa4 = 7507.49;
  const teto = 908.85;

  if (salarioBruto <= faixa1) {
    return salarioBruto * 0.075;
  } else if (salarioBruto <= faixa2) {
    return salarioBruto * 0.09 - 19.53;
  } else if (salarioBruto <= faixa3) {
    return salarioBruto * 0.12 - 96.67;
  } else if (salarioBruto <= faixa4) {
    return salarioBruto * 0.14 - 173.81;
  } else {
    return teto;
  }
}

function calculeFgts(salarioBruto: number): number {
  return salarioBruto * 0.08;
}

export { calculeIrrf, calculeInss, calculeFgts };
