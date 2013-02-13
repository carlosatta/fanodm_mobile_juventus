/* Espone tutti i metodi per parsare gli oggetti restituiti dal service */

var Json = {
    objects : {},

    filter_objects : function(objects, type) {
        if(!type)
            return false;

        var response = {};
        if (utility.isArray(objects)) {
            var id = false;
            $.each(objects, function(i, el) {
                id = el['_id'];
                if (type == el.obj_type) {
                    response[id] = el;
                }
            });
        }
        return response;
    },

    change_primary_key_json : function(objects, prim_key) {
        if(!prim_key)
            return objects;
        if(prim_key == 'counter') {
            var counter = 0;
        }
        
        var response = {};
        if (utility.isArray(objects)) {
            var id = false;
            $.each(objects, function(i, el) {
                id = el[prim_key];
                if(prim_key == 'counter')
                    id = counter;
                response[id] = el;
                if(prim_key == 'counter')
                    counter++;
            });
        }
        return response;
    },
    
    merge_objects : function(objects, user_objects) {
        if (!utility.isArray(objects) || !utility.isArray(user_objects)){
            return false;
        }
        
        var response = objects;
        $.each(user_objects, function(i, el) {
            response[el] = Service.all_objects[el];
        });
        return response;
    },
    
    clean_objects: function(objects, user_objects) {
        if (!utility.isArray(objects) || !utility.isArray(user_objects)){
            return false;
        }
        
        $.each(user_objects, function(i, el) {
            delete objects[el];
        });
        return objects;
    }
};
