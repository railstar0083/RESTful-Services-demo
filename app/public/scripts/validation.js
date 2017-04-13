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
}