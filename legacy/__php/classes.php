<?php
require_once 'calculation.php';

class Faixa
{
	protected $aliquota;
	protected $deducao;
	protected $valor_min;
	protected $valor_max;

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
	public $deducao_dependente;
}

class PessoaFisicaMensal
{
	private $salario_bruto;
	private $qtde_dependentes;

	function __construct($salario_bruto, $qtde_dependentes = 0)
	{
		$this->salario_bruto = $salario_bruto;
		$this->qtde_dependentes = $qtde_dependentes;
	}

	public function get_salario_bruto()
	{
		return $this->salario_bruto;
	}

	public function get_valor_inss()
	{
		return calc_inss($this->salario_bruto);
	}

	public function get_valor_irrf()
	{
		$base_irrf = $this->get_salario_base_irrf();
		return calc_irrf($base_irrf);
	}

	public function get_salario_base_irrf()
	{
		return $this->salario_bruto - $this->get_valor_inss() - $this->qtde_dependentes * 189.59;
	}

	public function get_valor_fgts()
	{
		return $this->salario_bruto * 0.08;
	}

	public function get_porcentagem_inss()
	{
		return $this->get_valor_inss() / $this->salario_bruto * 100;
	}

	public function get_porcentagem_irrf()
	{
		return $this->get_valor_irrf() / $this->salario_bruto * 100;
	}

	public function get_salario_liquido()
	{
		return $this->salario_bruto - $this->get_valor_inss() - $this->get_valor_irrf();
	}
}

class PessoaJuridicaMensal
{
	private $faturamento;
	private $rbt12;
	public $pro_labore;
	private $usar_fator_r;

	function __construct($faturamento, $rbt12, $pro_labore)
	{
		$this->faturamento = $faturamento;
		$this->rbt12 = $rbt12;
		$this->pro_labore = new PessoaFisicaMensal($pro_labore);

		if ($this->check_fator_r())
		{
			$this->usar_fator_r = true;
		} else {
			$this->usar_fator_r = false;
		}

		echo "$this->usar_fator_r";
	}

	public function get_faturamento()
	{
		return $this->faturamento;
	}

	public function get_aliquota_efetiva()
	{
		if ($this->usar_fator_r) {
			return calc_aliquota_simples_fator_r($this->rbt12);
		} else {
			return calc_aliquota_simples($this->rbt12);
		}
	}
	public function get_valor_das_simples()
	{
		$aliquota = $this->get_aliquota_efetiva();
		return calc_das_simples($this->faturamento, $aliquota);
	}

	public function get_pro_labore()
	{
		return $this->pro_labore->get_salario_bruto();
	}

	public function get_receita()
	{
		return $this->faturamento - $this->get_valor_das_simples();
	}

	private function check_fator_r()
	{
		return $this->pro_labore->get_salario_bruto() >= $this->faturamento * 0.28;
	}
}
