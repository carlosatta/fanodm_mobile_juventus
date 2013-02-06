function onPubFacebookBtn(){ 
        /* On Facebook Login */
        var my_client_id  = "115245771971417",
        my_redirect_uri   = "http://www.facebook.com/connect/login_success.html",
        my_type           = "user_agent",
        my_display        = "touch"

        var authorize_url  = "https://graph.facebook.com/oauth/authorize?";
        authorize_url += "client_id="+my_client_id;
        authorize_url += "&redirect_uri="+my_redirect_uri;
        authorize_url += "&display="+my_display;
        authorize_url += "&scope=publish_stream"

        client_browser = ChildBrowser.install(); 
        client_browser.onLocationChange = function(loc){ facebookLocChanged(loc); };
        if(client_browser != null) {  window.plugins.childBrowser.showWebPage(authorize_url); }
    }

    function facebookLocChanged(loc){
       /* Here we check if the url is the login success */
       if (/login_success/.test(loc)) { 
           var fbCode = loc.match(/code=(.*)$/)[1]
           /* I complete the login server side, but you could use the facebook js sdk */
           $.ajax({
              url: 'http://localhost:8000/api/login/facebook/', 
              dataType: 'jsonp',
              type: 'GET',
              data: {code: fbCode},
              success: function(data, textStatus) {
                  if (data['success']) {
                    localStorage.facebook_token = data['token']; /* store the token */
                    client_browser.close();
                    jQT.goTo('#home');
                  } else {
                      client_browser.close();
                  }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                  alert(textStatus);
                  jQT.goTo('#home');
              }
           });
       }
    }

