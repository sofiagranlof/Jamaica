
//This is a separate document because most of the functions used here require that the document is totally loaded. 
//Most importantly there is no loading from the database in here. 

$(document).ready(function () {


    //(index) The below 3 functions are used by drag and drop
  
    //this loop dynamically creates edit buttons for the loaded user rows and HTML for the beverages
    //after this loop is finished each row will have this jQuery code that will wait for events:  BEWARE j will always be 80 if alert put here use rowNumberInt instead
    for (var j = 0; j < 80; j++) { //perhaps payload.length

       //the edit user info is only generated when the user presses the button
         $(document).on('click', '#' + j + 'editUserButton', function () {
            
            var rowNumberString = $(this).attr('id');
            var rowNumberInt = parseInt(rowNumberString) + 2;
            
            //MODAL WINDOW (based on w3Schools template at http://www.w3schools.com/howto/howto_css_modals.asp -----------------------------------------------------------
            //Now that the row index has been got a modal window can be created with this info. 
            var modal = document.getElementById('myModal');

          

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


        }); 
    }//for loop


    

    //for each of the beers in the index page
    for (var i = 0; i < 1; i++) { //perhaps payload.length

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

