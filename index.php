<?php

if(isset($_POST['submit'])) {
  $sal_bruto = htmlspecialchars($_POST['sal_bruto']);
  $deps = htmlspecialchars($_POST['dependentes']);

  // In a very stupid way
  $inss1 = 1212.00;
  $inss2 = 2427.35;
  $inss3 = 3641.03;
  $inss4 = 7087.22;

  $inss_bracket_1 = $inss1 * 0.075;
  $inss_bracket_2 = $inss2 * 0.09;
  $inss_bracket_3 = $inss3 * 0.12;
  $inss_bracket_4 = $inss4 * 0.14;
  $inss_ceiling = $inss_bracket_4 + $inss_bracket_3 + $inss_bracket_2 + $inss_bracket_1;

  $irrf1 = 1903.98 ;
  $irrf2 = 2826.65;
  $irrf3 = 3751.05;
  $irrf4 = 4664.68;

  $inss_calc = 0;
  $irrf_calc = 0;
  $sal_base_ir = 0;

  if ($sal_bruto > $inss4) {
    $inss_calc = $inss_ceiling;
  } else {
    if ($sal_bruto <= $inss1) {
      $inss_calc = $sal_bruto * 0.075;
    } else if ($sal_bruto <= $inss2) {
      $inss_calc = (($sal_bruto - $inss1) * 0.09) + $inss_bracket_1;
    } else if ($sal_bruto <= $inss3) {
      $inss_calc = (($sal_bruto - $inss2) * 0.12) + $inss_bracket_1 + $inss_bracket_2;
    } else if ($sal_bruto <= $inss4) {
      $inss_calc = (($sal_bruto-$inss3) * 0.14) + $inss_bracket_1 + $inss_bracket_2+ $inss_bracket_3;
    }
  }

  $sal_base_ir = $sal_bruto - $inss_calc;

  if ($sal_base_ir <= $irrf1) {
    $irrf_calc = 0;
  } else if ($sal_base_ir <= $irrf2) {
    $irrf_calc = ($sal_base_ir * 0.75) - 142.8;
  } else if ($sal_base_ir <= $irrf3) {
    $irrf_calc = ($sal_base_ir * 0.15) - 354.80;
  } else if ($sal_base_ir <= $irrf4) {
    $irrf_calc = ($sal_base_ir * 0.225) - 636.13;
  } else if ($sal_base_ir > $irrf4) {
    $irrf_calc = ($sal_base_ir * 0.275) - 869.36;
  }

  echo "INSS" . $inss_calc;
  echo "IRRF" . $irrf_calc;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Salariator - Calcule diferença entre CLT e CNPJ</title>
</head>
<body>
  <h1>Software em ALPHA. Não está pronto para uso</h1>

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
  <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
    <label for="sal_bruto"/>Salário bruto mensal</label>
    <input type="text" name="sal_bruto" />

    <label for="dependentes"/>Num. Dependentes</label>
    <input type="text" name="dependentes" />

    <input type="submit" name="submit" value="Calcular">
  </form>
  <p>Salário Bruto Mensal: <?= $sal_bruto ?></p>
  <p>Base IR: <?= $sal_base_ir ?></p>
  <p>INSS Calculado: <?= $inss_calc ?></p>
  <p>IRRF Calculado: <?= $irrf_calc ?></p>
</body>
</html>
