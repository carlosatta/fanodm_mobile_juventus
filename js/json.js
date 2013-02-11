/* Espone tutti i metodi per parsare gli oggetti restituiti dal service */

var Json = {
	objects : {},

	filter_objects : function(objects, option) {
		var obj_type = false;
		if (option && utility.isArray(option)) {
			if (option.hasOwnProperty('obj_type'))
				obj_type = option['obj_type'];
		}

		var response = {};
		if (utility.isArray(objects) && objects.length) {
			$.each(objects, function(i, el) {
				if (obj_type)
					if (obj_type == el['obj_type'])
						response[el['_id']] = el;
			});
		}
		return response;
	},

	merged_objects : function(objects, user_objects) {
		var response = {};

	}

};
