<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Chain Calendar</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
  <script src='lib/html2pdf.bundle.min.js'></script>
  <script src="script.js"></script>

  <div id="header">
    <h1>Chain Calendar Generator</h1>
    <label for="year">Year:</label>
    <input type="number" id="year" name="year" min="1" max="9999" value="2021">

    <label for="start_day">Week starts on:</label>
    <select name="start_day" id="start_day">
      <option value="0">Sunday</option>
      <option value="1">Monday</option>
      <option value="2">Tuesday</option>
      <option value="3">Wednesday</option>
      <option value="4">Thursday</option>
      <option value="5">Friday</option>
      <option value="6">Saturday</option>
    </select>

    <label for="box_style">Style:</label>
    <select name="box_style" id="box_style">
      <option value="Squares">Squares</option>
      <option value="Borderless">Borderless</option>
    </select>

    <button id="download">Download</button>
  </div>

  <div id='print_container'>
  <h1 id='title'>_</h1>
<?php
// ------------------------
// GENERATE TABLES
// ------------------------
$label_id = 1;
$day_id = 1;

generateTable("label", "1", "1", "27");
generateTable("day",   "1", "7", "27");
generateTable("label", "2", "1", "27");
generateTable("day",   "2", "7", "27");

function generateTable($type, $number, $cols, $rows){
  global $label_id, $day_id;
  echo "<table id='".$type."s_".$number."' class='".$type."s'>\n";
  for ($i = 0; $i < $rows; $i++) {
    echo "\t<tr>";
    for ($j = 0; $j < $cols; $j++) {
      $id_var = $type."_id";
      echo "<td id='".$type."Box_".$$id_var."' class='".$type."'></td>";
      $$id_var++;
    }
    echo "</tr>\n";
  }
  echo "</table>";
}
?>
</div>
</body>
</html>