var beverageCounterM = 0;

//where is this function used can someone make a comment here? 
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

/**********************/
/* Here starts the API*/
/**********************/
 
/*
*This function gets the username from the user from the localstorage and returns it as a variable.
*
*/
function getUsername(){
    var username = window.localStorage.getItem("username");
    return username
}

/*
*This function gets the credit from the user and displays it on top of the cart in color red if the user is in debt.
*/
function credit(responseString){
    var json = JSON.parse(responseString)
    var payload = json.payload
    
    var ucredit = payload[0].assets
   
    var intcred = parseInt(ucredit);
    if(intcred<0){
       ucredit = '<font color=red>' + ucredit + '</font>'
    }
    document.getElementById("idbalance").innerHTML = ucredit;
}

/*
*This function connects with the API to get the credit from the user in the db. It's used in the function credit();
*/
function getCredit(){
    var api = new APIConnect();    
    api.fetchIOU(credit);
}

/*(admin)
*This function loads all the users into rows and creates an edit button for each user (the button is not connected to the row here but in the jQuery document).
*/
function usrall(responseString) {
    var json = JSON.parse(responseString);
    var payload = json.payload;
    var rowcount=0;

    for (var i = 0; i < payload.length; i++) {

    if(payload[i].first_name != "" && payload[i].first_name != "undefined"){
        
        
        var myN = i.toString();
        
        var row = document.getElementById("usersTable").insertRow(rowcount + 1);

        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();

        document.getElementById("usersTable").rows[rowcount + 1].cells[0].innerHTML = payload[i].first_name;
        document.getElementById("usersTable").rows[rowcount + 1].cells[1].innerHTML = payload[i].last_name;
        document.getElementById("usersTable").rows[rowcount + 1].cells[2].innerHTML = payload[i].email;
        document.getElementById("usersTable").rows[rowcount + 1].cells[3].innerHTML = payload[i].phone;
        document.getElementById("usersTable").rows[rowcount + 1].cells[4].innerHTML = "";

        //this creates a button in the rows cell 4 with the index as id
        var myEditButton = $('<button id =' + rowcount + 'editUserButton' + '>' + langGetText('edit') + '</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[rowcount + 1].cells[4]);
        
        rowcount++;
    }
        
    }
    
	
   
}

/*
*Function that determines if connection is correct
*/
function login(responseString){
    var json = JSON.parse(responseString)
   
    if(json.type == 'iou_get'){
        window.localStorage.setItem("login", "TRUE");
        window.location = 'index.html';

    }
    else{
        window.localStorage.setItem("login", "FALSE");
        alert('Failed to login');
    }
   
}

/*
*Function that puts the username and password in the local storage
*/
function testlogin(username, password){
    var api = new APIConnect();
    api.setUser(username, password);
    
    window.localStorage.setItem("username", username)
    window.localStorage.setItem("password", password)                
    window.localStorage.setItem("login", "FALSE");
    api.fetchIOU(login); 
}

/*
*Function that checks if the user is an admin
*/
function admin(responseString){
    var json = JSON.parse(responseString)
    if(json.type == 'user_get_all'){
        window.localStorage.setItem("admin", "TRUE");
        var btn1 = document.getElementById("admin");
            btn1.style.display = "block";
    }
    else{
        window.localStorage.setItem("admin", "FALSE");
    }
   
}

/*
*This function connects with the API to fetch the user from the db.
*/
function testadmin(){
    var api = new APIConnect();    
    api.fetchUsers(admin);
}

/*(index) INVENTORY 
*This function gets 20 beers and creates rows with images in index.html
*TODO: Localstore the drinks dynamicaly for later manipulation in admin page admindrinks.html
*/
function allinventory(responseString) {
    var json = JSON.parse(responseString);
    var payload = json.payload;

    var beerlist = ["193002", "195202", "192003", "165903", "133603",
                    "1152803", "152503", "167903", "163203", "160903",
                    "1137903", "122203", "183502", "182402", "171903",
                    "667102", "207504", "223301", "721801", "651201"];

    //these two loops create a matrix whose cells contain an img and info about each beer. 
    //for every row
    for (var i = 0; i < 5; i++) {
        var row = document.getElementById("drinktable").insertRow(i);

        //for every cell: 
        for (var k = 0; k < 4; k++) {
            row.insertCell();

            //Hämta beer. Laddning fr[n databasen h'nder h''r
            var beerindex = 0;
            for (beerindex = 0; beerindex < payload.length; beerindex++) {
                if (payload[beerindex].beer_id == beerlist[i * 4 + k]) {
                    break;
                }
            }

            var newId = payload[beerindex].beer_id + "info"; 
            
            //here is where the HTML is changed to accomodate the beverage: 
            document.getElementById("drinktable").rows[i].cells[k].innerHTML =
            '<div class="beverage">' +
                '<img id=' + payload[beerindex].beer_id + ' width="140px" height="300px" src=Pictures/' + payload[beerindex].beer_id + '.png draggable="true"ondragstart="drag(event)">' + '<br>' +
               
                 '<div id=' + newId + '>' +
                    payload[beerindex].namn + '<br>' +
                    payload[beerindex].namn2 + '<br>' +
                    payload[beerindex].price + ' kr' + 
		 '</div>' + 
                '<div id="counter' + newId + '"></div>' +
            '</div>'; 
            
		
	    //initialize or update locally stored quantity
            var localStoreQuantity = localStorage.getItem('counter' + newId);
            if (localStoreQuantity === null) {
                localStoreQuantity = "10";
            }
            localStorage.setItem('counter' + newId, localStoreQuantity);
        }
    }

}

/*(admin)
*This function gets all the purchases history from the user in history.html
*/
function purchases(responseString) {
    var json = JSON.parse(responseString);
    var payload = json.payload;
    for (var i = 0; i < payload.length; i++) {
        var row = document.getElementById("drinktable").insertRow(i + 1);
        row.insertCell();
        row.insertCell();
        row.insertCell();
        document.getElementById("drinktable").rows[i + 1].cells[0].innerHTML = payload[i].namn + ' ' + payload[i].namn2
        document.getElementById("drinktable").rows[i + 1].cells[1].innerHTML = payload[i].price
        document.getElementById("drinktable").rows[i + 1].cells[2].innerHTML = payload[i].timestamp
    }
}

/*
*This function gets all balances and puts them into a table for display, it also adds an edit button that will give acces to a form.
*/
function getAllBalances(responseString) {
    var json = JSON.parse(responseString);
    var payload = json.payload;
    var rowcount=0;
    for (var i = 0; i < payload.length; i++) {
        
        if(payload[i].username != "" && payload[i].username != "undefined"){

        var myN = i.toString();
        var row = document.getElementById("usersTable").insertRow(rowcount + 1);

        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();

        document.getElementById("usersTable").rows[rowcount + 1].cells[0].innerHTML = payload[i].username;
        document.getElementById("usersTable").rows[rowcount + 1].cells[1].innerHTML = payload[i].first_name;
        document.getElementById("usersTable").rows[rowcount + 1].cells[2].innerHTML = payload[i].last_name;
        document.getElementById("usersTable").rows[rowcount + 1].cells[3].innerHTML = payload[i].assets;
        document.getElementById("usersTable").rows[rowcount + 1].cells[4].innerHTML = "";

        //this creates a button in the rows cell 4 with the index as id
        var myEditButton = $('<button id =' + rowcount + 'editUserButton' + '>' + langGetText('edit') + '</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[rowcount + 1].cells[4]);
        
         rowcount++;
    
        }
    }
}

/*
*This function gets all the drinks and puts them into a table for display, it also adds the edit button that will give access to a form and a checkbox to select it if we want it to be in storage.
*It also gets rid of "empty" and "undefined" drinks from the db when displaying.
*TODO: Restrict the checkboxes to 20 drinks (3 non-alcoholic, 17 alcoholic)
*/
function getAllDrinks(responseString) {
    var json = JSON.parse(responseString);
    var payload = json.payload;
    var rowcount=0;
    for (var i = 0; i < payload.length; i++) {
        
        if((payload[i].namn+payload[i].namn2) != "" && (payload[i].namn+payload[i].namn2) != "undefined"){

        var myN = i.toString();
        var row = document.getElementById("usersTable").insertRow(rowcount + 1);

        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();
        row.insertCell();

        document.getElementById("usersTable").rows[rowcount + 1].cells[0].innerHTML = (payload[i].namn + " " +     payload[i].namn2);
        document.getElementById("usersTable").rows[rowcount + 1].cells[1].innerHTML = payload[i].sbl_price;
        document.getElementById("usersTable").rows[rowcount + 1].cells[2].innerHTML = payload[i].pub_price;
        document.getElementById("usersTable").rows[rowcount + 1].cells[3].innerHTML = payload[i].count;
        document.getElementById("usersTable").rows[rowcount + 1].cells[4].innerHTML = payload[i].price;
        document.getElementById("usersTable").rows[rowcount + 1].cells[5].innerHTML = "";
        

        //this creates a button in the rows cell 4 with the index as id
        var myEditButton = $('<button id =' + rowcount + 'editUserButton' + '>' + langGetText('edit') + '</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[rowcount + 1].cells[5]);
        
        var mycheckbox = $('<input type="checkbox" id="checkinstock">')
         $(mycheckbox).appendTo(document.getElementById("usersTable").rows[rowcount + 1].cells[6]);
            
            rowcount++;
        }
    }
}

/*
*This function shows an alert anytime the user makes a change in the table elements.
*/
function editChanges(){
            alert("Your changes have been successfully saved!");
        }

/*
*This function hides he button that gives access to the form to add a new user and sows the form to the user so he/she can fill the fields and add the new user.
*/
function getToForm(){
                     
$("#newUButton").hide();
$("#adduserform").show();
}

function docLoaded(fn) {

    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}





//HTMLs function calls ---------------------------------------------------------

//perhaps only one "var api = new APIConnect();" is necessary? 

//Index: to load the bevarages
function loadInventory() {
    var api = new APIConnect();
    api.fetchInventoryGet(allinventory);
}


//Admin->UserInfo
function loadUserInfo() {
    var api = new APIConnect();
    api.fetchUsers(usrall);
}

function loadAllDrinks() {
    var api = new APIConnect();
    api.fetchDrinks(getAllDrinks);
}

function loadUserEdit() {
    var api = new APIConnect();
    api.fetchUserEdit();
}

//History: This function is loaded from history page
function loadPurchasesGet() {
    var api = new APIConnect();
    api.fetchPurchasesGet(purchases);
}

//Admin: this loads purchases_get_all for the admin
function loadPurchasesGetAllAdmin() {
    var api = new APIConnect();
    api.fetchPurchasesGetAllAdmin(purchasesGetAllAdmin);
}

//Admin: this loads the users and their balance
function loadgetAllBalances() {
    var api = new APIConnect();
    api.fetchIOUAll(getAllBalances);
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}


function dropcopy(ev) {

    $(".beverageArea").css('background', 'none'); 
    ev.preventDefault(); //makes it droppable
    var idOfBottle = ev.dataTransfer.getData("Text");
    
    var thisQuantity = localStorage.getItem('counter' + idOfBottle + 'info'); 
    
    if ($("#cart").find('#row' + idOfBottle).length > 0) {
        alert("Press the + button to add one more of the same kind!");
    }
    else if (beverageCounterM > 7) {
        alert("A maximum of 8 beverage types can be added in the cart"); 
    }
        //****
    else if (thisQuantity < 1) {
        alert("there are not enough of this beverage type left in the machine! "); 
    }
        //****
    else { //the beverage will be put into cart

        thisQuantity--; 

        localStorage.setItem('counter' + idOfBottle + 'info', thisQuantity);


	    beverageCounterM += 1;
        //create div inside cart with idOfBottle
        var myDiv = document.createElement("div");
        myDiv.id = idOfBottle;

        var myInner = document.getElementById(idOfBottle + "info").innerHTML;
        myDiv.innerHTML = myDiv.innerHTML + myInner;
        var thePrice = parseSentenceForNumber(myDiv.innerHTML);
        thePrice = parseFloat(thePrice);


        var theText = myDiv.innerHTML;
        theText = theText.replace(/[0-9]/g, '');
        theText = theText.replace('Price', '');
	    theText = theText.replace('kr', ''); 
        theText = theText.replace(/<br>/g, '');

        //create handle to table and
        //calculate number of existing rows: 
        var table = document.getElementById('cart');
        var rowCount = table.rows.length - 2; //there are two hard coded rows at the end. 
        var rowId = "row" + idOfBottle;//rowCount +
        //var rowId = idOfBottle;

        //find where the end of the table is
        var row = document.createElement("tr");
        row.id = rowId;

        //there are two rows at the end in the html document
        $('#cart tr').eq(-2).before(row)
        row.insertCell();
        var counterCellVar = row.insertCell(); counterCellVar.id = "counterCell"; //a handle to the location of the counter and price are needed
        row.insertCell(); //plus button
        row.insertCell(); //minus button
        var priceCell = row.insertCell(); priceCell.id = "priceCell";

        document.getElementById(rowId).cells[0].innerHTML = theText;
        document.getElementById(rowId).cells[1].innerHTML = 1; //default this is a string
        document.getElementById(rowId).cells[2].innerHTML = "";
        document.getElementById(rowId).cells[3].innerHTML = "";
        document.getElementById(rowId).cells[4].innerHTML = thePrice + " kr"; 

        //build buttons
        var plusButton = $('<button class ="plusButton" id ="plusUnique">+</button>');
        $(plusButton).appendTo(document.getElementById(rowId).cells[2]);
        
        var minusButton = $('<button class ="minusButton" id ="minusUnique">-</button>');
        $(minusButton).appendTo(document.getElementById(rowId).cells[3]);


        updateTotal(thePrice, "lastRow");

    }

}

$(document).on('click', '.plusButton', function () {


    //in order to get to the correct counter we must first step out of the plus button and then into the innerHTML of the parent id cell[1]
    var idOfRow = $(this).parent().parent().attr('id');
    var thisRow = $(this).parent().parent(); //parent is td, grandparent is row
    var countAsString = $(thisRow).find("#counterCell").html();
    var countAsInt = parseInt(countAsString); 
    

    //****
    var idNRow = idOfRow.replace("row", "");
    var thisQuantity = localStorage.getItem('counter' + idNRow + 'info');

    if (thisQuantity < 1) {
        alert("there are not enough of this beverage type left in the machine! "); 
    }
    else { //put one bottle in cart

        var priceOneBottle = priceOneBottleFromBottles(idOfRow);
        updateTotal(priceOneBottle, idOfRow);
        updateTotal(priceOneBottle, "lastRow");

        //update counter
        countAsInt += 1;
        $(thisRow).find("#counterCell").html(countAsInt);

        //add " kr" to price
        $(thisRow).find("#priceCell").append(" kr");
        thisQuantity--;
        localStorage.setItem('counter' + idNRow + 'info', thisQuantity);
    }

});

$(document).on('click', '.minusButton', function () {

    //in order to get to the correct counter we must first step out of the plus button and then into the innerHTML of the parent id cell[1]
    var idOfRow = $(this).parent().parent().attr('id');
    var thisRow = $(this).parent().parent(); //parent is td, grandparent is row
    var countAsString = $(thisRow).find("#counterCell").html();
    var countAsInt = parseInt(countAsString);


    var idNRow = idOfRow.replace("row", "");
    var thisQuantity = localStorage.getItem('counter' + idNRow + 'info');
    thisQuantity++;
    localStorage.setItem('counter' + idNRow + 'info', thisQuantity)
	
    //either  remove row or decrease counter
    if (countAsInt < 2) {
	    
	beverageCounterM -= 1;
        var priceOneBottle = priceOneBottleFromBottles(idOfRow);
        updateTotal(-priceOneBottle, "lastRow");
        $('#' + idOfRow + '').remove(); 
    }
    else {
        //beverageCounterM -= 1;
        //update counterCell
        $(thisRow).find("#counterCell").html(countAsInt);

        //SUM TOTALS:
        //we have to find the price of 1 bottle, not all of them. 
        var totalPriceAsString = $(thisRow).find("#priceCell").html();
        totalPriceAsFloat = parseFloat(totalPriceAsString);
        var priceOneBottle = totalPriceAsFloat / countAsInt;
        updateTotal(-priceOneBottle, idOfRow);
        updateTotal(-priceOneBottle, "lastRow");

        //update counter
        countAsInt -= 1;
        $(thisRow).find("#counterCell").html(countAsInt);
	    
	//add " kr" to price
        $(thisRow).find("#priceCell").append(" kr");
    }
});

$(document).on('click', '#buyButton', function () {
    alert("You have bought and will now be logged out!");
});

$(document).on('click', '#abortButton', function () {
    $("#cart tr").slice(1, -2).remove();

    //the sum total needs resetting 
    var totalPriceAsString = $("#cart").find("#sumTotal").html();
    totalPriceAsFloat = parseFloat(totalPriceAsString);
    //console.log("adsfadsf: " + totalPriceAsFloat);
    updateTotal(-totalPriceAsFloat, "lastRow");

    beverageCounterM = 0; 
    

});

function updateTotal(thePrice, rowIdNoHash) {
    //the prices are strings so has to be converted: 
    var oldPriceAsString = document.getElementById(rowIdNoHash).cells[4].innerHTML;
    var oldPriceAsFloat = parseSentenceForNumber(oldPriceAsString);
    oldPriceAsFloat = parseFloat(oldPriceAsFloat);
    oldPriceAsFloat = oldPriceAsFloat || 0;

    var newPrice = oldPriceAsFloat + thePrice;
    newPrice = Math.round(newPrice * 100) / 100;
    document.getElementById(rowIdNoHash).cells[4].innerHTML = newPrice;
	
    $("#sumTotal").append(" kr");

    //the last row will also always be updated
}

function priceOneBottleFromBottles(rowIdNoHash) {
    var numberOfBottlesAsString = $('#' + rowIdNoHash + '').find("#counterCell").html();
    var numberOfBottlesAsInt = parseInt(numberOfBottlesAsString);

    var totalPriceAsString = $('#' + rowIdNoHash + '').find("#priceCell").html();
    totalPriceAsFloat = parseFloat(totalPriceAsString);
    var priceOneBottle = totalPriceAsFloat / numberOfBottlesAsInt;
    //console.log("priceOneBottle: " + priceOneBottle);
    return priceOneBottle;
}

function parseSentenceForNumber(sentence) {
    var matches = sentence.match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
    return matches && matches[0] || null;
}

//maybe this can be removed? 
function dropped(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}





