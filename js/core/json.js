/* Espone tutti i metodi per parsare gli oggetti restituiti dal service */

var Json = {
    objects : {},

    filter_objects : function(objects, type) {
        if(!type)
            return false;

        var response = {};
        if (utility.isArray(objects) && objects.length > 0) {
            var id = false;
            $.each(objects, function(i, el) {
                id = el['_id'];
                if (type == el['obj_type'])
                    response[id] = el;
            });
        }
        return response;
    },

    change_primary_key_json : function(objects, prim_key) {
        if(!prim_key)
            return objects;
        
        var response = {};
        if (utility.isArray(objects) && objects.length > 0) {
            var id = false;
            $.each(objects, function(i, el) {
                id = el[prim_key];
                response[id] = el;
            });
        }
        return response;
    },
    
    merge_objects : function(objects, user_objects) {
        if (utility.isArray(objects) || utility.isArray(user_objects)){
            return false;
        }
        return $.merge(objects, user_objects);
		// var response = objects;
		// $.each(user_objects, function(i, el) {
		// response[el] = Service.all_objects[el];
		// });
		// return response;
    }
};
