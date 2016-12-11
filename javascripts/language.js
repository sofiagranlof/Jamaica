//Dictioanry with all strings
var langdict = {
        'welcome': {
            'en': 'Welcome to Jamaica Inn',
            'sv': 'V'+unescape("%E4")+'lkommen till Jamaica Inn',
        },
        'usernamelogin': {
            'en': 'Username    â˜œ',
            'sv': 'Anv'+unescape("%E4")+'ndarnamn â˜œ',
        },
        'passwordlogin': {
            'en': 'Password     â˜œ',
            'sv': 'L'+unescape("%F6")+'senord     â˜œ',
        },
        'login': {
            'en': 'Log In',
            'sv': 'Logga In',
        },
	   'buy': {
            'en': 'Buy Beverage',
            'sv': 'K'+unescape("%F6")+'p Dryck',
        },
        'history': {
            'en': 'View History',
            'sv': 'Se Historik',
        },
        'admin': {
            'en': 'Admin Options',
            'sv': 'Administrat'+unescape("%F6")+'r',
        },
        'logout': {
            'en': 'Log Out âŒ« ',
            'sv': 'Logga Ut âŒ« ',
        },
        'beverage': {
            'en': 'Beverage',
            'sv': 'Dryck',
        },
        'price': {
            'en': 'Price',
            'sv': 'Pris',
        },
        'date': {
            'en': 'Date &amp; Time',
            'sv': 'Datum &amp; Tid',
        },
        'userinfo': {
            'en': 'User Info',
            'sv': 'Anv'+unescape("%E4")+'ndarinfo',
        },
        'userbal': {
            'en': 'User Balances',
            'sv': 'Anv'+unescape("%E4")+'ndarsaldo',
        },
        'editbev': {
            'en': 'Edit Beverages',
            'sv': 'Editera Drycker',
        },
        'firstname': {
            'en': 'First Name',
            'sv': 'F'+unescape("%F6")+'rnamn',
        },
        'lastname': {
            'en': 'Last Name',
            'sv': 'Efternamn',
        },
        'phone': {
            'en': 'Phone',
            'sv': 'Telefon',
        },
        'edit': {
            'en': 'Edit',
            'sv': unescape("%C4")+'ndra',
        },
        'username': {
            'en': 'User Name',
            'sv': 'Anv'+unescape("%E4")+'ndarnamn',
        },
        'balance': {
            'en': 'Balance',
            'sv': 'Saldo',
	   },
        'email': {
            'en': 'E-Mail',
            'sv': 'E-Post',
        },
        'name': {
            'en': 'Name',
            'sv': 'Namn',
        },
        'sblprice': {
            'en': 'SBL Price',
            'sv': 'SBL Pris',
        },
        'pubprice': {
            'en': 'Pub Price',
            'sv': 'Pub Pris',
        },
        'price': {
            'en': 'Price',
            'sv': 'Pris',
        },
        'count': {
            'en': 'Count',
            'sv': 'Antal',
        },
        'yourcart': {
            'en': '<h4>YOUR CART</h4>',
            'sv': '<h4>DIN KUNDVAGN</h4>',
        },
        'sumtotal': {
            'en': 'SUM TOTAL:..........................',
            'sv': 'SUMMA:................................. ',
        }

};

                
//Get text from dictionary
function langGetText(dictkey){
	var lang = window.localStorage.getItem("lang");
     if(lang == null){
        lang = 'en';
     }
     
	var value = langdict[dictkey][lang];
     return value;
}

//Change text in an element
function langChangeText(elementid, dictkey){
     var text = langGetText(dictkey);
     document.getElementById(elementid).innerHTML = text;
}


//Change text in an placeholder
function langChangePlaceholderText(elementid, dictkey){
     var text = langGetText(dictkey);
     document.getElementById(elementid).placeholder=text;
}

//Change text in a button
function langChangeButtonText(elementid, dictkey){
     var text = langGetText(dictkey);
     document.getElementById(elementid).value=text;
}

//Change language
function langChange(language){
	window.localStorage.setItem("lang", language);
}


//Translate beverage menu
function langTranslateBeverageHeader(){
	langChangeText("buyid", "buy" );
     langChangeText("historyid", "history" );
     langChangeText("adminid", "admin" );
     langChangeText("logoutid", "logout" );
}

//Translate admin menu
function langTranslateAdminHeader(){
	langChangeText("userinfoid", "userinfo" );
     langChangeText("userbalid", "userbal" );
	langChangeText("editbevid", "editbev" );
     langChangeText("buyid", "buy" );
     langChangeText("logoutid", "logout" );
}


//Translate login page
function langTranslateLogin(){
     langChangePlaceholderText("username", "usernamelogin" );
     langChangePlaceholderText("password", "passwordlogin" );
     langChangeText("legend", "welcome" );
     langChangeButtonText("yourbuttonID", "login");
}

//Translate index page
function langTranslateIndex(){
     langTranslateBeverageHeader();

	langChangeText("CartName", "name" );
	langChangeText("CartPrice", "price" );
	langChangeText("myH", "yourcart" );
     langChangeText("sumtotal2", "sumtotal" );
     
}

//Translate history page
function langTranslateHistory(){
     langTranslateBeverageHeader();

	langChangeText("beverageid", "beverage" );
	langChangeText("priceid", "price" );
	langChangeText("dateid", "date" );
}

//Translate admin user page
function langTranslateAdminUserInfo(){
     langTranslateAdminHeader();
	
	langChangeText("FirstName", "firstname" );
	langChangeText("LastName", "lastname" );
	langChangeText("Email", "email" );
	langChangeText("Phone", "phone" );
	langChangeText("EditUser", "edit" );
}

//Translate admin balance page
function langTranslateAdminUserBalances(){
     langTranslateAdminHeader();
	
	langChangeText("UserName", "username" );
	langChangeText("FirstName", "firstname" );
	langChangeText("LastName", "lastname" );
	langChangeText("Balance", "balance" );
	langChangeText("EditBalance", "edit" );
}

//Translate admin drinks page
function langTranslateAdminDrinks(){
     langTranslateAdminHeader();
	
	langChangeText("SBLPrice", "sblprice" );
	langChangeText("PubPrice", "pubprice" );
	langChangeText("Price", "price" );
	langChangeText("Count", "count" );
	langChangeText("EditBalance", "edit" );
}


