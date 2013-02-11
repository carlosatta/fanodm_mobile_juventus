var Splashscreen = {
	/*per ora fa la richiesta di login al webservice e chiama validate_login() come callback*/	
	do_login: function (){
		Service.login(
				'BAABo0L9M21kBAMiccS2vZAWDsXorggEujt6oshQVkwAHZACdvlZAZC0DNc4T6mSbicIjTKyRxua7BhtLRzt4YGkxQGJIXpAOmJYmcoiWYCOg51NZB5ZC5OiZCZCSHqIM4C5a9sKnXVZBNdADMU2eHN253', 
				'5554321',
				'Splashscreen.go_to_dashboard();'
		);
	},
	
	/*controlla che il login sia andato a buon fine e passa alla dashboard*/	
	go_to_dashboard: function (){
		if(Service.user_profile.id){
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