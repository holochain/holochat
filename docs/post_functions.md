# Post Function for UI of the HoloChat

## ZomeName:  profiles

### register(User_details)
**Details: ** Call to register a user
**Input:**
User_details:
> {{
    "agent_id": {"type": "string"},
    "agent_hash": {"type": "string"},
    "username": {"type": "string"},
    "firstName": {"type": "string"},
    "lastName": {"type": "string"},
    "email": {"type": "string"},
    "avatar": {"type": "string"}
  },
    "required": ["agent_id", "username", "firstName", "lastName", "email"]
}

**Returns:** Hash of the profile


### isRegistered()
**Detail**: Check if the user is registered
**Input :** None
**Return**: true - > if User is register | false - > if User is not-register

### getMyAgentHash()
**Details**: Get App.Agent.Hash of the User
**Input :** None
**Return**: Agent_Hash


### getProfile(agent_hash)
**Detail**: Get the users profile details
**Input :** App.Agent.Hash
**Return**:
> {{
    "agent_id": {"type": "string"},
    "agent_hash": {"type": "string"},
    "username": {"type": "string"},
    "firstName": {"type": "string"},
    "lastName": {"type": "string"},
    "email": {"type": "string"},
    "avatar": {"type": "string"}
  },
    "required": ["agent_id", "username", "firstName", "lastName", "email"]
}


### updateProfile(user_details)
**Detail**: If the user needs to update the profile details
**Input:**
 User_details:
> {{
    "agent_id": {"type": "string"},
    "agent_hash": {"type": "string"},
    "username": {"type": "string"},
    "firstName": {"type": "string"},
    "lastName": {"type": "string"},
    "email": {"type": "string"},
    "avatar": {"type": "string"}
  },
    "required": ["agent_id", "username", "firstName", "lastName", "email"]
}

**Return**: hash -> if succesfully updated
        "NotRegistered" -> if the user is not registered


## ZomeName: rooms

### getPublicRooms()
**Details**: Returns all the rooms on the App
**Input :** None
**Returns**:
>   {"id":"Hash of the Room",
      "name":"Name of the Room",
      "purpose":"The Purpose of the Room"}

### newRoom(room)
**Details**: Call to create new Rooms (public|private)
**Input :**
> {"name":"Name of the Room",
        "access":"public|private"}

**Returns**: Hash of the room that can be used as an ID

### getRoomAdmin()
**Details:** Gets you the admin of the room
**Input:**
>{room_name:""}

**Returns:** Hash of the Admin Agent


### getMyPrivateRooms()
**Details:** Gets the private rooms you a member of, that is stored locally.
**Input:** None

**Returns:** names of the private rooms that the user is a member of



## ZomeName: messages

### newMessage()
**Details:** used to post messages (Note: timestamp is applied from the back end)
**Input:**
message.json: {"access":"public | private",
              "message":{{"author":{"type": "string"},
                      		"content": {
                      	         "text":{"type": "string"},
                      				"mediaLink":{"type": "string"}
                      			},
                      		"timestamp": {"type": "string"},
                      		"room_name": {"type": "string"}
                      	},
                          "required": ["author","room_name","content"]
                      }}
>  

**Returns:** Hash of the entry --> us as ID of the message

### getMessage()
**Details:** get messages for a specific Room
**Input:**
> {room_name:"","access":"public|private"}

**Returns:** Array of messages in this format [{Entry:{},Hash:""},{Entry:{},Hash:""},...]


### updateMessage()
**Details:** update messages for a specific Room
**Input:**
>{new_message:"",old_Hash:""}

(Note: the old_Hash is the ID that the messaged used & new Message has the same message.json format as above)

**Returns:** Hash of the entry --> us as ID of the message


## ZomeName: membership

### addMember()
**Details:** add members to a private room
**Input:**
> {room_name:"","agent_key":"%key%","agent_hash":"%agent%"}

**Returns:** Hash

### getMembers()
**Details:** get members of the private room
**Input:**
> {room_name:""}

**Returns:** List Of members
