# Post Function for UI of the HoloChat

## ZomeName:  profiles

### register(User_details)
> User_details:
{
  "title": "Profile Schema",
  "type": "object",
  "properties": {
    "agent_id": {
      "type": "string"
    },
    "agent_hash": {
        "type": "string"
      },
    "username": {
      "type": "string"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "avatar": {
      "type": "string"
    }
  },
    "required": ["agent_id", "username", "firstName", "lastName", "email"]
}


### isRegistered()
Details: Check if the user is registered
Returns: true - > if User is register | false - > if User is not-register

### getProfile()
Details: Get the users profile details
Returns:
> User_details:
{
  "title": "Profile Schema",
  "type": "object",
  "properties": {
    "agent_id": {
      "type": "string"
    },
    "agent_hash": {
        "type": "string"
      },
    "username": {
      "type": "string"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "avatar": {
      "type": "string"
    }
  },
    "required": ["agent_id", "username", "firstName", "lastName", "email"]
}


### updateProfile()
Details: If the user needs to update the profile details
Input:
> User_details:
{
  "title": "Profile Schema",
  "type": "object",
  "properties": {
    "agent_id": {
      "type": "string"
    },
    "agent_hash": {
        "type": "string"
      },
    "username": {
      "type": "string"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "avatar": {
      "type": "string"
    }
  },
    "required": ["agent_id", "username", "firstName", "lastName", "email"]
}

Returns: hash -> if succesfully updated
        "NotRegistered" -> if the user is not registered


## ZomeName: rooms

### listRooms()
Details : Returns all the rooms on the App
Input : None
Returns :
>    {"id":"Hash of the Room",
      "name":"Name of the Room",
      "purpose":"The Purpose of the Room"}

### newRoom(room)
Details : Call to create new Rooms
Input :
> {"name":"Name of the Room",
        "purpose":"The Purpose of the Room"}

Returns : Hash of the room that can be used as an ID

## ZomeName: messages

### newMessage()
**Details:** used to post messages (Note: timestamp is applied from the back end)
**Input:**
message.json:
 {"author":{"type": "string"},
		"avatar":{"type": "string"},
		"content": {
	         "text":{"type": "string"},
				"imageLink":{"type": "string"},
				"videoLink":{"type": "string"}
			},
		"timestamp": {"type": "string"},
		"room_name": {"type": "string"},
		"inReplyTo": {"type": "string"}
	},
    "required": ["author","room_name","content"]
}

**Returns:** Hash of the entry --> us as ID of the message

### getMessage()
**Details:** get messages for a specific Room
**Input:**{room_name:""}

**Returns:** Array of messages in this format [{Entry:{},Hash:""},{Entry:{},Hash:""},...]


### updateMessage()
**Details:** update messages for a specific Room
**Input:**{new_message:"",old_Hash:""}
(Note: the old_Hash is the ID that the messaged used & new Message has the same message.json format as above)

**Returns:** Array of messages in this format [{Entry:{},Hash:""},{Entry:{},Hash:""},...]
