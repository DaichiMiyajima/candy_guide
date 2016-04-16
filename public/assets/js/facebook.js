// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
// The response object is returned with a status field that lets the
// app know the current login status of the person.
// Full docs on the response object can be found in the documentation
// for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        profileAPI(photosAPI);
    } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
        swal("Oops!", "We failed to fetch Facebook data. Try again.", "error");
    } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
        swal("Oops!", "We failed to fetch Facebook data. Try again.", "error");
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    if($("#formfacebookMessage").val().length !=0 && $('.active input[name=facebookAttendance]').val() && $('.active input[name=facebookFriends]').val() ){
        FB.login(function(response) {
            // handle the response
	        statusChangeCallback(response);
	    }, {scope: 'public_profile,email,user_photos'});
	    //FB.getLoginStatus(function(response) {
            //statusChangeCallback(response);
        //});
    }else if(!$('.active input[name=facebookAttendance]').val()){
        swal("Required!", "You should put Attendance radio button!", "error");
    }else if(!$('.active input[name=facebookFriends]').val()){
        swal("Required!", "You should put Friends radio button!", "error");
    }else{
        swal("Required!", "You should input all of the items!", "error");
    }	        
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '928494490576385',
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use version 2.2
    });
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        //statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.5&appId=928494490576385";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
var profileAPI = function(aCallback) {
    FB.api('/me' , { fields: 'id,name,gender,email'}, function(response) {
          aCallback(response);
    });
}
    
// Clarify the errors so that you can clarify the cause of problems.
var photosAPI = function(profileresponse) {
    FB.api("/me/picture",function (response) {
        if (response && !response.error) {
            /* handle the result */
            $.ajax({
	            url  : "/facebook",
    	        type : "post",
                timeout : 10000,
                async: true,
    	        data:{
                    formAttendance:$('.active input[name=facebookAttendance]').val(),
                    formFriends:$('.active input[name=facebookFriends]').val(),
                    formName:profileresponse.name,
                    formEmail:profileresponse.email,
                    picture:response.data.url,
                    formMessage:$("#formfacebookMessage").val(),
                    formFacebookId:profileresponse.id,
                }
                ,success : function(mysqlResult){console.log(mysqlResult);}
    	        ,error : function(mysqlResult){
                    swal("Oops!", "Connection disconnected. Try again later.", "error");
                    console.log(mysqlResult);
                }
    	    }).done(function(mysqlResult){
                if(mysqlResult.message == "success"){
                    swal("Registered!", "Your information has been registered.", "success");
                    console.log(mysqlResult);
                    $(".index").show();
                    $(".appForm").hide();
                    $("[id^='form']").val("");
                }else{
                    swal("Oops!", "Some trouble happen while ajax connecting. Try again later.", "error");
                    console.log(mysqlResult);
                }
            }).fail(function(mysqlResult){
                swal("Oops!", "Some trouble happen at the result of ajax connection. Try again later.", "error");
                console.log(mysqlResult);
            });
	    }else{
            swal("Oops!", "We failed to start connection. Try again later.", "error");
        }
    });
}
