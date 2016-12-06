


//johans changes 29 November: 
// - All functions called from the HTML files have been moved to the end of this file 
// - "usrall" worked on for admin page (not finished) 
// - jQuery document.ready moved to separate file because script.js needs to come before the HTML files calls to the script (e.g. loadUserInfo()), and jQueryScript needs to come after. async / defer didn't work on Opera for some reason


//(index) The below 3 functions are used by drag and drop
function allowDrop(ev) {
    ev.preventDefault(); 
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); 
}

function dropcopy(ev)
                    {
                    ev.preventDefault();
                    var data=ev.dataTransfer.getData("Text");
                    var copyimg = document.createElement("img");
                    //copyimg.setAttribute("src", "images/hydrangeas.jpg");
                    copyimg.setAttribute("height", "150");
                    copyimg.setAttribute("width", "75");
                    var original = document.getElementById(data);
                    copyimg.src = original.src;
                    ev.target.appendChild(copyimg);

                    }

function dropped(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

}


// ...
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


//the document ready jQuery that was here has been moved to a separate jquery document. 


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







//(admin) USERALL this function loads all the users into rows and creates an edit button for each user (the button is not connected to the row here but in the jQuery document) 
function usrall(responseString) {
    var json = JSON.parse(responseString);
    var payload = json.payload;
    for (var i = 0; i < payload.length; i++) {

        var myN = i.toString();

        var row = document.getElementById("usersTable").insertRow(i + 1);

        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();

        document.getElementById("usersTable").rows[i + 1].cells[0].innerHTML = payload[i].first_name;
        document.getElementById("usersTable").rows[i + 1].cells[1].innerHTML = payload[i].last_name;
        document.getElementById("usersTable").rows[i + 1].cells[2].innerHTML = payload[i].email;
        document.getElementById("usersTable").rows[i + 1].cells[3].innerHTML = payload[i].phone;
        document.getElementById("usersTable").rows[i + 1].cells[4].innerHTML = "";

        //this creates a button in the rows cell 4 with the index as id
        var myEditButton = $('<button id =' + i + '>Edit</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[i + 1].cells[4]);

        //The button connection to the row can perhaps be moved here. 
    }
}





//INVENTORY 
function allinventory(responseString){
    var json = JSON.parse(responseString);
    var payload = json.payload;
    
    var beerlist = ["193002","195202","192003","165903","133603",
                    "1152803","152503","167903","163203","160903",
                    "1137903","122203","183502","182402","171903",
                    "667102","207504","223301","721801","651201"];
    
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



//INVENTORY

//PURCHASES USER 

function purchases(responseString){
    var json = JSON.parse(responseString);
    var payload = json.payload;
    for (var i = 0; i < payload.length; i++){
      var row = document.getElementById("drinktable").insertRow(i+1);
        row.insertCell();
        row.insertCell();
        row.insertCell();
      document.getElementById("drinktable").rows[i+1].cells[0].innerHTML = payload[i].namn + ' ' + payload[i].namn2
      document.getElementById("drinktable").rows[i+1].cells[1].innerHTML = payload[i].price
      document.getElementById("drinktable").rows[i+1].cells[2].innerHTML = payload[i].timestamp
    }
}



//PURCHASES USER 

function fn(){
    var api = new APIConnect();
    //btn = document.getElementById('yourbuttonID');

    api.setUser('benfau', 'benfau');
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





//HTMLs function calls ---------------------------------------------------------

//perhaps only one "var api = new APIConnect();" is necessary

//Index: to load the bevarages
function loadInventory() {
    var api = new APIConnect();
    api.setUser('jora', 'benfau');
    api.fetchInventoryGet(allinventory);
}


//History: This function is loaded from history page
function loadpurchasesget() {
    var api = new APIConnect();
    api.setUser('jorass', 'jorass');
    api.fetchPurchasesGet(purchases);
} 

//Admin: This function is loaded from admin page
function loadUserInfo() {
    var api = new APIConnect();
    api.setUser('jorass', 'jorass');
    api.fetchUsers(usrall);
}



//... probably the same as above
function loadUsers(api) {
    api.fetchUsers(usrall)
}
