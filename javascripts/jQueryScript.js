
//This is a separate document because most of the functions used here require that the document is totally loaded. 

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


    //this loop dynamically creates edit buttons for the loaded user rows. 
    for (var j = 0; j < 80; j++) { //perhaps payload.length

        $(document).on('click', '#' + j + '', function () {
            
            var rowNumberString = $(this).attr('id');
            var rowNumberInt = parseInt(rowNumberString) + 1;
            
            //temp
            var fff = document.getElementById("usersTable").rows[rowNumberInt].cells[0].innerHTML;
            console.log("tryckte pa: " + fff); 

            var firstName = document.getElementById("usersTable").rows[rowNumberInt].cells[0].innerHTML;
            var lastName = document.getElementById("usersTable").rows[rowNumberInt].cells[1].innerHTML;

            alert("The user " + firstName + " " + lastName + " will be changed using a jQuery form");
        });
    }
});

