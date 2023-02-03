import React, { useEffect, useState } from 'react'
import { formatCurrency, formatPercent } from '../helpers/formatter'
import { SalarioCltMensal, SimplesNacionalMensal } from '../server/calculation'

type ResultsProps = {
	data: {
		cltCalculado: SalarioCltMensal,
		cnpjCalculado: SimplesNacionalMensal
	}
}

function Results({ data }: ResultsProps) {
	const { cltCalculado, cnpjCalculado } = data
	const [isLoading, setIsLoading] =	useState(true)

	useEffect(() => {
		let isMounted = true
		console.log('data', data, !!cltCalculado)

		if (isMounted && !!cltCalculado && !!cnpjCalculado) {
			setIsLoading(false)
		}

		return () => {
			isMounted = false
		}
	}, [data])

	if (isLoading) {
		return null
	}

	return (
		<div className='flex'>
			<div className="flex-grow mr-4">
				<h2>Results CLT</h2>
				<p>Salário bruto: {formatCurrency(cltCalculado?.salarioBruto)}</p>
				<p>Salário líquido: {formatCurrency(cltCalculado?.salarioLiquido)}</p>
				<p>Valor do FGTS pago: {formatCurrency(cltCalculado?.fgts)}</p>
				<p>Valor do INSS descontado: {formatCurrency(cltCalculado?.inss)}</p>
				<p>Valor do IRRF pago: {formatCurrency(cltCalculado?.irrf)}</p>
				<p>Porcentagem do INSS pago: {formatPercent(cltCalculado?.porcentagemInss)}</p>
				<p>Porcentagem do IRRF pago: {formatPercent(cltCalculado?.porcentagemIrrf)}</p>
			</div>
			<div className="ml-4">
				<h2>Results CNPJ</h2>
				<p>Alíquota efetiva do Simples Nacional: {formatPercent(cnpjCalculado?.aliquotaEfetiva)}</p>
				<p>Valor DAS a ser pago: {formatCurrency( cnpjCalculado?.das )}</p>
				<p>Faturamento Mensal: {formatCurrency( cnpjCalculado?.faturamentoMensal )}</p>
				<p>Receita liquida: {formatCurrency( cnpjCalculado?.receita )}</p>
				<h3 className="mt-2">Results Pro-Labore</h3>
				<p>Valor bruto: {formatCurrency(cnpjCalculado?.proLabore?.salarioBruto)}</p>
				<p>Valor líquido: {formatCurrency(cnpjCalculado?.proLabore?.salarioLiquido)}</p>
				<p>Valor do FGTS pago: {formatCurrency(cnpjCalculado?.proLabore?.fgts)}</p>
				<p>Valor do INSS descontado: {formatCurrency(cnpjCalculado?.proLabore?.inss)}</p>
				<p>Valor do IRRF pago: {formatCurrency(cnpjCalculado?.proLabore?.irrf)}</p>
				<p>Porcentagem do INSS pago: {formatPercent(cnpjCalculado?.proLabore?.porcentagemInss)}</p>
				<p>Porcentagem do IRRF pago: {formatPercent(cnpjCalculado?.proLabore?.porcentagemIrrf)}</p>
			</div>
		</div>
	)
}

export default Results
