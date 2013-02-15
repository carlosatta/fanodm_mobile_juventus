var Store = {
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

	init_store : function(go_on) {
		if (!go_on || go_on === undefined) {
			$.mobile.changePage("#store", {
				transition : "slide",
				changeHash : false
			});
			$('.username').text(Service.user_profile.fbname);
			Service.get_user_coins(Service.user_profile.id,
					'Store.init_store(true);');
			Store.load_objects();
			Store.set_type('occhi');
		} else {
			$('.fantacoins-number').text(Service.user_coins);
		}
	},

	load_objects : function(go_on) {
		if (!go_on || go_on === undefined) {
			Service.filter_objects(Service.user_profile.id, 'store',
					'Store.load_objects(true);');
		} else {
			console.log(Service.store_objects);
		}
	},

	set_type : function(type) {
		Store.current_type = type;
		console.log('current type: ' + Store.current_type);
	},

	prev_object : function() {
		console.log('prima: ' + Store.current_objects_positions[Store.current_type]);
		if (Store.current_objects_positions[Store.current_type] >= 0) {
			Store.current_objects_positions[Store.current_type]--;
		}
		if (Store.current_objects_positions[Store.current_type] == -1) {
			$('.user-avatar-body-store .avatar-' + Store.current_type).css(
					'background-image', 'none');
			Store.current_objects[Store.current_type] = '';
			$('.object-cost').html('');
		} else {
			$('.user-avatar-body-store .avatar-' + Store.current_type)
			.css(
					'background-image',
					'url("'
							+ Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]].image
							+ '")');
			Store.current_objects[Store.current_type] = Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]]._id + '/' + Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]].cost;
			$('.object-cost').html(Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]].cost);
		}
		console.log('dopo: ' + Store.current_objects_positions[Store.current_type]);
	},

	next_object : function() {
		if (Store.current_objects_positions[Store.current_type] < Service.store_objects[Store.current_type].length - 1) {
			Store.current_objects_positions[Store.current_type]++;
			console.log(Store.current_objects_positions[Store.current_type]);
			Store.current_objects[Store.current_type] = Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]]._id + '/' + Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]].cost;
			$('.object-cost').html(Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]].cost);
			$('.user-avatar-body-store .avatar-' + Store.current_type)
					.css(
							'background-image',
							'url("'
									+ Service.store_objects[Store.current_type][Store.current_objects_positions[Store.current_type]].image
									+ '")');
		}
	},

	buy_objects : function(go_on) {
		if (!go_on || go_on === undefined) {
			var total_price = 0;
			$.each(Store.current_objects, function(i, el) {
				if (el.length > 0){
					var splitted_object = el.split('/');
					total_price = total_price + parseInt(splitted_object[1]);
				}
			});
			if(total_price != 0){
				if(total_price < Service.user_profile.virtual_coins){
					Service.set_user_coins(Service.user_profile.id, - total_price);
					$.each(Store.current_objects, function(i, el) {
						if (el.length > 0){
							var splitted_object = el.split('/');console.log(el);
							Service.add_user_object(Service.user_profile.id, splitted_object[0]);
						}
					});
					Dashboard.init_dashboard();
				}else{
					alert('Non hai abbastanza fantacoins per procedere con l\'acquisto.');
				}
			}
		} else {
		}
	}
};