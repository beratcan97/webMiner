let socket = new WebSocket("wss://magi.duinocoin.com:14808");

socket.onopen = function (event) {
    socket.send("JOB,andrson123,300");
};
socket.onmessage = async function (msg) {
    console.log(msg);
};