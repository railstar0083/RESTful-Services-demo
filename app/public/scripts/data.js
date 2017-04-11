$(document).ready(function(){
	
	
	
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
		var SCHOOLS = new Array;
		$(".edit-school-forms").empty();
		let numberSelected = 0;
		numberSelected = $(".selected").length;
		$(".selected").each(function(){
			let id = $(this).attr("id");
			SCHOOLS.push(id);
		})
		console.log(SCHOOLS);
		let i=0;
		while(i < numberSelected)
		{
			$(".edit-school-forms").append(
				"<div class='form-wrapper' id='"+SCHOOLS[i]+"'><form method='post' action='/edit_school'><label>School Name</label><input type='text' name='school[name]' class='new-input name-input' /><label>Type</label><input type='text' name='school[type]' class='new-input type-input' placeholder='(ex. High School)'/><label>Address</label><input type='text' name='school[address]' class='new-input address-input' placeholder='(No P.O. Boxes)'/><label>City</label><input type='text' name='school[city]' class='new-input city-input' placeholder='' /><label>Zip Code</label><input type='text' name='school[zip]' class='new-input zip-input' placeholder='' /><label>Phone</label><input type='text' name='school[phone]' class='new-input phone-input' placeholder='optional' /></form></div>"
			)
			$(".form-wrapper#" + SCHOOLS[i] + " form .name-input").val($("#SchoolTable .school#" + SCHOOLS[i] + " .name").text());
			$(".form-wrapper#" + SCHOOLS[i] + " form .type-input").val($("#SchoolTable .school#" + SCHOOLS[i] + " .type").text().replace('Type: ', ''));
			$(".form-wrapper#" + SCHOOLS[i] + " form .address-input").val($("#SchoolTable .school#" + SCHOOLS[i] + " .address").text().replace('Address: ', ''));
			$(".form-wrapper#" + SCHOOLS[i] + " form .city-input").val($("#SchoolTable .school#" + SCHOOLS[i] + " .city").text().replace('City: ', ''));
			$(".form-wrapper#" + SCHOOLS[i] + " form .zip-input").val($("#SchoolTable .school#" + SCHOOLS[i] + " .zipcode").text().replace('Zipcode: ', ''));
			$(".form-wrapper#" + SCHOOLS[i] + " form .phone-input").val($("#SchoolTable .school#" + SCHOOLS[i] + " .phone").text().replace('Phone: ', ''));
			i++;
		}
		
	}
	
	$.getJSON("../json/data.json", function (data){
		//console.log(data);
		let school = 1;
		$.each( data, function( key, val ) {
			
			$("#SchoolTable").append(
				"<div class='school' id='school"+school+"'><h2 class='name'>"+data[key].name+"</h2><p><span class='type'>Type: "+data[key].type+"</span><br/><span class='address'>Address: "+data[key].address+"</span><br/><span class='city'>City: "+data[key].city+"</span><br/><span class='zipcode'>Zipcode: "+data[key].zipcode+"</span><br/><span class='phone'>Phone: "+data[key].phone+"</span></p></div>"
			)
			
			school++;
			
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
		$(".edit-school").hide();
	});
	
	$("#delete_school").on("click", function(){
		//Delete school switch
		$(".new-school").hide();
		$(".delete-school").show();
		$(".edit-school").hide();
	});
	
	$("#edit_school").on("click", function(){
		//Edit school switch
		$(".new-school").hide();
		$(".delete-school").hide();
		$(".edit-school").show();
		selectSchool();
	});
	
	//console.log(SCHOOLS);
	

	
});