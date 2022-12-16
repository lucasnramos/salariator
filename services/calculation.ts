import { calculeFgts, calculeInss, calculeIrrf } from "./calculateClt";
import {
  calculeAliquotaFatorR,
  calculeAliquotaSimples,
  calculeDasSimples,
} from "./calculateCnpj";

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

type CltFormData = {
  salarioBrutoMensal: string;
  numDependentes: string;
  totalBeneficios: string;
  totalDescontos: string;
};

type CnpjFormData = {
  faturamentoMensal: string;
  rtb12: string;
  usarFatorR: string;
  proLabore: CltFormData;
};

function clt({
  salarioBrutoMensal,
  numDependentes,
  totalBeneficios,
  totalDescontos,
}: CltFormData): SalarioCltMensal {
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
    porcentagemInss: (irrf / salarioBruto) * 100,
    porcentagemIrrf: (inss / salarioBruto) * 100,
    salarioLiquido,
  };
}

function cnpj(formData: CnpjFormData): SimplesNacionalMensal {
  const { usarFatorR } = formData;
  const faturamentoMensal = parseFloat(formData.faturamentoMensal);
  const rtb12 = parseFloat(formData.rtb12);
  const aliquotaEfetiva = usarFatorR
    ? calculeAliquotaFatorR(rtb12)
    : calculeAliquotaSimples(rtb12);

  return {
    faturamentoMensal,
    aliquotaEfetiva,
    das: calculeDasSimples(faturamentoMensal, aliquotaEfetiva),
    proLabore: clt(formData.proLabore),
  } as SimplesNacionalMensal;
}

export { clt, cnpj };
