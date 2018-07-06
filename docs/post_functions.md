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


## ZomeName: Rooms

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
