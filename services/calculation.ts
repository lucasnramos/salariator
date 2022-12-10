type SalarioCltMensal = {
  salarioBruto: number;
  fgts: number;
  salarioBaseIrrf: number;
  inss: number;
  irrf: number;
  porcentagemInss: number;
  porcentagemIrrf: number;
  salarioLiquido: number;
};

type SimplesNacionalMensal = {
  faturamento: number;
  aliquotaEfetiva: number;
  das: number;
  receita: number;
  proLabore: SalarioCltMensal;
};

function clt(): SalarioCltMensal {
  return {} as SalarioCltMensal;
}

function cnpj(): SimplesNacionalMensal {
  return {} as SimplesNacionalMensal;
}

export { clt, cnpj };
