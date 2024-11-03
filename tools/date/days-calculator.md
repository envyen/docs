---
layout: default
parent: date
grand_parent: tools
title: "days calculator"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
---

# Days Calculator

Select `start` and `end` dates:

<form>
<input type="date" id="firstDate" name="firstDate"/>
<input type="date" id="secondDate" name="secondDate"/>
</form>

Difference is:
<div class="label label-green" id="datediff"> 0 Days </div>

<script>

$( function() {
    $( "#date1" ).datepicker({
      autoSize: true,
      changeMonth: true,
      changeYear: true
    });
     $( "#date2" ).datepicker({
      autoSize: true,
      changeMonth: true,
      changeYear: true
    });
  } );


$('#firstDate').change(function() {
    datediff();
});

$('#secondDate').change(function() {
    datediff();
});

function datediff(){
    var start= new Date($("#secondDate").val());
    var end= new Date($("#firstDate").val());

    var days= (start.getTime()-end.getTime())/ (24 * 60 * 60 * 1000);
    if (!isNaN(days)){
	console.log(days, 'days');
	$('#datediff').text(days + " Days ");
    }
}

</script>

