var Spogliatoio = {
	current_object_position : 0,
	avatar_body : {
		'occhi':'50f3fd3b2f68d4762a000002', 
		'bocca':'50f3fefe2f68d41d2c000002', 
		'capelli':'50f3ffca2f68d4cb2c000001', 
		'busto':'50f2ef4c2f68d47a29000001', 
		'gambe':'50f2f0442f68d41a29000000', 
		'cappello':'50f2f00e2f68d47929000000', 
		'collo':'50f3f64a2f68d41d2c000000', 
		'bocca':'50f3fefe2f68d41d2c000002',
	},

	init_spogliatoio : function(go_on) {
		if (!go_on || go_on === undefined) {
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id, 'Spogliatoio.init_spogliatoio(true);');
			Spogliatoio.load_objects();
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	load_objects : function(go_on) {
		if (!go_on || go_on === undefined) {
			Service.filter_objects(Service.user_profile.id, 'spogliatoio', 'Spogliatoio.load_objects(true);');
		} else {
//			alert(JSON.stringify(Service.spogliatoio_objects));
		}
	}
};