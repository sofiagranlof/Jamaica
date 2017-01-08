
//This is a separate document because most of the functions used here require that the document is totally loaded. 
//Most importantly there is no loading from the database in here. 

$(document).ready(function () {

    //This is testing code to make it easier to see that jQuery works
    //$("#top_header").hide(200).slideDown(300); 
    //$('li').append("");
    //$(document).on('click', '.panel-button', function () { //'.panel-button'
    //    console.log("panel_button");
    //    //$('#myDiv').toggle();
    //    var panelId = $(this).attr('data-panelid');

    //    console.log("panelId: " + panelId);
    //    $('#' + panelId).toggle();

    //    $("afadsfadsf").appendTo(document.getElementById("usersTable").rows[1].cells[3]);

    //    var uuu = $('<p>hujhjh</p>');
    //    $(uuu).appendTo(document.getElementById("usersTable").rows[1].cells[4]); 

    //});

    //(index) The below 3 functions are used by drag and drop
    
   


    //this loop dynamically creates edit buttons for the loaded user rows and HTML for the beverages
    //after this loop is finished each row will have this jQuery code that will wait for events:  BEWARE j will always be 80 if alert put here use rowNumberInt instead
    for (var j = 0; j < 80; j++) { //perhaps payload.length

        



        //the edit user info is only generated when the user presses the button
         $(document).on('click', '#' + j + 'editUserButton', function () {
            
            var rowNumberString = $(this).attr('id');
            var rowNumberInt = parseInt(rowNumberString) + 2;
            
            //alert("The user " + firstName + " " + lastName + " will be changed using a jQuery form");

            //MODAL WINDOW (based on w3Schools template at http://www.w3schools.com/howto/howto_css_modals.asp -----------------------------------------------------------
            //Now that the row index has been got a modal window can be created with this info. 
            var modal = document.getElementById('myModal');

            //console.log("rowNumberInt: " + rowNumberInt); 

            // Get the button that opens the modal
            rowNumberInt -= 1; 
            var btn = document.getElementById(rowNumberInt + "editUserButton");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            // When the user clicks on exit button <span> (x), close the modal and remove added HTML
            span.onclick = function () {
                modal.style.display = "none";
                $("#jQueryForm").remove();
            }

            // When the user clicks anywhere outside of the modal, close it and remove added HTML
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    $("#jQueryForm").remove(); 
                }
            }
            
           var first = document.getElementById("usersTable").rows[0].cells[0].innerHTML; 
             
           if(first == "First Name" || first == "Förnamn"){
            
            //get the userInfo used to generate HTML below
            var firstName = document.getElementById("usersTable").rows[rowNumberInt].cells[0].innerHTML;
            var lastName = document.getElementById("usersTable").rows[rowNumberInt].cells[1].innerHTML;
            var email = document.getElementById("usersTable").rows[rowNumberInt].cells[2].innerHTML;
            var phone = document.getElementById("usersTable").rows[rowNumberInt].cells[3].innerHTML;


            // var spawnModalHTML = $('<button id = "editUserButton">Edit</button>');
            var spawnModalHTML = $(
                '<div id="jQueryForm">' +
                    '<h3>Edit ' + firstName + ' ' + lastName + '</h3>' +
                    '<label for="firstName" class="ui-hidden-accessible">First Name:</label>' +
                    '<input type="text" name="user" id="firstName" placeholder="' + firstName + '">' +
                    '<label for="lastName" class="ui-hidden-accessible">Second Name:</label>' +
                    '<input type="text" name="user" id="lastName" placeholder="' + lastName + '">' +
                    '<label for="eMail" class="ui-hidden-accessible">eMail:</label>' + 
                    '<input type="text" name="eMail" id="eMail" placeholder="' + email + '">' + 
                    '<label for="phone" class="ui-hidden-accessible">Phone:</label>' + 
                    '<input type="text" name="phone" id="phone" placeholder="' + phone + '">' +
                    '<input type="submit" data-inline="true" value="Save Edits">' + 
                '</div(>');
           }
               else{
             if(first == "Username" || first == "Användarnamn"){
                      
                     //get the userInfo used to generate HTML below
            var username = document.getElementById("usersTable").rows[rowNumberInt].cells[0].innerHTML;
            var firstname = document.getElementById("usersTable").rows[rowNumberInt].cells[1].innerHTML;
            var lastname = document.getElementById("usersTable").rows[rowNumberInt].cells[2].innerHTML;
            var balance = document.getElementById("usersTable").rows[rowNumberInt].cells[3].innerHTML;


            // var spawnModalHTML = $('<button id = "editUserButton">Edit</button>');
            var spawnModalHTML = $(
                '<div id="jQueryForm">' +
                    '<h3>Edit the Balace of ' + firstname + ' ' + lastname + '</h3>' +
                    '<label for="balance" class="ui-hidden-accessible">Balance:</label>' + 
                    '<input type="text" name="balance" id="balance" placeholder="' + balance + '">' +
                    '<input type="submit" data-inline="true" value="Save Edits">' + 
                '</div(>');
                   }
                 else{  if(first == "Name" || first =="Namn"){
                        
            //get the userInfo used to generate HTML below
            var name = document.getElementById("usersTable").rows[rowNumberInt].cells[0].innerHTML;
            var sblp = document.getElementById("usersTable").rows[rowNumberInt].cells[1].innerHTML;
            var pubp = document.getElementById("usersTable").rows[rowNumberInt].cells[2].innerHTML;
            var count = document.getElementById("usersTable").rows[rowNumberInt].cells[3].innerHTML;
            var price = document.getElementById("usersTable").rows[rowNumberInt].cells[4].innerHTML;


            // var spawnModalHTML = $('<button id = "editUserButton">Edit</button>');
            var spawnModalHTML = $(
                '<div id="jQueryForm">' +
                    '<h3>Edit ' + name  + '</h3>' +
                   '<label for="sblp" class="ui-hidden-accessible">SBL Price:</label>' +
                    '<input type="text" name="sblp" id="sblp" placeholder="' + sblp + '">' +
                    '<label for="pubp" class="ui-hidden-accessible">Pub price:</label>' + 
                    '<input type="text" name="pubp" id="pubp" placeholder="' + pubp + '">' + 
                    '<label for="price" class="ui-hidden-accessible">Price:</label>' + 
                    '<input type="text" name="price" id="price" placeholder="' + price + '">' +
                    '<label for="instock" class="ui-hidden-accessible">In Stock:</label>' + 
                    '<input type="text" name="pubp" id="pubp" placeholder= "Max 10 units">' +
                    '<input type="submit" data-inline="true" value="Save Edits">' + 
                '</div(>');
                               
                    }            
                  }  
                }
               
            
  $(spawnModalHTML).appendTo(document.getElementById("myForm"));


        }); //.on('click', '#' + j + 'editUserButton'
    }//for loop


    

    //for each of the beers in the index page
    for (var i = 0; i < 1; i++) { //perhaps payload.length

       


        ////DRAG&DROP --------------------------------------------
        //$(document).on("drag", function (event) {
        //    //event.dataTransfer.setData("text", event.target.id);
        //});

        //$(document).on("dragover", function (event) {
        //    //event.preventDefault();
        //    //event.stopPropagation();
        //    //$(this).addClass('dragging');
        //});

        ////when a dragged element or text selection leaves a valid drop target.
        //$(document).on("dragleave", function (event) {
        //    //event.preventDefault();
        //    // event.stopPropagation();
        //    // $(this).removeClass('dragging');
        //});


        

        //$(document).on("drop", function (event) {


        //    var rowNumberString = $(this).attr('id');
        //    var rowNumberInt = parseInt(rowNumberString) + 1;


        //    //create empty div inside cart where the dragged bottle can be put. 
        //    var newHTML = $('<li>aadsfdsfa</li>');
        //    // $(newHTML).appendTo(document.getElementsByClassName("cart"));

        //    //collect a copy of the bottle info
        //    var nodeCopy = document.getElementById("bottleCartInfoFromRow0Cell0").cloneNode(true);
        //    nodeCopy.id = "newId";


        //    $(".cart").append(newHTML);

            


        //    var fff = $("#193002").attr('id');
        //    console.log(fff); 

           

        //    //$("#newId").css("background", "red");

            
            

        //    //get all the HTML info to build a new HTML


        //    //var myCell = document.getElementById("drinktable").rows[0].cells[4].innerHTML;
        //    //$(".cart").append(myCell);



        //    //ev.preventDefault();
        //    var data = event.dataTransfer.getData("Text");
        //    var copyimg = document.createElement("img");
        //    copyimg.setAttribute("src", "images/hydrangeas.jpg");
        //    copyimg.setAttribute("height", "150");
        //    copyimg.setAttribute("width", "75");
        //    var original = document.getElementById(data);
        //    copyimg.src = original.src;
        //    ev.target.appendChild(copyimg);


        //});



        //$('#test').draggable({
        //    start: function (event, ui) {
        //        console.log(event);
        //        console.log(ui);
        //    }
        //});

    }//for loop



}); //document ready


//This is where the drop-down menu is created
$("<select />").appendTo("nav");

// Create default option "Menu"
$("<option />", {
   "selected": "selected",
   "value"   : "",
   "text"    : "Menu"
}).appendTo("nav select");

// Populate dropdown with menu items
$("nav a").each(function() {
 var el = $(this);
 $("<option />", {
     "value"   : el.attr("href"),
     "text"    : el.text()
 }).appendTo("nav select");
});
$("nav select").change(function() {
  window.location = $(this).find("option:selected").val();
}); //End of drop-down menu





//function drag(ev) {
//    ev.dataTransfer.setData("text", ev.target.id);
//}

//function dropcopy(ev) {
//    ev.preventDefault();
//    var data = ev.dataTransfer.getData("Text");
//    var copyimg = document.createElement("img");
//    //copyimg.setAttribute("src", "images/hydrangeas.jpg");
//    copyimg.setAttribute("height", "150");
//    copyimg.setAttribute("width", "75");
//    var original = document.getElementById(data);
//    copyimg.src = original.src;
//    ev.target.appendChild(copyimg);


//    //local variables used to generate HTML below
//    //var price =

//    // document.getElementById("drinktable").rows[i].cells[k].innerHTML =
//    //            '<div class="aBeverage"><img id=' + payload[beerindex].beer_id +
//    //                ' width="70px" height="150px"src=Pictures/' + payload[beerindex].beer_id +
//    //                '.png draggable="true"ondragstart="drag(event)"><br>' + payload[beerindex].namn +
//    //                '<br>' + payload[beerindex].namn2 + '<br> Price: ' + payload[beerindex].price +
//    //            '</div>'


//    var spawnCartHTML = $('<li><h3>adsfdsadsa</h3></li>');
//    $(spawnCartHTML).appendTo(document.getElementsByClassName("cart"));
//}

//function dropped(ev) {
//    ev.preventDefault();
//    var data = ev.dataTransfer.getData("text");
//    ev.target.appendChild(document.getElementById(data));

//}
