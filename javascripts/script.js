
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


//the document ready jQuery that was here has been moved to a separate jquery document. 


/**********************/
/* Here starts the API*/
/**********************/
 
function getUsername(){
    var username = window.localStorage.getItem("username");
    return username
}

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

function getCredit(){
    var api = new APIConnect();    
    api.fetchIOU(credit);
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
        var myEditButton = $('<button id =' + i + 'editUserButton' + '>' + langGetText('edit') + '</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[i + 1].cells[4]);
    }

        //The button connection to the row can perhaps be moved here. 
    
	
    ////TEMP THIS IS A POPUP WINDOW FOR TESTING
    ////the popup div UNDERSTAND IT
    //var myTest = $('<p>KKKKK</p>');
    //var myPopupDiv = $('<div id ="hhh"><p>MYDIIIIV</p></div>');


    //var div = document.createElement('div');

    //div.className = 'row';

    //div.innerHTML = '<label>First Name</label>\
    //                <input type="text" name="name" value="" />\
    //                <input type="text" name="value" value="" />\
    //                <label> <input type="checkbox" name="check" value="1" /> Checked? </label>\
    //                <input type="button" value="Do edits!" onclick="removeRow(this)">';

    ////popup must be present in html
    //document.getElementById('popup').appendChild(div);

}

//Function determand if connection is correct
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

//Function that puts the username and password in the local storage
function testlogin(username, password){
    var api = new APIConnect();
    api.setUser(username, password);
    
    window.localStorage.setItem("username", username)
    window.localStorage.setItem("password", password)                
    window.localStorage.setItem("login", "FALSE");
    api.fetchIOU(login); 
}

//Function that checks if it is an admin
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

function testadmin(){
    var api = new APIConnect();    
    api.fetchUsers(admin);
}



//(index) INVENTORY 
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

            // document.getElementById("drinktable").rows[i].cells[k].innerHTML = responseString;
            // break;

            var newId = payload[beerindex].beer_id + "info"; 
            
            //here is where the HTML is changed to accomodate the beverage: 
            document.getElementById("drinktable").rows[i].cells[k].innerHTML =
            '<div class="beverage">' +
                '<img id=' + payload[beerindex].beer_id + ' width="175px" height="375px" src=Pictures/' + payload[beerindex].beer_id + '.png draggable="true"ondragstart="drag(event)">' + '<br>' +
                //'<div id="bottleCartInfoFromRow' + i + 'Cell' + k + '"">' +
                 '<div id=' + newId + '>' +
                //'<div id="bottleCartInfoFrom' + payload[beerindex].beer_id + '>' +
                    payload[beerindex].namn + '<br>' +
                    payload[beerindex].namn2 + '<br>' +
                    payload[beerindex].price + ' kr'
                '</div>' +
            '</div>'; 
            //"<img src=" + payload[i*5+k].beer_id + ".png><br>" + //payload[i*5+k].namn + "<br> Price: " + payload[i*5+k].price 

        }
    }

    //WHERE IS THIS USED? 
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


//(view history?) PURCHASES USER 

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
//(admin) purchasesAllAdmin/*
function getAllUsers(responseString) {
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
        var myEditButton = $('<button id =' + i + 'editUserButton' + '>Edit</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[i + 1].cells[4]);
    }
}*/

function getAllBalances(responseString) {
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

        document.getElementById("usersTable").rows[i + 1].cells[0].innerHTML = payload[i].username;
        document.getElementById("usersTable").rows[i + 1].cells[1].innerHTML = payload[i].first_name;
        document.getElementById("usersTable").rows[i + 1].cells[2].innerHTML = payload[i].last_name;
        document.getElementById("usersTable").rows[i + 1].cells[3].innerHTML = payload[i].assets;
        document.getElementById("usersTable").rows[i + 1].cells[4].innerHTML = "";

        //this creates a button in the rows cell 4 with the index as id
        var myEditButton = $('<button id =' + i + 'editUserButton' + '>' + langGetText('edit') + '</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[i + 1].cells[4]);
    }
}

function getAllDrinks(responseString) {
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
        row.insertCell();
        row.insertCell();

        document.getElementById("usersTable").rows[i + 1].cells[0].innerHTML = (payload[i].namn + " " +     payload[i].namn2);
        document.getElementById("usersTable").rows[i + 1].cells[1].innerHTML = payload[i].sbl_price;
        document.getElementById("usersTable").rows[i + 1].cells[2].innerHTML = payload[i].pub_price;
        document.getElementById("usersTable").rows[i + 1].cells[3].innerHTML = payload[i].count;
        document.getElementById("usersTable").rows[i + 1].cells[4].innerHTML = payload[i].price;
        document.getElementById("usersTable").rows[i + 1].cells[5].innerHTML = "";
        

        //this creates a button in the rows cell 4 with the index as id
        var myEditButton = $('<button id =' + i + 'editUserButton' + '>' + langGetText('edit') + '</button>');
        $(myEditButton).appendTo(document.getElementById("usersTable").rows[i + 1].cells[5]);
        
        var mycheckbox = $('<input type="checkbox" name="checkinstock">')
         $(mycheckbox).appendTo(document.getElementById("usersTable").rows[i + 1].cells[6]);
    }
}

////WHERE IS THIS FUNCTION USED? 
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

//JOHANS LATEST CHANGE
//JOHANS LATEST CHANGE

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropcopy(ev) {


    $(".beverageArea").css('background', 'none'); 
    //$("#beverageArea").css('display', 'block');

    ev.preventDefault(); //makes it droppable

    var idOfBottle = ev.dataTransfer.getData("Text");
    
    if ($("#cart").find('#row' + idOfBottle).length > 0) {
        alert("Press the + button to add one more of the same kind!");
    }
    else if (beverageCounterM > 7) {
        alert("A maximum of 8 beverage types can be added in the cart"); 
    }

    else {
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

$(document).off().on('click', '.plusButton', function () {

    beverageCounterM += 1;
    //in order to get to the correct counter we must first step out of the plus button and then into the innerHTML of the parent id cell[1]
    var idOfRow = $(this).parent().parent().attr('id');
    var thisRow = $(this).parent().parent(); //parent is td, grandparent is row
    var countAsString = $(thisRow).find("#counterCell").html();
    var countAsInt = parseInt(countAsString); 
    
  
    //e.stopImmediatePropagation(); //without this the button clicks twice

    //SUM TOTALS:
    //we have to find the price of 1 bottle, not all of them. 
    //var totalPriceAsString = $(thisRow).find("#priceCell").html();
    //totalPriceAsFloat = parseFloat(totalPriceAsString);
    //var priceOneBottle = totalPriceAsFloat / countAsInt;
    //console.log("priceOneBottle: " + priceOneBottle);

    var priceOneBottle = priceOneBottleFromBottles(idOfRow); 


    updateTotal(priceOneBottle, idOfRow);
    updateTotal(priceOneBottle, "lastRow");

    //update counter
    countAsInt += 1; 
    $(thisRow).find("#counterCell").html(countAsInt); 
    
    //add " kr" to price
    $(thisRow).find("#priceCell").append(" kr"); 

});

$(document).on('click', '.minusButton', function () {

    //in order to get to the correct counter we must first step out of the plus button and then into the innerHTML of the parent id cell[1]
    var idOfRow = $(this).parent().parent().attr('id');
    var thisRow = $(this).parent().parent(); //parent is td, grandparent is row
    //$(thisRow).css('background', 'red');
    var countAsString = $(thisRow).find("#counterCell").html();
    var countAsInt = parseInt(countAsString);

    //either  remove row or decrease counter
    if (countAsInt < 2) {
	
	beverageCounterM -= 1;
	    
        //SUM TOTALS:
        //we have to find the price of 1 bottle, not all of them. 
        //var totalPriceAsString = $(thisRow).find("#priceCell").html();
        //totalPriceAsFloat = parseFloat(totalPriceAsString);
        //var priceOneBottle = totalPriceAsFloat / countAsInt;

        var priceOneBottle = priceOneBottleFromBottles(idOfRow);


        updateTotal(-priceOneBottle, "lastRow");


        $('#' + idOfRow + '').remove(); 
    }
    else {

        //update counterCell
        $(thisRow).find("#counterCell").html(countAsInt);

        //SUM TOTALS:
        //we have to find the price of 1 bottle, not all of them. 
        var totalPriceAsString = $(thisRow).find("#priceCell").html();
        totalPriceAsFloat = parseFloat(totalPriceAsString);
        var priceOneBottle = totalPriceAsFloat / countAsInt;
        console.log("priceOneBottle: " + priceOneBottle);
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
    alert("You have bought!");
    console.log("SDfasdfdsf");
});

$(document).on('click', '#abortButton', function () {
    $("#cart tr").slice(1, -2).remove();

    //the sum total needs resetting 
    var totalPriceAsString = $("#cart").find("#sumTotal").html();
    totalPriceAsFloat = parseFloat(totalPriceAsString);
    console.log("adsfadsf: " + totalPriceAsFloat);
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
    //document.getElementById("lastRow").cells[4].innerHTML 


    //var lastRowString = document.getElementById("lastRow").cells[4].innerHTML;
    //var lastRowPriceString = parseSentenceForNumber(lastRowString);
    //lastRowPriceFloat = parseFloat(lastRowPriceString);
    //var lastRowNewPrice = lastRowPriceFloat + thePrice;
    //document.getElementById("lastRow").cells[4].innerHTML = lastRowNewPrice;
}

function priceOneBottleFromBottles(rowIdNoHash) {
    var numberOfBottlesAsString = $('#' + rowIdNoHash + '').find("#counterCell").html();
    var numberOfBottlesAsInt = parseInt(numberOfBottlesAsString);

    var totalPriceAsString = $('#' + rowIdNoHash + '').find("#priceCell").html();
    totalPriceAsFloat = parseFloat(totalPriceAsString);
    var priceOneBottle = totalPriceAsFloat / numberOfBottlesAsInt;
    console.log("priceOneBottle: " + priceOneBottle);
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



