var activeRoom;
var active_room_name;

 function getMyProfile() {
   $.get("/fn/profiles/getProfile", "", function(profile){
     $("#title-username").text(JSON.parse(profile).firstName)
   });
 }
/*
 function register() {
   $.post("/fn/identity/registerDpkiKeyTo", "", function(arr){
     if(arr=="true"){
       $("#varified").text("Registered")
     }else{$("#varified").text("Not Registered")}
   });
 }
*/
 function getRooms() {
   $.get("/fn/rooms/getPublicRooms", "", function(rooms){
     rooms = JSON.parse(rooms)
     $("#rooms").empty()
     for(i=0;i<rooms.length;i++){
       $("#rooms").append(
         "<li data-id=\""+rooms[i].id+"\""+
             "data-name=\""+rooms[i].name+"\">"+
              "#"+rooms[i].name+
         "</li>"
       )
     }
     if(activeRoom) {
       setActiveRoom()
     }
   });
 }

 function addRoom() {
   var room = {
     name: $("#room-name-input").val(),
     access: "public"
   }
   $("#room-name-input").val('')
   $.post("/fn/rooms/newRoom", JSON.stringify(room), getRooms)
 }

 function selectRoom(event) {
   $("#rooms li").removeClass("selected-room")
   activeRoom = $(this).data('id')
   active_room_name = $(this).data('name')

   setActiveRoom()
 }

 function setActiveRoom() {
   var roomElement = $("#rooms li[data-id="+activeRoom+"]")
   $(roomElement).addClass("selected-room")
   $("#messages-header").text("Messages in #"+$(roomElement).data("name"))
   getMessages()
 }

function getMessages() {
  var hash = {room_name:active_room_name}
  console.log("Getting messages for room: "+hash)
  $.post("/fn/messages/getMessages", JSON.stringify(hash), function(messages){
    $("#messages").empty()
    messages = JSON.parse(messages)
    messages = messages.sort(function(a,b){
      timeA = new Date(a.Entry.timestamp)
      timeB = new Date(b.Entry.timestamp)
      return timeA > timeB
    })
    for(var i=0;i<messages.length;i++) {
      $("#messages").append("<li class=\"list-unstyled\">"+
         "<span class=\"timestamp\">"+messages[i].Entry.timestamp+"</span>"+
         "<span class=\"username\">"+messages[i].Entry.author+"</span>"+
         "<span class=\"message\">"+messages[i].Entry.content.text+"</span>"+
      "</li>")
    }
  });
}

 function sendMessage() {
   var text = $("#message-input").val()
   var message = {
     content: {"text":text},
     room_name: active_room_name
   }

   $.post("/fn/messages/newMessage", JSON.stringify(message), function(){
     $("#message-input").val("")
     getMessages()
   })
 }



 function doRegister(){
   var arg = {
     username: $("#signupUsername").val(),
     firstName: $("#signupFirstname").val(),
     lastName: $("#signupLastname").val(),
     email: $("#signupEmail").val()
   };
   console.log('signup clicked');
   $.post("/fn/profiles/register", JSON.stringify(arg),
     function(hash) {
       console.log('register: '+hash)
       $.post("/fn/profiles/isRegistered", "",
           function(registered) {
               console.log('registered: '+registered)
               if(JSON.parse(registered)) {
                 getMyProfile()
                 $('#registerDialog').modal('hide');
               } else {
                 $('#registerDialog').modal('show');
               }
           });
     },
     "json"
   );
 }

/*
//TODO this METHORD will retrive the post it has to be displayed
 function getTag (tag) {
    $.post("/fn/messages/getPostsByTag",tag,function(arr) {
     arr=JSON.parse(arr);
     console.log("posts: " + JSON.stringify(arr));
//TODO Display the posts

        }
    );
}
function openTag(){$('#tagDialog').modal('show');}

function passTag() {
    var hashtag = $("#tagHandle").val();
    getTag(hashtag);
    $('#tagDialog').modal('hide');
  }
*/
 $(window).ready(function() {
    $.post("/fn/profiles/isRegistered", "",
        function(registered) {

            if(!JSON.parse(registered)){
                $('#registerDialog').modal('show')
            } else {
                getMyProfile()
                getRooms()
            }

        }
    ).error(function(response) {
        $("#messages").html(response.responseText)
    });

    $("#signupButton").click(doRegister)
    $("#room-name-button").click(addRoom)
    $("#rooms").on("click", "li", selectRoom)
    $("#message-button").click(sendMessage)
    $('#tagButton').click(openTag);
    $('#submitTag').click(passTag);
    $('#register-toKey-button').click(register);

    $("#room-name-input").keyup(function(event){
        if(event.keyCode == 13) $("#room-name-button").click()
    })

    $("#message-input").keyup(function(event){
        if(event.keyCode == 13) $("#message-button").click()
    })

    setInterval(getMessages, 1000)
    setInterval(getRooms, 1000)
 });
