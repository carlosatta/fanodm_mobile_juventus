var Splashscreen = {
		
	do_login: function (){
		Service.login(
				'BAABo0L9M21kBAMiccS2vZAWDsXorggEujt6oshQVkwAHZACdvlZAZC0DNc4T6mSbicIjTKyRxua7BhtLRzt4YGkxQGJIXpAOmJYmcoiWYCOg51NZB5ZC5OiZCZCSHqIM4C5a9sKnXVZBNdADMU2eHN253', 
				'5554321'
		);
	},
	
	validate_login: function (){
		if(Service.user_profile.value.id){
			$.mobile.changePage( "#dashboard", {
		        transition: "slide",
		        changeHash: false
		    }); 
			Dashboard.display_user_data();
		}else{
			alert('C\'è stato un errore durante il login, riprovare.');
		}
		
	}
};