export function calculeSalarioBase({
  salarioBrutoMensal,
  inss,
  numDependentes,
}: {
  salarioBrutoMensal: number;
  inss: number;
  numDependentes: number;
}) {
  const DESCONTO_POR_DEPENDENTE = 189.59;
  return salarioBrutoMensal - inss - numDependentes * DESCONTO_POR_DEPENDENTE;
}

export function calculeIrrf(salarioBase: number): number {
  const faixa1 = 2259.2;
  const faixa2 = 2828.65;
  const faixa3 = 3751.05;
  const faixa4 = 4664.68;

  if (salarioBase > faixa1 && salarioBase <= faixa2) {
    return salarioBase * 0.075 - 169.44;
  } else if (salarioBase <= faixa3) {
    return salarioBase * 0.15 - 381.44;
  } else if (salarioBase <= faixa4) {
    return salarioBase * 0.225 - 662.77;
  } else if (salarioBase > faixa4) {
    return salarioBase * 0.275 - 896;
  } else {
    return 0;
  }
}

export function calculeInss(salarioBruto: number): number {
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

export function calculeFgts(salarioBruto: number): number {
  return salarioBruto * 0.08;
}
