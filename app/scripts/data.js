$(document).ready(function(){
	
	var SCHOOLS = new Array;
	
	$.ajax({
		url: "../json/data.json",
		dataType: 'json',
		success: function(data){
			SCHOOLS.push(data)
		},
		error: function() {
			console.log('There was an error loading the data.');
		}
    });
	

	console.log(SCHOOLS);
	
	
	for (i = 0; i <= SCHOOLS.length; i++){
		$("#SchoolTable").append(
			"<div class='school'><h2 class='name'>Name</h2><p><span class='type'>Type</span><br/><span class='address'>Address</span><br/><span class='city'>City</span><br/><span class='zipcode'>Zipcode</span><br/><span class='phone'>Phone</span></p></div>"
		)
	}
    
	
	
	
});