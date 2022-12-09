import React, { FormEvent } from 'react'
import FormInput, { FormInputProps } from './FormInput'

function Form() {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log('event', event)
	}

	const cltFormInputs: FormInputProps[] = [{
		name: 'sal_bruto_mensal',
		label: 'Salario bruto'
	}, {
		name: 'num_dependentes',
		label: 'Num. Dependentes'
	}, {
		name: 'outros_beneficios',
		label: 'Outros Benefícios'
	}, {
		name: 'outros_descontos',
		label: 'Outros Descontos'
	}]

	const cnpjFormInputs: FormInputProps[] = [
		{
			name: "faturamento_mensal",
			label: "Faturamento do último mês"
		},
		{
			name: "rtb12",
			label: "Receita Bruta dos últimos 12 meses (RTB12)"
		},
		{
			name: "usar_fator_r",
			label: "Utilizar Fator R",
			type: "checkbox"
		},
		{
			name: "pro_labore",
			label: "Pro-labore",
		},
	]


	return (
		<form onSubmit={handleSubmit} className="my-5">
			<h2 className='mt-6 mb-4'>Dados CLT</h2>
			{
				cltFormInputs.map((input) => <FormInput name={input.name} label={input.label} type={input.type} />)
			}

			<h2 className='mt-6 mb-4'>Dados PJ</h2>
			{
				cnpjFormInputs.map((input) => <FormInput name={input.name} label={input.label} type={input.type} />)
			}

			<input type="submit" name="submit" value="Calcular" className='block px-4 py-2 font-semibold text-medium bg-sky-500 text-white rounded-full shadow-sm' />
		</form>
	)
}

export default Form
