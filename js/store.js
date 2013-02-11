var Store = {
	current_object_position : 0,

	display_user_data : function(go_on) {
		if (!go_on || go_on === undefined) {
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id,
					'Store.display_user_data(true);');
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	load_objects : function(go_on) {
		if (!go_on || go_on === undefined) {
			Service.filter_objects(Service.user_profile.id, 'store', 'Store.load_objects(true);');
		} else {
			//processa il risultato
		}
	}
};