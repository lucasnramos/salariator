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
		$this->deducao = $deducao;
		$this->valor_min = $valor_min;
		$this->valor_max = $valor_max;
	}

	function get_salario_calculado(float $sal_bruto)
	{
		return ($sal_bruto * $this->aliquota) - $this->deducao;
	}
}

class FaixaIrrf extends Faixa
{
	public float $deducao_dependente;

	public function calcuar_irrf(float $sal_base)
	{
		$sal_calculo = $this->get_sal_base_irrf($sal_base);
		return $this->get_salario_calculado($sal_calculo);
	}

	private function get_sal_base_irrf(float $sal_base)
	{
		return $sal_base - $this->dependentes * $this->deducao_dependente;
	}
}

class FaixaInss extends Faixa
{
	public function calc_inss($sal_bruto)
	{
		return ($sal_bruto * $this->aliquota) - $this->deducao;
	}
}

class Salario
{
	public int $dependentes;
	public float $valor_bruto;
	public float $valor_liquido;
	public float $beneficios;
	public float $descontos;
	public float $dedutiveis;
}

