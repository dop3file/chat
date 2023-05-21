document.addEventListener("DOMContentLoaded", function() {
    let ws = new WebSocket("ws://localhost:12345")
    send_button = document.getElementById("send_button")
    input_msg = document.getElementById("input_msg")
    messages = document.getElementById("message_container")
    ws.onopen = () => {
        console.log("Client connected!")
        send_button.onclick = () => {
            message = {
                "message": input_msg.value,
                "username": localStorage.getItem("login")
            }
            ws.send(JSON.stringify(message))
            input_msg.value = ""
        }

    }
    ws.onmessage = (message) => {
        let new_message = document.createElement("div");
        message_obj = JSON.parse(message.data)
        new_message.innerHTML = message_obj["username"] + " ~ " + message_obj["message"]
        messages.appendChild(new_message)
        console.log(message.data)
    }
}, false);

