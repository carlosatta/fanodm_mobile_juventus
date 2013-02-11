var Dashboard = {

	display_user_data : function(go_on) {
		if (!go_on || go_on === undefined) {
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id,
					'Dashboard.display_user_data(true);');
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	go_to_spogliatoio : function() {
		$.mobile.changePage("#spogliatoio", {
			transition : "slide",
			changeHash : false
		});
		Spogliatoio.display_user_data();
		Spogliatoio.load_objects();
	}
};