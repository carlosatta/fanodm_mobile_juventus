/* Espone tutti i metodi delle chiamate al webservice 
 * 
 * Tutti i metodi che hanno la variabile go_on vanno 
 * richiamati normalmente, senza passare quel paramentro.
 * Richiamano quindi get_json che, quando finisce il suo 
 * lavoro richiamo il metodo che lo ha interpellato, 
 * specificando go_on a true. In questo modo il metodo sa 
 * che è stato richiamato da get_json e prosegue nel salvare i dati.
 * */

var Service = {
	output : false,
	user_profile : [],
	user_objects : [],
	all_objects : [],
	spogliatoio_objects : [],
	store_objects : [],
	user_coins : [],
	news : [],
	chat_messages : [],
	execute_get_objects : false,
	execute_get_user_items : false,

	/* Si occupa di fare tutte le chiamate json */
	get_json : function(url_suffix, option) {
		var url = Settings.service_url;
		var action = '';
		var preaction = '';
		if (option && utility.isArray(option)) {
			if (option.hasOwnProperty('url'))
				url = option['url'];
			if (option.hasOwnProperty('action'))
				action = option['action'];
			if (option.hasOwnProperty('preaction'))
				preaction = option['preaction'];
		}
		if (preaction)
			eval(preaction);
		if (!url_suffix)
			return false;

		$.getJSON(url + url_suffix, {}, function(data) {
			Service.save_data(data);
			console.log('action: ' + action);
			if (action)
				eval(action);
		}).error(function(data) {
			Service.save_data(data);
			console.log('action: ' + action);
			if (action)
				eval(action);
		});
	},

	/*
	 * Salva i dati restituiti da get_json in una variabile temporanea che verrà
	 * poi processata dai metodi che hanno richiamato get_json
	 */
	save_data : function(data) {
		Service.output = data;
	},

	/* Esegue il login sul server */
	login : function(token, expiry, callback, go_on) {
		if (!go_on || go_on === undefined) {
			if (!token || !expiry)
				return false;

			var url_suffix = 'login?token=' + token + '&expiry=' + expiry;
			Service.user_profile = [];
			Service.output = false;
			Service.get_json(url_suffix, {
				'action' : 'Service.login(false, false, "' + callback
						+ '", true);'
			});
		} else {
			Service.user_profile = Service.output.value;
			Service.output = false;
			if (callback)
				eval(callback);
		}
	},

	/* Recupera la lista degli oggetti disponibili (cappellino, ecc.) */
	get_objects : function(callback, go_on) {
		if (!go_on || go_on === undefined) {
			var url_suffix = 'get_objects';
			Service.all_objects = [];
			Service.output = false;
			Service.get_json(url_suffix, {
				'action' : 'Service.get_objects(\'' + callback + '\', true);'
			});
			Service.execute_get_objects = false;
		} else {
			Service.all_objects = Json.change_assoc_json(Service.output.value,
					'_id');
			Service.output = false;
			Service.execute_get_objects = true;
			if (callback)
				eval(callback.replace(/"/g, "'"));
		}
	},

	get_user_objects : function(user_id, callback, go_on) {
		if (!go_on || go_on === undefined) {
			if (!user_id)
				return false;

			var url_suffix = 'get_user_objects?userid=' + user_id;
			Service.user_objects = [];
			Service.output = false;
			if (callback)
				Service.get_json(url_suffix, {
					'action' : 'Service.get_user_objects(\'' + user_id
							+ '\', \'' + callback + '\', true);'
				});
			else
				Service.get_json(url_suffix, {
					'action' : 'Service.get_user_objects(\'' + user_id
							+ '\', false, true);'
				});
			Service.execute_get_user_items = false;
		} else {
			Service.user_objects = Service.output.value;
			Service.output = false;
			Service.execute_get_user_items = true;
			if (callback)
				eval(callback.replace(/"/g, "'"));
		}
	},

	save_user_avatar : function(user_id, data, callback, go_on) {
		if (!go_on || go_on === undefined) {
			if (!user_id || user_id === undefined || !data || data === undefined)
				return false;

			var url_suffix = 'save_avatar?me=' + user_id + '&avatar_data=' + data;
			Service.output = false;
			Service.get_json(url_suffix, {
				'action' : 'Service.save_user_avatar(false, \'' + data + '\', \'' + callback + '\', true);'
			});
		} else {
			if(Service.user_profile !== undefined){
				Service.user_profile.avatar = data;
			}
			if (callback)
				eval(callback);
		}
	},

	add_user_item : function(user_id, item_id) {
		if (!user_id || user_id === undefined || !item_id || item_id === undefined)
			return false;

		var url_suffix = 'add_user_item?userid=' + user_id + '&item_id=' + item_id
				+ '';
		Service.output = false;
		Service.get_json(url_suffix);
	},

	get_user_coins : function(user_id, callback, go_on) {
		if (!go_on || go_on === undefined) {
			if (!user_id)
				return false;

			var url_suffix = 'get_coins?userid=' + user_id;
			Service.user_coins = [];
			Service.output = false;
			Service.get_json(url_suffix, {
				'action' : 'Service.get_user_coins(false, "' + callback
						+ '", true);'
			});
		} else {
			Service.user_coins = Service.output.value.virtual_coins;
			Service.output = false;
			if (callback)
				eval(callback);
		}
	},

	set_user_coins : function(user_id, coins) {
		if (!user_id)
			return false;
		if (parseFloat(coins) && parseFloat(coins) != 'NaN')
			coins = parseFloat(coins);
		else
			return false;

		var get_coins = Service.get_user_coins(user_id);
		var balance = get_coins['value']['virtual_coins'];
		if (balance < coins)
			return false;

		var url_suffix = 'set_coins?userid=' + user_id + '&coins=' + coins
				+ '&add=true';
		var response = Service.get_json(url_suffix);
		return response;
	},

	// DOCUMENTAZIONE MANCANTE
	set_user_place : function(user_id, block, seat) {
		if (!user_id || !block || !seat)
			return false;
		//
	},

	news_url : function(go_on) {
		if (!go_on) {
			var url_suffix = 'news_url';
			Service.news = [];
			Service.output = false;
			Service.get_json(url_suffix, {
				'action' : 'Service.news_url(true);'
			});
		} else {
			Service.news = Service.output;
			Service.output = false;
		}
	},

	get_chat_messages : function(go_on) {
		if (!go_on) {
			var url_suffix = 'chat_updates';
			Service.chat_messages = [];
			Service.output = false;
			Service.get_json(url_suffix, {
				'action' : 'Service.get_chat_messages(true);'
			});
		} else {
			Service.chat_messages = Service.output;
			Service.output = false;
		}
	},

	filter_objects : function(user_id, type, callback, go_on) {
		Service.output = false;
		if (!callback || callback === undefined)
			callback = '';
		if (!go_on || go_on === undefined) {
			if (Service.all_objects.length == 0) {
				Service.get_objects('Service.filter_objects("' + user_id
						+ '", "' + type + '", "' + callback + '", true);');
			}
			if (Service.user_objects.length == 0) {
				Service.get_user_objects(user_id, 'Service.filter_objects("'
						+ user_id + '", "' + type + '", "' + callback
						+ '", true);');
			}
			return false;
		} else {
			if (!Service.execute_get_objects && !Service.execute_get_user_items)
				return false;

			var filtered = Json.filter_objects(Service.all_objects, type);
			var merged = Json.merged_objects(filtered, Service.user_objects);
			if (type == 'spogliatoio')
				Service.spogliatoio_objects = merged;
			else if (type == 'store')
				Service.store_objects = merged;
			if (callback)
				eval(callback);
		}
	},

	get_objects_by_tipology : function() {

	}
};
