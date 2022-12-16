function calculeAliquotaSimples(rtb12: number): number {
  const faixa1 = 180000;
  const faixa2 = 360000;
  const faixa3 = 720000;
  const faixa4 = 1800000;
  const faixa5 = 3600000;
  const faixa6 = 4800000;

  if (rtb12 > faixa6) {
    console.log(
      "Bonitão, sua empresa não se enquadra no Simples Nacional! Volte 2 casas"
    );
  } else if (rtb12 <= faixa1) {
    return (rtb12 * 0.155) / rtb12;
  } else if (rtb12 <= faixa2) {
    return (rtb12 * 0.18 - 4500) / rtb12;
  } else if (rtb12 <= faixa3) {
    return rtb12 * 0.195 - 9900 / rtb12;
  } else if (rtb12 <= faixa4) {
    return (rtb12 * 0.205 - 17100) / rtb12;
  } else if (rtb12 <= faixa5) {
    return rtb12 * 0.23 - 62100 / rtb12;
  } else if (rtb12 <= faixa6) {
    return (rtb12 * 0.305 - 540000) / rtb12;
  }
  return 0;
}

function calculeAliquotaFatorR(rtb12: number): number {
  const faixa1 = 180000;
  const faixa2 = 360000;
  const faixa3 = 720000;
  const faixa4 = 1800000;
  const faixa5 = 3600000;
  const faixa6 = 4800000;

  if (rtb12 > faixa6) {
    console.log(
      "Bonitão, sua empresa não se enquadra no Simples Nacional! Volte 2 casas"
    );
  } else if (rtb12 <= faixa1) {
    return (rtb12 * 0.06) / rtb12;
  } else if (rtb12 <= faixa2) {
    return (rtb12 * 0.112 - 9360) / rtb12;
  } else if (rtb12 <= faixa3) {
    return rtb12 * 0.135 - 17640 / rtb12;
  } else if (rtb12 <= faixa4) {
    return (rtb12 * 0.16 - 35640) / rtb12;
  } else if (rtb12 <= faixa5) {
    return rtb12 * 0.21 - 125640 / rtb12;
  } else if (rtb12 <= faixa6) {
    return (rtb12 * 0.33 - 648000) / rtb12;
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
