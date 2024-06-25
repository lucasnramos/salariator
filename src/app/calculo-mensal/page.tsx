import { api } from "~/trpc/server";

export default async function calculoMensal() {
  const {
    salarioBrutoMensal,
    fgts,
    inss,
    irrf,
    salarioLiquido,
    porcentagemInss,
    porcentagemIrrf,
  } = await api.calculoMensal.calculaMensalClt({
    salarioBrutoMensal: 9_797.26,
    numDependentes: 1,
    outrosDescontos: 750,
    outrosProventos: 2000,
  });
  return (
    <>
      <h2>Passando dados - sem form</h2>
      <p>salarioBrutoMensal: {salarioBrutoMensal.toFixed(2)}</p>
      <p>fgts: {fgts.toFixed(2)}</p>
      <p>inss: {inss.toFixed(2)}</p>
      <p>irrf: {irrf.toFixed(2)}</p>
      <p>salarioLiquido: {salarioLiquido.toFixed(2)}</p>
      <p>porcentagemInss: {porcentagemInss.toFixed(2)}</p>
      <p>porcentagemIrrf: {porcentagemIrrf.toFixed(2)}</p>
      <p>aliquota real: {(porcentagemIrrf + porcentagemInss).toFixed(2)}</p>
    </>
  );
}
