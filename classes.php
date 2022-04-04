<?php
class Faixa
{
	protected float $aliquota;
	protected float $deducao;
	protected float $valor_min;
	protected float $valor_max;

	function __construct($aliquota, $deducao, $valor_min, $valor_max)
	{
		$this->aliquota = $aliquota;
	}
}

class FaixaIrrf extends Faixa
{
	public int $dependentes;
}

class FaixaInss extends Faixa
{
	public function calc_inss()
	{
	}
}
