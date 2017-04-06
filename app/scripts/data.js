$(document).ready(function(){
	
	var SCHOOLS = new Array;
	
	// $.ajax({
		// url: "../json/data.json",
		// contentType: "application/json; charset=utf-8",
		// dataType: 'json',
		// success: function(data){
			// SCHOOLS.push(data)
		// },
		// error: function() {
			// console.log('There was an error loading the data.');
		// }
    // });
	
	$.getJSON("../json/data.json", function (data){
		console.log(data);
		$.each( data, function( key, val ) {
			$("#SchoolTable").append(
				"<div class='school'><h2 class='name'>"+data[key].name+"</h2><p><span class='type'>Type: "+data[key].type+"</span><br/><span class='address'>Address: "+data[key].address+"</span><br/><span class='city'>City: "+data[key].city+"</span><br/><span class='zipcode'>Zipcode: "+data[key].zipcode+"</span><br/><span class='phone'>Phone: "+data[key].phone+"</span></p></div>"
			)
		});
	})
	

	console.log(SCHOOLS);
	

	
});