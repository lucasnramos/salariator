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
  rbt12: string;
  usarFatorR?: string;
  proLabore: string;
};

function clt({
  salarioBrutoMensal,
  numDependentes,
  totalBeneficios,
  totalDescontos,
}: FormData): SalarioCltMensal {
  const salarioBruto = parseFloat(salarioBrutoMensal);
  const qtdeDependentes = parseInt(numDependentes);
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
  console.log("formdata?", formData);
  const faturamentoMensal = parseFloat(formData.faturamentoMensal);
  const rbt12 = parseFloat(formData.rbt12);
  const despesas = parseFloat(formData.despesas);
  const aliquotaEfetiva = calculeAliquotaSimples(rbt12);
  const das = calculeDasSimples(faturamentoMensal, aliquotaEfetiva);

  return {
    faturamentoMensal,
    aliquotaEfetiva,
    das,
    proLabore: clt({
      ...formData,
      salarioBrutoMensal: formData.proLabore,
      totalBeneficios: "0",
      totalDescontos: "0"
    }),
    receita: faturamentoMensal - das - despesas,
  } as SimplesNacionalMensal;
}

export { clt, cnpj };
