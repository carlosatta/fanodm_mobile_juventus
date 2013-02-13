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
    get_objects_has_finished : false,
    get_user_objects_has_finished : false,

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
        console.log('Sending request to ' + url + url_suffix);
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
        } else {
            Service.all_objects = Json.change_primary_key_json(Service.output.value, '_id');
            Service.output = false;
            Service.get_objects_has_finished = true;
            if (callback)
                eval(callback);
        }
    },

    get_user_objects : function(user_id, callback, go_on) {
        if (!go_on || go_on === undefined) {
            if (!user_id)
                return false;

            var url_suffix = 'get_user_items?userid=' + user_id;
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
        } else {
            Service.user_objects = Service.output.value;
            Service.output = false;
            Service.get_user_objects_has_finished = true;
            if (callback)
                eval(callback);
        //                eval(callback.replace(/"/g, "'"));
        }
    },

    save_user_avatar : function(user_id, data, callback, go_on) {
        if (!go_on || go_on === undefined) {
            if (!user_id || user_id === undefined || !data || data === undefined){
                return false;
            }

            var url_suffix = 'save_avatar?me=' + user_id + '&avatar_data=' + JSON.stringify(data);
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

    add_user_object : function(user_id, object_id) {
        if (!user_id || user_id === undefined || !object_id || object_id === undefined)
            return false;

        var url_suffix = 'add_user_item?userid=' + user_id + '&item_id=' + object_id
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
        if (!go_on || go_on === undefined) {
            Service.get_objects_has_finished = false;
            Service.get_user_objects_has_finished = false;
            Service.get_objects('Service.filter_objects("' + user_id + '", "' + type + '", "' + callback + '", true);');
            Service.get_user_objects(user_id, 'Service.filter_objects("' + user_id + '", "' + type + '", "' + callback + '", true);');
        } else {
            if (Service.get_objects_has_finished && Service.get_user_objects_has_finished) {
                var filtered = Json.filter_objects(Service.all_objects, type);
                
                if (type == 'spogliatoio') {
                    var merged = Json.merge_objects(filtered, Service.user_objects);
                    Service.spogliatoio_objects = Service.group_objects(Json.change_primary_key_json(merged, 'counter'), 'spogliatoio');
                }
                else if (type == 'store') {
                    var cleaned = Json.clean_objects(filtered, Service.user_objects);
                    Service.store_objects = Service.group_objects(Json.change_primary_key_json(cleaned, 'counter'), 'spogliatoio');
                }
                
                Service.get_objects_has_finished = Service.get_user_objects_has_finished = false;		
                if (callback)
                    eval(callback);
            }
        }
    },

    group_objects : function(objects, type) {
        var response = objects;
        var data = new Array();
        $.each(response, function(i, el) {
            // Se ha già come chiave la position che sto ciclando aggiungo semplicemente l'oggetto all'array
            if(data.hasOwnProperty(el.information[0].position)) {
                data[el.information[0].position].push({
                    '_id' : el['_id'],
                    'image' : el['resource']
                });
            } else {
                // Altrimenti la chiave viene creata e poi ci aggiungo l'oggetto
                data[el.information[0].position] = [{
                    '_id' : el['_id'], 
                    'image' : el['resource']
                }];
            }
        });
        return data;
    }
};
