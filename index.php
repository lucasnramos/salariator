<?php
include 'calculation.php';

$fgts_mensal = 0;
$inss_calc = 0;
$irrf_calc = 0;
$perc_efetiva_inss = 0;
$perc_efetiva_irrf = 0;
$sal_base_ir = 0;

if (isset($_POST['submit'])) {
  $sal_bruto = htmlspecialchars($_POST['sal_bruto']);
  $dependentes = htmlspecialchars($_POST['dependentes']);
  $outros_descontos = htmlspecialchars($_POST['outros_descontos']);
  $outros_beneficios = htmlspecialchars($_POST['outros_beneficios']);
  $faturamento_mensal = htmlspecialchars($_POST['faturamento_mensal']);
  $pro_labore = htmlspecialchars($_POST['pro_labore']);
  if ($_POST['rtb12'] == '') {
    $rtb12 = $faturamento_mensal * 12;
  } else {
    $rtb12 = htmlspecialchars($_POST['rtb12']);
  }

  // PF
  $inss_calc = calc_inss($sal_bruto);
  $sal_base_ir = $sal_bruto - $inss_calc - (189.59 * $dependentes);
  $irrf_calc = calc_irrf($sal_base_ir);
  $fgts_mensal = $sal_bruto * 0.08;
  $sal_liquido = $sal_bruto - $inss_calc - $irrf_calc - $outros_descontos  + $outros_beneficios;
  $perc_efetiva_inss = $inss_calc / $sal_bruto * 100;
  $perc_efetiva_irrf = $irrf_calc / $sal_bruto * 100;

  // PJ
  $aliquota_efetiva = calc_aliquota_simples($rtb12);
  $das_simples = calc_das_simples($faturamento_mensal, $aliquota_efetiva);
  $receita = $faturamento_mensal - $das_simples - $pro_labore;
  $inss_pro_labore = calc_inss($pro_labore);
  $base_ir_pro_labore = $pro_labore - $inss_pro_labore - (189.59 * $dependentes);
  $irrf_pro_labore = calc_irrf($base_ir_pro_labore);
  $sal_socio = $pro_labore - $inss_pro_labore - $irrf_pro_labore;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    .tables {
      display: flex;
      justify-content: space-evenly;
      margin: 0 1em;
    }

    .d-row {
      display: flex;
      justify-content: space-between;
      margin: 0 1em;
    }
  </style>
  <title>Salariator - Calcule diferença entre CLT e CNPJ</title>
</head>

<body>
  <h1>Software em ALPHA</h1>
  <div class="tables">
    <div class="tables__item">
      <h2>Tabela 2022 IRRF</h2>
      <table>
        <tr>
          <th>Base de Cálculo</th>
          <th>Alíquota</th>
          <th>Dedução</th>
        </tr>
        <tr>
          <td> Até R$ 1.903,98 </td>
          <td>Isento</td>
          <td>-</td>
        </tr>
        <tr>
          <td> De R$ 1.903,99 até R$ 2.826,65 </td>
          <td>7,5%</td>
          <td>R$ 142,80</td>
        </tr>
        <tr>
          <td>De R$ 2.826,66 até R$ 3.751,05</td>
          <td>15%</td>
          <td>R$ 354,80</td>
        </tr>
        <tr>
          <td>De 3.751,06 até 4.664,68</td>
          <td>22,50%</td>
          <td>636,13</td>
        </tr>
        <tr>
          <td>A partir de 4.664,68</td>
          <td>27,50%</td>
          <td>869,36</td>
        </tr>
      </table>
    </div>
    <div class="tables__item">
      <h2>Tabela 2022 INSS</h2>
      <table>
        <tr>
          <th>Base de Cálculo</th>
          <th>Alíquota</th>
        </tr>
        <tr>
          <td>Até R$ 1.212,00</td>
          <td>7,5%</td>
        </tr>
        <tr>
          <td>De R$ 1.212,01 até R$ 2.427,35</td>
          <td>9%</td>
        </tr>
        <tr>
          <td>De R$ 2.427,36 até R$ 3.641,03</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>De R$ 3.641,04 até R$ 7.087,22</td>
          <td>14%</td>
        </tr>
      </table>
    </div>
    <div class="tables__item">
      <h2>Tabela Simples Anexo V</h2>
      <table>
        <tr>
          <th>Base de Cálculo</th>
          <th>Alíquota</th>
          <th>Dedução</th>
        </tr>
        <tr>
          <td>Até 180.000,00</td>
          <td>15,5%</td>
          <td>-</td>
        </tr>
        <tr>
          <td>De 180.000,01 a 360.000,00</td>
          <td>18,00%</td>
          <td>4.500,00</td>
        </tr>
        <tr>
          <td>De 360.000,01 a 720.000,00</td>
          <td>19,50%</td>
          <td>9.900,00</td>
        </tr>
        <tr>
          <td>De 720.000,01 a 1.800.000,00</td>
          <td>20,50%</td>
          <td>17.100,00</td>
        </tr>
        <tr>
          <td>De 1.800.000,01 a 3.600.000,00</td>
          <td>23,00%</td>
          <td>62.100,00</td>
        </tr>
        <tr>
          <td>De 3.600.000,01 a 4.800.000,00</td>
          <td>30,50%</td>
          <td>540.000,00</td>
        </tr>
      </table>
    </div>
  </div>

  <hr>


  <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="post">
    <h2>Dados CLT</h2>
    <label for="sal_bruto">Salário bruto mensal</label>
    <input type="text" name="sal_bruto" />

    <label for="dependentes">Num. Dependentes</label>
    <input type="text" name="dependentes" />

    <label for="outros_beneficios">Outros Benefícios</label>
    <input type="text" name="outros_beneficios" />

    <label for="outros_descontos">Outros Descontos</label>
    <input type="text" name="outros_descontos" />

    <h2>Dados PJ</h2>
    <label for="faturamento_mensal">Faturamento do último mês</label>
    <input type="text" name="faturamento_mensal" />

    <label for="rtb12">Receita Bruta dos últimos 12 meses (RTB12)</label>
    <input type="text" name="rtb12" />
    <p>Caso seja empresa nova, coloque o mesmo valor do Faturamento Mensal</p>

    <label for="pro_labore">Pro-labore</label>
    <input type="text" name="pro_labore" />

    <input type="submit" name="submit" value="Calcular">
  </form>

  <div class="d-row">
    <div>
      <h3>Resultados CLT</h3>
      <p>Salário Bruto Mensal: <?= $sal_bruto ?></p>
      <p>Base IR: <?= $sal_base_ir ?></p>
      <p>INSS Calculado: <?= $inss_calc ?></p>
      <p>IRRF Calculado: <?= $irrf_calc ?></p>
      <p>Aliquota efetiva do INSS: <?= $perc_efetiva_inss ?> %</p>
      <p>Aliquota efetiva do IRRF: <?= $perc_efetiva_irrf ?> %</p>
      <p>FGTS Mensal: <?= $fgts_mensal ?></p>
      <p>Salário Mensal Líquido: <?= $sal_liquido ?></p>
      <p>Salário Mensal Líquido + FGTS: <?= $sal_liquido + $fgts_mensal ?></p>
    </div>
    <div>
      <h3>Resultados Simples - Anexo V sem Fator R</h3>
      <p>Faturamento Mensal: <?= $faturamento_mensal ?></p>
      <p>Alíquota Efetiva para o Mês: <?= $aliquota_efetiva * 100 ?> %</p>
      <p>Valor DAS: <?= $das_simples ?></p>
      <p>Receita: <?= $receita ?></p>

      <p>Pro-labore: <?= $pro_labore ?></p>
      <p>INSS: <?= $inss_pro_labore ?></p>
      <p>IRRF: <?= $irrf_pro_labore ?></p>
      <p>Salario Liquido: <?= $sal_socio ?></p>
      <p>Receita Real: <?= $receita + $sal_socio ?></p>
    </div>
  </div>

  ISS e COFINS não paga para quem exporta serviços
</body>

</html>