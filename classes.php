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
}

class FaixaIrrf extends Faixa
{
	public float $deducao_dependente;
}

class PessoaFisicaMensal
{
	public $valor_inss;
	public $valor_fgts;
	public $valor_irrf;
	public $porcentagem_inss;
	public $porcentagem_irrf;
	public $salario_bruto;
	public $salario_base_irrf;
	public $salario_liquido;
}

class PessoaJuridicaMensal
{
	public $faturamento;
	public $rtb12;
	public $aliquota_efetiva;
	public $valor_das_simples;
	public $pro_labore;

	function __construct()
	{
		$this->pro_labore = new PessoaFisicaMensal();
	}
}
