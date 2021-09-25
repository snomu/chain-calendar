$(document).ready(function(){

// ------------------------
// MAIN
// ------------------------
updateLabels();
updateCalendar();
setHooks();

// ------------------------
// FUNCTIONS
// ------------------------
function setHooks(){
  $("input,select,textarea").change(function () {
    updateCalendar();
    updateStyle();
  });

  $("#download").click(function() {
    generatePDF("print_container");
  });
}

function updateStyle(){
  var box_style = $("#box_style").val();
  switch (box_style) {
  case 'Squares':
    $(".day").css("border-color", "#666666");
    break;
  case 'Borderless':
    $(".day").css("border-color", "white");
    break;
  }
}

function updateLabels(){
  var label_arr = [ ["Jan", 1], ["Feb", 5], ["Mar", 9], ["Apr", 14], ["May", 18], ["Jun", 22], ["Jul", 28], ["Aug", 32], ["Sep", 36], ["Oct", 41], ["Nov", 45], ["Dec", 49] ];
  for (let i = 0; i < label_arr.length; i++) {
    $("#labelBox_"+label_arr[i][1]).html( label_arr[i][0] );
  }
}

function updateCalendar(){
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var day_arr = [];
  var year = $("#year").val();
  var start_day = $("#start_day").val();

  // Populate array with days in year
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){ // leap year
    days_in_month[1] = 29;
  }
  days_in_month.forEach((value, key) => {
    for (let day = 1; day <= value; day++) {
      day_arr.push(day);
    }
  });

  // Prepend blank days based on what day of the week Jan 1 is
  var dt = new Date(year+'-1-1');
  var start_pos = dt.getDay() - start_day;
  if( start_pos < 0 ){
    start_pos += 7;
  }
  for (let i = 0; i < start_pos; i++){
    day_arr.unshift("");
  }

  // Render on page
  $("#title").html( year );
  $(".day").html(""); // clear old
  $(".day").each(function(index, value){
    $(this).html( day_arr[index] );
  });
}

function generatePDF(print_container) {
  var file_name = "ChainCalendar-"+$("#year").val()+"-"+$("#box_style").val()+".pdf";
  // var printContent = document.getElementById(print_container).innerHTML;
  var printContent = $("#print_container").html();
  var opt = {
      filename:     file_name,
      margin:       10,
      // html2canvas:  { dpi: 300, letterRendering: true, width: 986, height: 1276},
      jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' },
      // pagebreak:    { mode: ['avoid-all', 'css'] }
  };
  html2pdf().from(printContent).set(opt).save();
}

});