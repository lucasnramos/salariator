import React, { FormEvent } from "react";
import FormInput, { FormInputProps } from "./FormInput";

function Form() {
  const cltFormInputs: FormInputProps[] = [
    {
      name: "salarioBrutoMensal",
      label: "Salario bruto",
    },
    {
      name: "numDependentes",
      label: "Num. Dependentes",
    },
    {
      name: "totalBeneficios",
      label: "Outros Benefícios",
    },
    {
      name: "totalDescontos",
      label: "Outros Descontos",
    },
  ];

  const cnpjFormInputs: FormInputProps[] = [
    {
      name: "faturamentoMensal",
      label: "Faturamento do último mês",
    },
    {
      name: "rtb12",
      label: "Receita Bruta dos últimos 12 meses (RTB12)",
    },
    {
      name: "usarFatorR",
      label: "Utilizar Fator R",
      type: "checkbox",
    },
    {
      name: "proLabore",
      label: "Pro-labore",
    },
  ];

  return (
    <form className="my-5" action="/api/form" method="post">
      <h2 className="mt-6 mb-4">Dados CLT</h2>
      {cltFormInputs.map((input, index) => (
        <FormInput key={index} {...input} />
      ))}

      <h2 className="mt-6 mb-4">Dados PJ</h2>
      {cnpjFormInputs.map((input, index) => (
        <FormInput key={index} {...input} />
      ))}

      <input
        type="submit"
        name="submit"
        value="Calcular"
        className="block px-4 py-2 font-semibold text-medium bg-sky-500 text-white rounded-full shadow-sm"
      />
    </form>
  );
}

export default Form;
