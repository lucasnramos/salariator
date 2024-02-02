import React, { useEffect, useState } from "react";
import { formatCurrency, formatPercent } from "../helpers/formatter";
import { cnpj } from "../server/calculation";
import { SalarioCltMensal, SimplesNacionalMensal } from "../models";

type ResultsProps = {
  data: {
    cltCalculado: SalarioCltMensal;
    cnpjCalculado: SimplesNacionalMensal;
  };
};

function Results({ data }: ResultsProps) {
  const { cltCalculado, cnpjCalculado } = data;
  const [isLoading, setIsLoading] = useState(true);
  const [bigger, setBigger] = useState<number | null>();
  const [biggerName, setBiggerName] = useState<string>();

  useEffect(() => {
    let isMounted = true;
    let bigger = 0;

    if (isMounted && !!cltCalculado && !!cnpjCalculado) {
      setIsLoading(false);
      bigger =
        100 *
        Math.abs(
          (cltCalculado.salarioLiquido - cnpjCalculado.receita) /
            ((cltCalculado.salarioLiquido + cnpjCalculado.receita) / 2)
        );
      setBigger(bigger);
      // need to know which is bigger to set the message
      if (cltCalculado.salarioLiquido > cnpjCalculado.receita) {
        setBiggerName("CLT");
      } else {
        setBiggerName("CNPJ");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="flex">
        <div className="flex-grow mr-4">
          <h2>Estimativa Salário CLT</h2>
          <p>Salário bruto: {formatCurrency(cltCalculado?.salarioBruto)}</p>
          <p>Valor do FGTS pago: {formatCurrency(cltCalculado?.fgts)}</p>
          <p>Valor do INSS descontado: {formatCurrency(cltCalculado?.inss)}</p>
          <p>Valor do IRRF pago: {formatCurrency(cltCalculado?.irrf)}</p>
          <p>
            Porcentagem do INSS pago:{" "}
            {formatPercent(cltCalculado?.porcentagemInss)}
          </p>
          <p>
            Porcentagem do IRRF pago:{" "}
            {formatPercent(cltCalculado?.porcentagemIrrf)}
          </p>
          <hr />
          <p>Salário líquido: {formatCurrency(cltCalculado?.salarioLiquido)}</p>
        </div>
        <div className="ml-4">
          <h2>Estimativa Salário CNPJ</h2>
          <p>
            Alíquota efetiva do Simples Nacional:{" "}
            {formatPercent(cnpjCalculado?.aliquotaEfetiva)}
          </p>
          <p>Valor DAS a ser pago: {formatCurrency(cnpjCalculado?.das)}</p>
          <p>
            Faturamento Mensal:{" "}
            {formatCurrency(cnpjCalculado?.faturamentoMensal)}
          </p>
          <h3 className="mt-2">Pro-Labore</h3>
          <ul className=" list-inside list-disc">
            <li>
              Valor bruto:{" "}
              {formatCurrency(cnpjCalculado?.proLabore?.salarioBruto)}
            </li>

            <li>
              Valor do FGTS pago:{" "}
              {formatCurrency(cnpjCalculado?.proLabore?.fgts)}
            </li>
            <li>
              Valor do INSS descontado:{" "}
              {formatCurrency(cnpjCalculado?.proLabore?.inss)}
            </li>
            <li>
              Valor do IRRF pago:{" "}
              {formatCurrency(cnpjCalculado?.proLabore?.irrf)}
            </li>
            <li>
              Alíquota do INSS:{" "}
              {formatPercent(cnpjCalculado?.proLabore?.porcentagemInss)}
            </li>
            <li>
              Alíquota do IRRF:{" "}
              {formatPercent(cnpjCalculado?.proLabore?.porcentagemIrrf)}
            </li>
            <li>
              Valor líquido:{" "}
              {formatCurrency(cnpjCalculado?.proLabore?.salarioLiquido)}
            </li>
          </ul>
          <p></p>
          <hr />
          <p>Receita líquida: {formatCurrency(cnpjCalculado?.receita)}</p>
        </div>
      </div>
      <p>{`Salário ${biggerName} é ${bigger?.toFixed(
        2
      )}% maior. Considerando valores líquidos`}</p>
    </div>
  );
}

export default Results;
