---
layout: default
parent: date
grand_parent: tools
title: "days since birth"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
---

# Days since birth

Enter your birthday:

<form>
<input type="date" id="birthDate" name="birthDate"/>
</form>

This is your:
<div class="label label-green" id="datediff"> </div>

<script>

$('#birthDate').change(function() {
    datediff();
});

function datediff(){
    var start= new Date($("#birthDate").val());
    var end= new Date();

    var days= Math.floor((end.getTime()-start.getTime())/ (24 * 60 * 60 * 1000));
    if (!isNaN(days) && (days>0)){
	console.log(days, 'days');
	$('#datediff').text(days + " th day !");
    }else{
	$('#datediff').text("select birthday");
    }
}

</script>

