export type SalarioBase = {
  salarioBruto: number;
  qtdeDependentes: number;
};
function calculeSalarioBase({ salarioBruto, qtdeDependentes }: SalarioBase) {
  const DESCONTO_POR_DEPENDENTE = 189.59;
  const valorInss = calculeInss(salarioBruto);
  return salarioBruto - valorInss - qtdeDependentes * DESCONTO_POR_DEPENDENTE;
}

function calculeIrrf({ salarioBruto, qtdeDependentes }: SalarioBase): number {
  const salarioBase = calculeSalarioBase({ salarioBruto, qtdeDependentes });
  const faixa1 = 1903.98;
  const faixa2 = 2826.65;
  const faixa3 = 3751.05;
  const faixa4 = 4664.68;

  if (salarioBruto < faixa1) 
    return 0

  if (salarioBase > faixa1 && salarioBase <= faixa2) {
    return salarioBase * 0.075 - 142.8;
  } else if (salarioBase <= faixa3) {
    return salarioBase * 0.15 - 354.8;
  } else if (salarioBase <= faixa4) {
    return salarioBase * 0.225 - 636.13;
  } else if (salarioBase > faixa4) {
    return salarioBase * 0.275 - 869.36;
  } else {
    return 0;
  }
}

function calculeInss(salarioBruto: number): number {
  const faixa1 = 1212.0;
  const faixa2 = 2427.35;
  const faixa3 = 3641.03;
  const faixa4 = 7087.22;
  const teto = 828.39;

  if (salarioBruto <= faixa1) {
    return salarioBruto * 0.075;
  } else if (salarioBruto <= faixa2) {
    return salarioBruto * 0.09 - 18.18;
  } else if (salarioBruto <= faixa3) {
    return salarioBruto * 0.12 - 91;
  } else if (salarioBruto <= faixa4) {
    return salarioBruto * 0.14 - 163.82;
  } else {
    return teto;
  }
}

function calculeFgts(salarioBruto: number): number {
  return salarioBruto * 0.08;
}

export { calculeIrrf, calculeInss, calculeFgts };
