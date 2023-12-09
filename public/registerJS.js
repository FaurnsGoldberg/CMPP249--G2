function validateLogin(loginForm){ // Unused?
    var mysql = require('mysql');
    var con = mysql.createConnection({
    host: "localhost",
    user: "traveldbadmin",
    password: "tdba123",
    database: "travelexperts"
    });
    var tryUsername;
    var tryPassword;
    var userId;
    con.connect(function(err) {
        if (err) throw err;
        var querytext = "SELECT CustomerId FROM customers WHERE CustUsername = '"+tryUsername+"' AND CustPassword = '"+tryPassword+"'";
        con.query(querytext, function (err, result, fields) {
            if (err) throw err;
            userId = result[0];
            console.log(userId);
        });
    });
    if(userId){

    } else {
        
    }
}
function validateUsername(tryUsername){ // Unused.
    return true;
    /** 
    var mysql = require('mysql');
    var con = mysql.createConnection({
    host: "localhost",
    user: "traveldbadmin",
    password: "tdba123",
    database: "travelexperts"
    });
    con.connect(function(err) {
        if (err) throw err;
        var querytext = "SELECT CustomerId FROM customers WHERE CustUsername = '"+tryUsername+"'";
        con.query(querytext, function (err, result, fields) {
            if (err) throw err;
            if(!result.length){
                return true;
            } else{
                return false;
            }
        });
    });
    */

}
function validateForm(myform){ // Validates all the fields of the regsitration form
    hideValPopup();
    const checkForms = [];
    var errorMessage = "";
    checkForms.push(document.getElementById("pcode"));
    checkForms.push(document.getElementById("firstname"));
    checkForms.push(document.getElementById("lastname"));
    checkForms.push(document.getElementById("city"));
    checkForms.push(document.getElementById("streetaddress"));
    checkForms.push(document.getElementById("custemail"));
    checkForms.push(document.getElementById("custtel"));
    checkForms.push(document.getElementById("username"));
    checkForms.push(document.getElementById("password"));
    checkForms.push(document.getElementById("confpassword"));
    for(var elem of checkForms){ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
        if (elem.value == ""){
            
            errorMessage += "Please enter a " + elem.placeholder + ".<br>";
            elem.style.borderColor = "red";
        }
    }
    var postalField = document.getElementById("pcode");
    var exp = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i); // regex with canadian postal code validation
    var postal = postalField.value.trim().toUpperCase();				
    postalField.value = postal;
    if (!exp.test(postal)){
        errorMessage += "Please enter a valid postal code.<br>";
        postalField.style.borderColor = "red";
    }
    exp = new RegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i); //https://stackoverflow.com/a/16699507
    var phoneField = document.getElementById("custtel");
    if(!exp.test(phoneField.value)){
        errorMessage += "Please enter a valid 10 digit phone number.<br>";
        phoneField.style.borderColor = "red";
    }
    
    if (!errorMessage)
    {
        return true;
    }
    else
    {
        drawValPopup(errorMessage);
        return false;
    }
}

function registerScreen(){ // Makes the Registration page and background blur visible
    document.getElementById("screenblur").style.visibility = 'visible';
    document.getElementById("registerpopup").style.visibility = 'visible';
}
function closeRegister(){    // Makes the Registration page, background blur, requirements popup and validation popup invisible
    document.getElementById("screenblur").style.visibility = 'hidden';
    document.getElementById("registerpopup").style.visibility = 'hidden';
    document.getElementById("requirementspopup").style.visibility = 'hidden';
    document.getElementById("validationpopup").style.visibility = 'hidden';
}
var ReqPopParent; // holds the parent elem that most recently opened the Requirements Popup div. Used to make sure the Requirements Popup isn't 
function drawReqPopup(srcElem){    // Makes the Requirements Div visible and fills it with info based on the passed elem
    ReqPopParent = srcElem
    document.getElementById("requirementspopup").style.visibility = 'visible';
    switch(srcElem.id){
        case "username":
            document.getElementById("requirementspopup").innerHTML = "<h3>Username Must</h3>Be Unique<br>Have at least 6 characters"
            break;
        case "password":
            document.getElementById("requirementspopup").innerHTML = "<h3>Password Must</h3>Have 8 characters minimum<br>Have at least one number<br>Have at least one uppercase letter"
            break;
        case "pcode":
            document.getElementById("requirementspopup").innerHTML = "<h3>Postal Code</h3>Please enter a valid postal code<br>Ex: B1N 0A0"
            break;
        case "custtel":
            document.getElementById("requirementspopup").innerHTML = "<h3>Phone Number</h3>Your primary contact number, either mobile or homephone."
            break;
        case "buistel":
            document.getElementById("requirementspopup").innerHTML = "<h3>Business Phone Number</h3>Optionally, add the phone number for your business phone."
            break;
        case "confpassword":
            document.getElementById("requirementspopup").innerHTML = "<h3>Confirm Password</h3>Both password fields must match."
            break;
        
    }

}
function hideReqPopup(srcElem){ // Hides the req popup, but only if the passed Elem matches ReqPopParent
    if (srcElem == ReqPopParent){
        document.getElementById("requirementspopup").style.visibility = 'hidden';
    }
}
function drawValPopup(errStr){ // Make the Validation Popup visible, plus have it display the passed string.
    document.getElementById("validationpopup").style.visibility = 'visible';
    document.getElementById("validationpopup").innerHTML = errStr;
    }

function hideValPopup(){ // Hide validation popup.
    document.getElementById("validationpopup").style.visibility = 'hidden';0
}
