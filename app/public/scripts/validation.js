//Form validation functions
function validate(event) {
	//Delete Event
	if($(event.target).hasClass("delete-submit")){
		console.log("Delete submit pressed.")
		let deleteInput = $(".name-input").val();
		let found = false;
		$(".school .name").each( function(){
				let n = $(this).text();
				console.log(n)
				if(n === deleteInput){
					found = true;
				}
				
		})
		if(!found){
			$("#nodelete").show();	
		}else{
			$("#nodelete").hide();
		}
	}
	//Add Event
	if($(event.target).hasClass("add-submit")){
		console.log("Add submit pressed.")
		let flag = false
		if( $(".new-school .name-input").val().length === 0 ){
			$(".name-input").next(".val-message").addClass("val-error");
			flag = true;
		} else {
			$(".name-input").next(".val-message").removeClass("val-error");
		}
		if( $(".new-school .type-input").val().length === 0 ){
			$(".type-input").next(".val-message").addClass("val-error");
			flag = true;
		} else {
			$(".type-input").next(".val-message").removeClass("val-error");
		}
		if( $(".new-school .address-input").val().length === 0 ){
			$(".address-input").next(".val-message").addClass("val-error");
			flag = true;
		} else {
			$(".address-input").next(".val-message").removeClass("val-error");
		}
		if( $(".new-school .city-input").val().length === 0 ){
			$(".city-input").next(".val-message").addClass("val-error");
			flag = true;
		} else {
			$(".city-input").next(".val-message").removeClass("val-error");
		}
		//Zip validation includes format check
		let zip = $(".new-school .zip-input").val();
		if( zip.length !== 5 ){
			console.log(zip.length);
			let zip_error = $(".zip-input").next(".val-message");
			zip_error.addClass("val-error");
			flag = true;
			if(zip.length === 0){
				zip_error.text("*Zip Code is required");
			} else {
				zip_error.text("*Zip Code is invalid");
			}
		} else {
			$(".zip-input").next(".val-message").removeClass("val-error").empty();
		}
		if (flag){
			console.log("Stopping Submit")
			$("form#addForm").submit(function(e){
                return false;
            });
		} else {
			document.getElementById("addForm").submit();
		}
	}
	
}