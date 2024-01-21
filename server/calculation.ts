import { calculeFgts, calculeInss, calculeIrrf } from "./calculateClt";
import {
  calculeAliquotaFatorR,
  calculeAliquotaSimples,
  calculeDasSimples,
} from "./calculateCnpj";

export type SalarioCltMensal = {
  salarioBruto: number;
  fgts: number;
  salarioBaseIrrf?: number;
  inss: number;
  irrf: number;
  porcentagemInss: number;
  porcentagemIrrf: number;
  salarioLiquido: number;
};

export type SimplesNacionalMensal = {
  faturamentoMensal: number;
  aliquotaEfetiva: number;
  das: number;
  receita: number;
  proLabore: SalarioCltMensal;
};

type FormData = {
  salarioBrutoMensal: string;
  numDependentes: string;
  totalBeneficios: string;
  totalDescontos: string;
  faturamentoMensal: string;
  despesas: string;
  proLabore: string;
};

function clt({
  salarioBrutoMensal,
  numDependentes,
  totalBeneficios,
  totalDescontos,
}: FormData): SalarioCltMensal {
  const salarioBruto = parseFloat(salarioBrutoMensal);
  const qtdeDependentes = parseInt(numDependentes) || 0;
  const fgts = calculeFgts(salarioBruto);
  const inss = calculeInss(salarioBruto);
  const irrf = calculeIrrf({ salarioBruto, qtdeDependentes });
  const salarioLiquido =
    salarioBruto -
    inss -
    irrf +
    parseFloat(totalBeneficios) -
    parseFloat(totalDescontos);

  return {
    salarioBruto,
    fgts,
    inss,
    irrf,
    porcentagemInss: inss / salarioBruto,
    porcentagemIrrf: irrf / salarioBruto,
    salarioLiquido,
  };
}

function cnpj(formData: FormData): SimplesNacionalMensal {
  const faturamentoMensal = parseFloat(formData.faturamentoMensal);
  const rbt12 = faturamentoMensal * 12;
  const despesas = parseFloat(formData.despesas);
  const aliquotaEfetiva = calculeAliquotaSimples(rbt12);
  const das = calculeDasSimples(faturamentoMensal, aliquotaEfetiva);
  const salarioProLabore = clt({
    ...formData,
    salarioBrutoMensal: "1420",
    totalBeneficios: "0",
    totalDescontos: "0",
  });

  return {
    faturamentoMensal,
    aliquotaEfetiva,
    das,
    proLabore: salarioProLabore,
    receita: faturamentoMensal - das - despesas,
  } as SimplesNacionalMensal;
}

export { clt, cnpj };
