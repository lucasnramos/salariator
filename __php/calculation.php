<?php
function calc_irrf(float $sal_base_ir)
{
	$faixa1 = 1903.98;
	$faixa2 = 2826.65;
	$faixa3 = 3751.05;
	$faixa4 = 4664.68;
	if ($sal_base_ir <= $faixa1) {
		return 0;
	} else if ($sal_base_ir <= $faixa2) {
		return ($sal_base_ir * 0.075) - 142.8;
	} else if ($sal_base_ir <= $faixa3) {
		return ($sal_base_ir * 0.15) - 354.80;
	} else if ($sal_base_ir <= $faixa4) {
		return ($sal_base_ir * 0.225) - 636.13;
	} else if ($sal_base_ir > $faixa4) {
		return ($sal_base_ir * 0.275) - 869.36;
	}
}

function calc_inss(float $sal_bruto)
{
	$faixa1 = 1212.00;
	$faixa2 = 2427.35;
	$faixa3 = 3641.03;
	$faixa4 = 7087.22;
	$teto =  828.39;

	if ($sal_bruto > $faixa4) {
		return $teto;
	} else {
		if ($sal_bruto <= $faixa1) {
			return $sal_bruto * 0.075;
		} else if ($sal_bruto <= $faixa2) {
			return ($sal_bruto * 0.09) - 18.18;
		} else if ($sal_bruto <= $faixa3) {
			return ($sal_bruto * 0.12) - 91;
		} else if ($sal_bruto <= $faixa4) {
			return ($sal_bruto * 0.14) - 163.82;
		}
	}
}

function calc_aliquota_simples_fator_r($rbt12)
{
	$faixa1 = 180000;
	$faixa2 = 360000;
	$faixa3 = 720000;
	$faixa4 = 1800000;
	$faixa5 = 3600000;
	$faixa6 = 4800000;

	if ($rbt12 > $faixa6) {
		echo "Bonitão, sua empresa não se enquadra no Simples Nacional! Volte 2 casas";
	} else if ($rbt12 <= $faixa1) {
		return $rbt12 * 0.06 / $rbt12;
	} else if ($rbt12 <= $faixa2) {
		return ( $rbt12 * 0.112 - 9360 ) / $rbt12;
	} else if ($rbt12 <= $faixa3) {
		return $rbt12 * 0.135 - 17640 / $rbt12;
	} else if ($rbt12 <= $faixa4) {
		return ( $rbt12 * 0.16 - 35640 ) / $rbt12;
	} else if ($rbt12 <= $faixa5) {
		return $rbt12 * 0.21 - 125640 / $rbt12;
	} else if ($rbt12 <= $faixa6) {
		return ( $rbt12 * 0.33 - 648000 ) / $rbt12;
	}
}

function calc_aliquota_simples($rbt12)
{

	$faixa1 = 180000;
	$faixa2 = 360000;
	$faixa3 = 720000;
	$faixa4 = 1800000;
	$faixa5 = 3600000;
	$faixa6 = 4800000;

	if ($rbt12 > $faixa6) {
		echo "Bonitão, sua empresa não se enquadra no Simples Nacional! Volte 2 casas";
	} else if ($rbt12 <= $faixa1) {
		return $rbt12 * 0.155 / $rbt12;
	} else if ($rbt12 <= $faixa2) {
		return ( $rbt12 * 0.18 - 4500 ) / $rbt12;
	} else if ($rbt12 <= $faixa3) {
		return $rbt12 * 0.195 - 9900 / $rbt12;
	} else if ($rbt12 <= $faixa4) {
		return ( $rbt12 * 0.205 - 17100 ) / $rbt12;
	} else if ($rbt12 <= $faixa5) {
		return $rbt12 * 0.23 - 62100 / $rbt12;
	} else if ($rbt12 <= $faixa6) {
		return ( $rbt12 * 0.305 - 540000 ) / $rbt12;
	}
}

function calc_das_simples($faturamento_mensal, $aliquota_efetiva)
{
	return $faturamento_mensal * $aliquota_efetiva;
}
