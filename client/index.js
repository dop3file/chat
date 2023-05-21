document.addEventListener("DOMContentLoaded", function() {
    let ws = new WebSocket("ws://localhost:12345")
    send_button = document.getElementById("send_button")
    input_msg = document.getElementById("input_msg")
    messages = document.getElementById("message_container")
    ws.onopen = () => {
        console.log("Client connected!")
        send_button.onclick = () => {
            ws.send(input_msg.value)
            input_msg.value = ""
        }

    }
    ws.onmessage = (message) => {
        let new_message = document.createElement("div");
        new_message.innerHTML = message.data
        messages.appendChild(new_message)
        console.log(message.data)
    }
}, false);

