type FormData = {
  salarioBrutoMensal: string;
  numDependentes: string;
  totalBeneficios: string;
  totalDescontos: string;
  faturamentoMensal: string;
  despesas: string;
  proLabore: string;
};

type SalarioCltMensal = {
  salarioBruto: number;
  fgts: number;
  salarioBaseIrrf?: number;
  inss: number;
  irrf: number;
  porcentagemInss: number;
  porcentagemIrrf: number;
  salarioLiquido: number;
};

type SimplesNacionalMensal = {
  faturamentoMensal: number;
  aliquotaEfetiva: number;
  das: number;
  receita: number;
  proLabore: SalarioCltMensal;
};

type SalarioBase = {
  salarioBruto: number;
  qtdeDependentes?: number;
};

export type { FormData, SalarioCltMensal, SimplesNacionalMensal, SalarioBase };
