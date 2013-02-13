var Spogliatoio = {
	current_objects_positions : {
		'occhi' : -1,
		'bocca' : -1,
		'gambe' : -1,
		'capelli' : -1,
		'busto' : -1,
	},
	current_type : '',
	current_objects : {
		'occhi' : '',
		'bocca' : '',
		'gambe' : '',
		'capelli' : '',
		'busto' : '',
	},

	init_spogliatoio : function(go_on) {
		if (!go_on || go_on === undefined) {
			$.mobile.changePage("#spogliatoio", {
				transition : "slide",
				changeHash : false
			});
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id,
					'Spogliatoio.init_spogliatoio(true);');
			Spogliatoio.load_objects();

			Spogliatoio.set_type('occhi');
			Spogliatoio.load_avatar();
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	load_objects : function(go_on) {
		if (!go_on || go_on === undefined) {
			Service.filter_objects(Service.user_profile.id, 'spogliatoio',
					'Spogliatoio.load_objects(true);');
		} else {
		}
	},

	set_type : function(type) {
		Spogliatoio.current_type = type;
		console.log('current type: ' + Spogliatoio.current_type);
	},

	prev_object : function() {
		if (Spogliatoio.current_objects_positions[Spogliatoio.current_type] >= 0) {
			Spogliatoio.current_objects_positions[Spogliatoio.current_type]--;
			$('.user-avatar-body .avatar-' + Spogliatoio.current_type)
					.css(
							'background-image',
							'url("'
									+ Service.spogliatoio_objects[Spogliatoio.current_type][Spogliatoio.current_objects_positions[Spogliatoio.current_type]].image
									+ '")');
		}
		if (Spogliatoio.current_objects_positions[Spogliatoio.current_type] == -1) {
			$('.user-avatar-body .avatar-' + Spogliatoio.current_type).css(
					'background-image', 'none');
			Spogliatoio.current_objects[Spogliatoio.current_type] = '';
		} else {
			Spogliatoio.current_objects[Spogliatoio.current_type] = Spogliatoio.current_type
					+ '/'
					+ Service.spogliatoio_objects[Spogliatoio.current_type][Spogliatoio.current_objects_positions[Spogliatoio.current_type]]._id;
		}
	},

	next_object : function() {
		if (Spogliatoio.current_objects_positions[Spogliatoio.current_type] < Service.spogliatoio_objects[Spogliatoio.current_type].length - 1) {
			Spogliatoio.current_objects_positions[Spogliatoio.current_type]++;
			Spogliatoio.current_objects[Spogliatoio.current_type] = Spogliatoio.current_type
					+ '/'
					+ Service.spogliatoio_objects[Spogliatoio.current_type][Spogliatoio.current_objects_positions[Spogliatoio.current_type]]._id;
			$('.user-avatar-body .avatar-' + Spogliatoio.current_type)
					.css(
							'background-image',
							'url("'
									+ Service.spogliatoio_objects[Spogliatoio.current_type][Spogliatoio.current_objects_positions[Spogliatoio.current_type]].image
									+ '")');
		}
	},

	save_avatar : function(go_on) {
		if (!go_on || go_on === undefined) {
			var avatar_json = [];
			$.each(Spogliatoio.current_objects, function(i, el) {
				if(el.length > 0)
					avatar_json.push(el);
			});
			console.log(JSON.stringify(avatar_json));
			Service.save_user_avatar(Service.user_profile.id, avatar_json,
					'Spogliatoio.save_avatar(true);');
		} else {
			Dashboard.init_dashboard();
		}
	},

	load_avatar : function() {
		$.each(Service.user_profile.avatar, function(i, el) {
			splitted_object = el.split('/');
			var type = splitted_object[0];
			var id = splitted_object[1];
			Spogliatoio.current_objects[type] = id;
			$('.user-avatar-body .avatar-' + type)
			.css(
					'background-image',
					'url("'
							+ Service.spogliatoio_objects[type][Spogliatoio.current_objects_positions[type]].image
							+ '")');
		});
		//DEVO FINIRE IL CARICAMENTO DEGLI OGGETTI DELL'AVATAR ALL'APERTURA DELL'APP;
	}
};