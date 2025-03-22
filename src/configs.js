export const configs = {
    "amps": {
        "instanceName": "action-event-responder",
        "connectionString": "ws://localhost:9008/amps/json",
        "topics": {
            "inbound": "action-event-request",
            "outbound": "action-event-response"
        }
    }
}
