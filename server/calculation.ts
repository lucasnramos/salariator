import { calculeFgts, calculeInss, calculeIrrf } from "./calculateClt";
import {
  calculeAliquotaFatorR,
  calculeAliquotaSimples,
  calculeDasSimples,
} from "./calculateCnpj";
import { SalarioCltMensal, FormData, SimplesNacionalMensal } from "../models";

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
  const porcentagemInss = inss / salarioBruto;
  const porcentagemIrrf = irrf / salarioBruto;

  return {
    salarioBruto: +salarioBruto.toFixed(2),
    fgts: +fgts.toFixed(2),
    inss: +inss.toFixed(2),
    irrf: +irrf.toFixed(2),
    salarioLiquido: +salarioLiquido.toFixed(2),
    porcentagemInss: +porcentagemInss.toFixed(2),
    porcentagemIrrf: +porcentagemIrrf.toFixed(2),
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
    faturamentoMensal: +faturamentoMensal.toFixed(2),
    aliquotaEfetiva: +aliquotaEfetiva.toFixed(2),
    das: +das.toFixed(2),
    proLabore: salarioProLabore,
    receita: +(faturamentoMensal - das - despesas).toFixed(2),
  } as SimplesNacionalMensal;
}

function cnpjAnual(simplesMensal: SimplesNacionalMensal) {
  const { faturamentoMensal, proLabore, receita } = simplesMensal;
  const faturamentoAnual = faturamentoMensal * 12;
  const proLaboreAnual = proLabore.salarioLiquido * 12; // TODO: implement the clt anual function and use it here
  const receitaAnual = receita * 12;

  return {
    faturamentoAnual,
    proLaboreAnual,
    receitaAnual,
  };
}

function cltAnual(salarioMensal: SalarioCltMensal) {
  const { salarioBruto, fgts, salarioLiquido } = salarioMensal;
  const salarioAnual = salarioBruto * 12;
  const fgtsAnual = fgts * 12;
  const adicionalFerias = salarioBruto / 3; // TODO: is this non-taxable?
  const salarioLiquidoAnual = salarioLiquido * 13 + fgtsAnual + adicionalFerias;

  return {
    salarioAnual,
    fgtsAnual,
    adicionalFerias,
    salarioLiquidoAnual,
  };
}

export { clt, cnpj, cnpjAnual, cltAnual };
