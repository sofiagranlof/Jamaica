

function allowDrop(ev) {
    ev.preventDefault(); 
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); 
}

function dropped(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

}

function capitalise(txt) {
		var arr = txt.split('_'),
			capTxt = '';

		arr.forEach(function(word, index) {
			capTxt += word[0].toUpperCase() + word.slice(1);
			if (index < arr.length - 1) {
				capTxt += ' ';
			}
		});
		return capTxt;
}

$(document).ready(function() {

	
	$('.panel-button').on('click', function () {
        //$('#myDiv').toggle();
        var panelId = $(this).attr('data-panelid');
        $('#' + panelId).toggle();
    });
});



/**********************/
/* Here starts the API*/
/**********************/


function usr(responseString){
    var json = JSON.parse(responseString)
    var payload = json.payload
    
    var uname = payload[0].first_name
    var ucredit = payload[0].assets
    document.getElementById("uname").innerHTML = 'Username: ' + uname; 
   
    var intcred = parseInt(ucredit);
    if(intcred<0){
       ucredit = '<font color=red>' + ucredit + '</font>'
    }
    
     document.getElementById("ucredit").innerHTML = 'Credit: ' + ucredit;
    
}

//USERALL
function usrall(responseString){
    var json = JSON.parse(responseString);
    var payload = json.payload;
    for (var i = 0; i < payload.length; i++){
      var row = document.getElementById("mytable").insertRow(i+1);
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
      document.getElementById("mytable").rows[i+1].cells[0].innerHTML = payload[i].first_name
      document.getElementById("mytable").rows[i+1].cells[1].innerHTML = payload[i].last_name
      document.getElementById("mytable").rows[i+1].cells[2].innerHTML = payload[i].email
      document.getElementById("mytable").rows[i+1].cells[3].innerHTML = payload[i].phone
    }
}

function loadUsers(api) {
    api.fetchUsers(usrall)
}
//USERALL

//INVENTORY
function allinventory(responseString){
    var json = JSON.parse(responseString);
    var payload = json.payload;
    
    var beerlist = ["193002","195202","192003","165903","133603",
                    "1152803","152503","167903","163203","160903",
                    "1137903","122203","183502","182402","171903",
                    "667102","207504","1210502","721801","651201"];
    
     for (var i = 0; i < 4; i++){
      var row = document.getElementById("drinktable").insertRow(i);
        for (var k = 0; k<5; k++){
            row.insertCell();
            
            //Hämta beer
            var beerindex = 0;
            for (beerindex = 0; beerindex < payload.length;beerindex++){
                if(payload[beerindex].beer_id == beerlist[i*5+k]){
                    break;
                }
            }
            
            
            
  // document.getElementById("drinktable").rows[i].cells[k].innerHTML = responseString;
   // break;
            
            
            document.getElementById("drinktable").rows[i].cells[k].innerHTML =
                '<div class="aBeverage"><img id=' + payload[beerindex].beer_id + ' width="70px" height="150px"src=Pictures/' + payload[beerindex].beer_id + '.png draggable="true"ondragstart="drag(event)"><br>' + payload[beerindex].namn + '<br>' + payload[beerindex].namn2 + '<br> Price: ' + payload[beerindex].price + '</div>'
                
                
                //"<img src=" + payload[i*5+k].beer_id + ".png><br>" + //payload[i*5+k].namn + "<br> Price: " + payload[i*5+k].price 
            	
        }
    }
    
    
    /*for (var i = 0; i < 4; i++){
      var row = document.getElementById("drinktable").insertRow(i);
        for (var k = 0; k<5; k++){
            row.insertCell();
            document.getElementById("drinktable").rows[i].cells[k].innerHTML =
                '<div class="aBeverage"><img id=' + payload[i*5+k].beer_id + ' width="100px" height="100px"src=' + payload[i*5+k].beer_id + '.png draggable="true"ondragstart="drag(event)"><br> Price: ' + payload[i*5+k].price + '</div>'
                
                
                //"<img src=" + payload[i*5+k].beer_id + ".png><br>" + //payload[i*5+k].namn + "<br> Price: " + payload[i*5+k].price 
            	
        }
    */
}

function loadInventory() {
    var api = new APIConnect();
    api.setUser('ervtod', 'ervtod');
    api.fetchInventoryGet(allinventory);
}
//INVENTORY

function fn(){
    var api = new APIConnect();
    //btn = document.getElementById('yourbuttonID');

    api.setUser('ervtod', 'ervtod');
    //btn.addEventListener('click', function() { loadUsers(api) });
   
    //api.fetchIOU(usr);
        
}



function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}


