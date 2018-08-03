type UUID = string;

interface message {
  uuid : UUID;
  message : any;
}

interface  updateMessage {
    new_message: any;
    old_hash : Hash;
}
