const DeviceSchema = {

    create: {
        "type" : "object",
        "properties": {
            "deviceid": { "type": "string" },
            "devicename": { "type": "string" },
            "longitude": {"type": "string"},
            "latitude": {"type": "string"} ,
            "description": { "type": "string" },
            "filename": {"type" : "string"}
        },
        "required": ["devicename", "deviceid"],
        "additionalProperties": false
    }

}

export { DeviceSchema }