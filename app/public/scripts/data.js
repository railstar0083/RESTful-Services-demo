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
	
	function selectSchool() {
		
	}
	
	$.getJSON("../json/data.json", function (data){
		console.log(data);
		$.each( data, function( key, val ) {
			$("#SchoolTable").append(
				"<div class='school'><h2 class='name'>"+data[key].name+"</h2><p><span class='type'>Type: "+data[key].type+"</span><br/><span class='address'>Address: "+data[key].address+"</span><br/><span class='city'>City: "+data[key].city+"</span><br/><span class='zipcode'>Zipcode: "+data[key].zipcode+"</span><br/><span class='phone'>Phone: "+data[key].phone+"</span></p></div>"
			)
			
			
		});
	})
	
	$("#SchoolTable").on("click", ".name", function(){
		let tag = $(this);
		tag.parent(".school").toggleClass("selected");
	});
	
	$("#SchoolTable").on("click", ".selected", function(){
		let tag = $(this);
		tag.removeClass("selected");
	});
	
	$("#add_new_school").on("click", function(){
		//Add new form switch
		$(".new-school").show();
		$(".delete-school").hide();
		$(".edit-school").hide;
	});
	
	$("#delete_school").on("click", function(){
		//Delete school switch
		$(".new-school").hide();
		$(".delete-school").show();
		$(".edit-school").hide;
	});
	
	$("#edit_school").on("click", function(){
		//Edit school switch
		$(".new-school").hide();
		$(".delete-school").hide();
		$(".edit-school").show;
	});
	
	console.log(SCHOOLS);
	

	
});