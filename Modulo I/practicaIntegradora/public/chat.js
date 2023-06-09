const socket = io()

socket.on('all-messages', (data) => {
    render(data)
})

function render(data){
    const html = data.map(el => {
        return (`
        <div class="card">
        <div class="card-body">
        <h5 class="card-title"> <strong> ${el.user} </strong> </h5>
        </div>
        <p class="card-text"> ${el.message} </p>
        </div>
        `)
    }).join(" ")
    document.getElementById('messagesBox').innerHTML = html
}

function addMessage(){
    const message = {
        user: document.getElementById('userEmail').value,
        message: document.getElementById('text').value
    }
    socket.emit('newMessage', message)
    return false
}


