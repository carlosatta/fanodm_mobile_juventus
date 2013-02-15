var Dashboard = {

	init_dashboard : function(go_on) {
		if (!go_on || go_on === undefined) {
			$.mobile.changePage("#dashboard", {
				transition : "slide",
				changeHash : false
			});
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id,
					'Dashboard.init_dashboard(true);');
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	go_to_spogliatoio : function() {
		Spogliatoio.init_spogliatoio();
	},

	go_to_store : function() {
		Store.init_store();
	}
};