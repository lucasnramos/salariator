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
		return ($sal_base_ir * 0.75) - 142.8;
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

	return $teto;
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

