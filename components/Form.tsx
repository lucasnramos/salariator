import React, { FormEvent } from "react";
import FormInput, { FormInputProps } from "./FormInput";

type FormProps = {
	handleSubmit: (event: any) => void
}

function Form({ handleSubmit }: FormProps) {
	const cltFormInputs: FormInputProps[] = [
		{
			name: "salarioBrutoMensal",
			label: "Salario bruto",
			required: true
		},
		{
			name: "numDependentes",
			label: "Num. Dependentes",
			required: true
		},
		{
			name: "totalBeneficios",
			label: "Outros Benefícios",
			required: true
		},
		{
			name: "totalDescontos",
			label: "Outros Descontos",
			required: true
		},
	];

	const cnpjFormInputs: FormInputProps[] = [
		{
			name: "faturamentoMensal",
			label: "Faturamento do último mês",
			required: true
		},
		{
			name: "rtb12",
			label: "Receita Bruta dos últimos 12 meses (RTB12)",
			required: true
		},
		{
			name: "usarFatorR",
			label: "Utilizar Fator R",
			type: "checkbox",
		},
		{
			name: "proLabore",
			label: "Pro-labore",
			required: true
		},
	];

	return (
		<form className="my-5" onSubmit={handleSubmit}>
			<div className="flex">
				<div className='mr-4 flex-grow'>
					<h2 className="mt-6 mb-4">Dados CLT</h2>
					{cltFormInputs.map((input, index) => (
						<FormInput key={index} {...input} />
					))}
				</div>
				<div className='ml-4'>
					<h2 className="mt-6 mb-4">Dados PJ</h2>
					{cnpjFormInputs.map((input, index) => (
						<FormInput key={index} {...input} />
					))}
				</div>
			</div>

			<input
				type="submit"
				name="submit"
				value="Calcular"
				className="text-center px-4 py-2 font-semibold text-medium bg-sky-500 text-white rounded-full shadow-sm"
			/>
		</form>
	);
}

export default Form;
