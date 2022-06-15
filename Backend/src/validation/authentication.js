// Providing authentication scheme to check if incomming api request is valid
const AuthenticationSchema = {
  register: {
    body: {
      "type": "object",
      "properties": {
        "email": { "type": "string" },
        "username": {"type": "string"},
        "password": { "type": "string" },
      },
      "required": ["email", "password"]
    }
  },
  login: {
    body: {
      "type": "object",
      "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" },
      },
      "required": ["email", "password"]
    }
  }
}

export { AuthenticationSchema }