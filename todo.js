const textbox = document.querySelector("#textbox")
const todo = document.querySelector("#to-do-container")
var alltodos = []

const getfromlocalstorage = () => {
    if (localStorage.getItem("todos") !== null) {
        let localarr = JSON.parse(localStorage.getItem("todos"))
        localarr.forEach(description => {
            let newtodo = document.createElement('li')
            newtodo.classList.add('to-do-list')
            newtodo.innerHTML = `<input type="checkbox" class="to-do-check" onclick = 'checkedbox(event)'><div class="to-do-description">${description}</div><button type="button" class="to-do-delete" onclick="deletetodo(event)"><img src="./cross.png"></img></button>`

            alltodos.push(newtodo)
        });
    }

}

getfromlocalstorage()

const addtodos = () => {
    let localarr = []
    todo.innerHTML = ''
    alltodos.forEach(element => {
        todo.appendChild(element)
        console.log(element.children[1].innerHTML)
        localarr.push(element.children[1].innerHTML)
    });
    localStorage.setItem('todos', JSON.stringify(localarr))
    console.log(JSON.parse(localStorage.getItem('todos')))
}

if (alltodos.length > 0) {
    addtodos()
}

textbox.addEventListener("keydown",
    function (event) {
        if (textbox.value.trim() !== '') {
            if (event.key === 'Enter') {
                let newtodo = document.createElement('li')
                newtodo.classList.add('to-do-list')
                newtodo.innerHTML = `<input type="checkbox" class="to-do-check" onclick = 'checkedbox(event)'><div class="to-do-description">${textbox.value}</div><button type="button" class="to-do-delete" onclick="deletetodo(event)"><img src="./cross.png"></img></button>`

                alltodos.push(newtodo)
                addtodos()
                textbox.value = ''
            }
            todo.scrollTop = todo.scrollHeight
        }
    }
)

const checkedbox = (event) => {
    description = event.target.nextElementSibling
    if (event.target.checked == true) {
        text = description.innerHTML
        description.innerHTML = `<strike>${text}</strike>`
    }
    else {
        text = description.children[0].innerHTML
        description.innerHTML = text
    }
}

const removetodo = (element) => {
    let temptodos = []
    alltodos.forEach(todo => {
        if (todo !== element) {
            temptodos.push(todo)
        }
    });
    alltodos = temptodos
    addtodos()
}

const deletetodo = (event) => {
    if (event.target.parentElement.classList.contains('to-do-delete')) {
        let button = event.target.parentElement
        if (button.parentElement.classList.contains('to-do-list')) {
            removetodo(button.parentElement)
        }
    }
}