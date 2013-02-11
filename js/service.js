/* Espone tutti i metodi delle chiamate al webservice */

var Service = 
{
    output: false,
    user_items : [],
    all_items : [],
    user_data : [],
    user_coins : [],
    news: [],
    chat_messages: [],
    
    get_json: function (data, option)
    {
        var url = Settings.service_url;
        var action = '';
        var preaction = '';
        if (option && utility.isArray(option)){
            if (option.hasOwnProperty('url'))
                url = option['url'];
            if (option.hasOwnProperty('action'))
                action = option['action'];
            if (option.hasOwnProperty('preaction'))
                preaction = option['preaction'];
        }
        if(preaction) eval(preaction);
        if(!data)
            return false;

        $.getJSON(url + data, {}, function(data) {
            $('#box').html('Fatto!');
            Service.save_data(data);
            console.log('azione: ' + action);
            if(action) eval(action);
        }).error(function(data) {
            $('#box').html('Errore!');
            Service.save_data(data);
            console.log('azione: ' + action);
            if(action) eval(action);
        });
    },
    
    save_data: function(data) {
        Service.output = data;
        console.log(data);
    },
  
    login: function(token, expiry, go_on) {
        if(!go_on || go_on === undefined) {
        	if(!token || !expiry)
                return false;
        	
        	var data = 'login?token=' + token + '&expiry=' + expiry;
            Service.user_data = [];
            Service.output = false;
            Service.get_json(data, {
                'action':'Service.login(false, false, true);'
            });
        } else {
            Service.user_data = Service.output;
            Service.output = false;
        }        
    },
    
    get_objects: function(go_on, callback) {
        console.log('get_objects: go_on=' + go_on);
        console.log('get_objects: callback=' + callback);
        if(!go_on || go_on === undefined) {
            var data = 'get_objects';
            Service.all_items = [];
            Service.output = false;
            if(callback)
                Service.get_json(data, {
                    'action':'Service.get_objects(true, \''+ callback + '\');'
                });
            else
                Service.get_json(data, {
                    'action':'Service.get_objects(true);'
                });
        } else {
            Service.all_items = Service.output;
            Service.output = false;
            if(callback) eval(callback.replace(/"/g, "'"));
        }
    },
    
    get_user_items: function(user_id, go_on, callback) {
        console.log('get_user_items: user_id=' + user_id);
        console.log('get_user_items: go_on=' + go_on);
        console.log('get_user_items: callback=' + callback);
        if(!go_on) {
            if(!user_id) return false;
        
            var data = 'get_user_items?userid=' + user_id;
            Service.user_items = [];
            Service.output = false;
            if(callback)
                Service.get_json(data, {
                    'action':'Service.get_user_items(false, true, \''+ callback + '\');'
                });
            else
                Service.get_json(data, {
                    'action':'Service.get_user_items(false, true);'
                });
        } else {
            Service.user_items = Service.output;
            Service.output = false;
            if(callback) eval(callback.replace(/"/g, "'"));
        }
    },

    // DOCUMENTAZIONE MANCANTE
    save_user_avatar: function(user_id) {
    	if(!user_id) return false;
        
        var data = '?userid=' + user_id;
        Service.output = false;
        Service.get_json(data);
    }, 
    
    get_user_coins: function(user_id, go_on) {
        if(!go_on) {
            // TEST
            if(!user_id)
                user_id = '51092d33f03fa1396b991dbb';
            //
        
            var data = 'get_coins?userid=' + user_id;
            Service.user_coins = [];
            Service.output = false;
            Service.get_json(data, {
                'action':'Service.get_user_coins(false, true);'
            });
        } else {
            Service.user_coins = Service.output;
            Service.output = false;
        }
    },
    
    set_user_coins: function(user_id, coins) {
        // TEST
        if(!user_id) return false;
        if(parseFloat(coins) && parseFloat(coins) != 'NaN')
            coins = parseFloat(coins);
        else 
            return false;
        //
        
        var get_coins = Service.get_user_coins(user_id);
        var balance = get_coins['value']['virtual_coins'];
        if(balance < coins)
            return false;
        
        var data = 'set_coins?userid=' + user_id + '&coins=' + coins + '&add=true';
        var response = Service.requestAjax(data);
        return response;
    },

    // DOCUMENTAZIONE MANCANTE
    set_user_place: function(user_id, block, seat) {
        if(!user_id || !block || !seat) return false;
    //
    },
    
    news_url: function(go_on) {
        if(!go_on) {
            var data = 'news_url';
            Service.news = [];
            Service.output = false;
            Service.get_json(data, {
                'action':'Service.news_url(true);'
            });
        } else {
            Service.news = Service.output;
            Service.output = false;
        }
    },
    
    get_chat_messages: function(go_on) {
        if(!go_on) {
            var data = 'chat_updates';
            Service.chat_messages = [];
            Service.output = false;
            Service.get_json(data, {
                'action':'Service.get_chat_messages(true);'
            });
        } else {
            Service.chat_messages = Service.output;
            Service.output = false;
        }
    },
    
    get_filter_objects: function(user_id, option, go_on) {
        if(!go_on || go_on === undefined) {
            console.log('entrata 1: go_on=' + go_on);
            var last = 0;
            if(Service.all_items.length == 0)
                last = 1;
            if(Service.user_items.length == 0)
                last = 2;
            console.log('all_items: ' + Service.all_items.length);
            console.log('user_items: ' + Service.user_items.length);
            console.log('last valido: last=' + last);
            if(last) {
                if(last == 1) {
                    Service.get_objects(false, "Service.get_filter_objects(\"" + user_id + "\", " + JSON.stringify(option) + ", true);");
                }
                else if(last == 2) {
                    var callback_2 = 'Service.get_filter_objects(\"' + user_id + '"\", ' + JSON.stringify(option) + ', true);';
                    var callback = "Service.get_user_items(\"" + user_id + "\", false);";
                    Service.get_objects(false, callback); 
                }
            } else {
                console.log('last non necessario: mi richiamo con go_on');
                Service.get_filter_objects(user_id, option, true);
            }
            return false;
        } else {
            console.log('entrata 2: go_on=' + go_on);
            console.log(user_id);
            console.log(option);
            var filtered = Json.filter_objects(Service.all_items, option);
            var merged = Json.merged_objects(filtered, Service.user_items);
            return merged;
        }        
    },
    
    get_objects_by_tipology: function() {
        
    }
};


