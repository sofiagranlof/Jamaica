function APIConnect() {
    var     baseURL = 'http://pub.jamaica-inn.net/fpdb/api.php',
            username = window.localStorage.getItem("username"),
            password = window.localStorage.getItem("password");

    function constructURL(params) { 
        var url = baseURL + '?' + 'username=' + username + '&' + 'password=' + password;
        for(var key in params){
            url = url + '&' + key + '=' + params[key] 
        }
        return url;
    }
    
    function request(url, callback) { 
        var xhr = new XMLHttpRequest();
        
        
        xhr.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                callback(this.responseText);
            }
        };
        xhr.open('GET',url);
        xhr.send();
        
    }
    this.setUser = function(un, pw) {
        username = un;
        password = pw;
    };
    
    this.fetchUsers = function(callback) {
        var url = constructURL({action: 'user_get_all'})
        request(url, callback);
    };
    
    this.fetchIOU = function(callback) { 
        var url = constructURL({action: 'iou_get'})
        request(url, callback);
    };
    this.fetchInventoryGet = function(callback) {
        var url = constructURL({action: 'inventory_get'})
        request(url, callback);
    }
    this.fetchPurchasesGet = function(callback){
        var url = constructURL({action:'purchases_get'})
        request(url,callback);
    }
}
