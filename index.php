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

  // In a very stupid way
  $inss_calc = calc_inss($sal_bruto);
  $sal_base_ir = $sal_bruto - $inss_calc - (189.59 * $dependentes);
  $irrf_calc = calc_irrf($sal_base_ir);
  $fgts_mensal = $sal_bruto * 0.08;
  $sal_liquido = $sal_bruto - $outros_descontos - $inss_calc + $outros_beneficios;

  $perc_efetiva_inss = $inss_calc / $sal_bruto * 100;
  $perc_efetiva_irrf = $irrf_calc / $sal_bruto * 100;
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
  </div>

  <hr>

  <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="post">
    <label for="sal_bruto">Salário bruto mensal</label>
    <input type="text" name="sal_bruto" />

    <label for="dependentes">Num. Dependentes</label>
    <input type="text" name="dependentes" />

    <label for="outros_beneficios">Outros Benefícios</label>
    <input type="text" name="outros_beneficios" />

    <label for="outros_descontos">Outros Descontos</label>
    <input type="text" name="outros_descontos" />

    <label for="dedutiveis">Dedutiveis</label>
    <input type="text" name="dedutiveis" />

    <input type="submit" name="submit" value="Calcular">
  </form>

  <p>Salário Bruto Mensal: <?= $sal_bruto ?></p>
  <p>Base IR: <?= $sal_base_ir ?></p>

  <p>INSS Calculado: <?= $inss_calc ?></p>
  <p>IRRF Calculado: <?= $irrf_calc ?></p>

  <p>Aliquota efetiva do INSS: <?= $perc_efetiva_inss ?> %</p>
  <p>Aliquota efetiva do IRRF: <?= $perc_efetiva_irrf ?> %</p>
  <p>FGTS Mensal: <?= $fgts_mensal ?></p>
  <p>Salário Mensal Líquido: <?= $sal_liquido ?></p>
</body>

</html>
