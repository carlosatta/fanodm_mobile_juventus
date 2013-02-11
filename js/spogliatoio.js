var Spogliatoio = {
	spogliatoio_objects : [],
	current_object_position : 0,

	display_user_data : function(go_on) {
		if (!go_on || go_on === undefined) {
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id,
					'Dashboard.display_user_data(true);');
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	load_objects : function(go_on) {
		if (!go_on || go_on === undefined) {
			Service.get_objects('Spogliatoio.load_objects(true);');
		} else {
			Spogliatoio.spogliatoio_objects = Json.filter_objects(Service.all_items, {
				'obj_type' : 'spogliatoio'
			});
			$('#spogliatoio-text').text(JSON.stringify(Spogliatoio.spogliatoio_objects));
		}
	}
};