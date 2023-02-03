function calculeAliquotaSimples(rbt12: number): number {
  const faixa1 = 180000;
  const faixa2 = 360000;
  const faixa3 = 720000;
  const faixa4 = 1800000;
  const faixa5 = 3600000;
  const faixa6 = 4800000;

  if (rbt12 > faixa6) {
    console.log(
      "Bonitão, sua empresa não se enquadra no Simples Nacional! Volte 2 casas"
    );
  } else if (rbt12 <= faixa1) {
    return (rbt12 * 0.155) / rbt12;
  } else if (rbt12 <= faixa2) {
    return (rbt12 * 0.18 - 4500) / rbt12;
  } else if (rbt12 <= faixa3) {
    return rbt12 * 0.195 - 9900 / rbt12;
  } else if (rbt12 <= faixa4) {
    return (rbt12 * 0.205 - 17100) / rbt12;
  } else if (rbt12 <= faixa5) {
    return rbt12 * 0.23 - 62100 / rbt12;
  } else if (rbt12 <= faixa6) {
    return (rbt12 * 0.305 - 540000) / rbt12;
  }
  return 0;
}

function calculeAliquotaFatorR(rbt12: number): number {
  const faixa1 = 180000;
  const faixa2 = 360000;
  const faixa3 = 720000;
  const faixa4 = 1800000;
  const faixa5 = 3600000;
  const faixa6 = 4800000;

  if (rbt12 > faixa6) {
    console.log(
      "Bonitão, sua empresa não se enquadra no Simples Nacional! Volte 2 casas"
    );
  } else if (rbt12 <= faixa1) {
    return (rbt12 * 0.06) / rbt12;
  } else if (rbt12 <= faixa2) {
    return (rbt12 * 0.112 - 9360) / rbt12;
  } else if (rbt12 <= faixa3) {
    return rbt12 * 0.135 - 17640 / rbt12;
  } else if (rbt12 <= faixa4) {
    return (rbt12 * 0.16 - 35640) / rbt12;
  } else if (rbt12 <= faixa5) {
    return rbt12 * 0.21 - 125640 / rbt12;
  } else if (rbt12 <= faixa6) {
    return (rbt12 * 0.33 - 648000) / rbt12;
  }

  return 0;
}

function calculeDasSimples(
  faturamentoMensal: number,
  aliquotaEfetiva: number
): number {
  return faturamentoMensal * aliquotaEfetiva;
}

export { calculeAliquotaSimples, calculeAliquotaFatorR, calculeDasSimples };
