$(document).ready(function(){
  
      $(".input" ).focusin(function() {
          $( this ).find("span").animate({"opacity":"0"}, 200);
        });
        
        $(".input").focusout(function() {
          $( this ).find( "span" ).animate({"opacity":"1"}, 300);
        });
    
        $("#loginform").submit(function(){
            var email=$("#loginform input[name=email]").val();
            var pass=$("#loginform input[name=password]").val();
            var valid=checkEmailValid(email);
            if(!valid){
                $(".emailerror").show();
                return ;
            }
            $(".emailerror").hide();
            $("#login").css("color","white");
            var promise=signIn(email,pass);
            promise.done(function(data,status)
            {
//                debugger;
                if(data.status==200){
                  $("#login i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
                  manageLoginUi(true);
                  $(".feedback").html(data.message); 
                  if(window.localStorage){
                      localStorage.setItem("token",btoa(email+":"+pass));
                      localStorage.setItem("session_token",data.data.admin_session_token);
                      localStorage.setItem("dam_obj",data.data.user.dam_id);
                  }
                  else{
                      alert("Your Browser doesnt support localStorage, Contact SIH team !")
                  }
                  location.href="index.html"    
                }
                else{
                     manageLoginUi(false);
                      $(".feedback").html(data.error[0]);
                }
            }).fail(function(error,a,xhr){
                  console.log(xhr);
                  manageLoginUi(false);
                  $(".feedback").html(error.responseJSON.message);
            });
        });
        
        $("#signupform").submit(function(){
            var name=$("#signupform input[type=text]").val();
            var email=$("#signupform input[name=email]").val();
            var mobile=$("#signupform input[name=tel]").val();
            var pass=$("#signupform input[name=password]").val();
            var passconf=$("#signupform input[name=confpassword]").val();
//            var valid=checkEmailValid(email);
//            debugger;
//            if(!valid){
//                $(".emailerror").show();
//                return ;
//            }
            if(pass!=passconf){
                $(".confpasserror").hide();    
                return ;    
            }
            $(".confpasserror").hide();    
//            $(".emailerror").hide();
            $("#signup").css("color","white");
            var promise=createUser(name,email,mobile,pass);
            promise.done(function(data)
            {   
               if(data.status==200||data.status==201){    
               $("#signup i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
                  manageLoginUi(true);
                  if(window.localStorage){
                      localStorage.setItem("token",btoa(email+":"+pass));
                      localStorage.setItem("sign-up",btoa(data));
                      $(".feedback").html(data.message);
                      setTimeout(function(){
                          $("#loginform").show();
                          $("#signupform").hide();
                          reset();
                      },4000);
                  }
                  else{
                      alert("Your Browser doesnt support localStorage, Contact SIH team !")
                  }
            }
            else{
                manageLoginUi(false);
                $(".feedback").html(data.error[0]);
             }
             }).fail(function(a,b,xhr){
                console.log(xhr)
              });
            
  });
});

var origin="http://159.89.173.33:3000/";

function signIn(email,pass){
 var settings = {
  "async":true,
  "crossDomain":true,
  "url": origin+"admin_registration/login?email="+email+"&password="+pass,
  "method": "POST"
 }
 return $.ajax(settings);
}
//
//function createUser(name,email,mobile,pass){
//  var settings = {
//  "async": true,
//  "crossDomain": true,
//  "url": origin+"admin_registration/login?name="+name+"&email="+email+"&phone_number="+mobile+"&password="+pass,
//  "method": "POST"
//  }
// return $.ajax(settings);
//}

function manageLoginUi(testpass){
    if(testpass){
          $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
                  $(".feedback").show().animate({"opacity":"1", "bottom":"-75px"}, 400);
                  $("input").css({"border-color":"#2ecc71"});
                  $("legend,.feedback").removeClass("orange").addClass("green");
        
    }
    else {
        $(".submit").css({"background":"orangered", "border-color":"orangered"});
                      $(".feedback").show().animate({"opacity":"1","bottom":"-75px"}, 400);
                      $("input").css({"border-color":"orangered"});
                      $("legend,.feedback").addClass("orange");
                      
    }
}

function reset(){
    $("input").val("");
    $(".emailerror,.confpasserror").hide();
    $("legend,.feedback").removeClass("orange").removeClass("green");
    $(".feedback").hide();  
    $(".submit").css({"background":"#EDEDED", "border-color":"#2196F3"});
    $("input").css({"border-color":"#EDEDED"});
                  
}

function checkMobileValid(number){
    if(number.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && ! (number.match(/0{5,}/)))
     {console.log("valid",number); return true;}
    else return false;
}

function checkEmailValid(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}