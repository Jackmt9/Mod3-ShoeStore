// Deliverable 1

fetch('http://localhost:3000/shoes')
.then(r => r.json())
.then(obj => obj.forEach(listing => createListing(listing)))

function createListing(listing){
    let blankLi = document.createElement('li')
    blankLi.class = 'list-group-item'
    blankLi.innerText = listing.name
    blankLi.addEventListener( "click", () => {
        getMain(listing.id) 
    })
    appendToList(blankLi)
}

function appendToList(li){
    let list = document.querySelector('#shoe-list')
    list.append(li)
}



// Deliverable 2

function getMain(index){
    fetch(`http://localhost:3000/shoes/${index}`)
    .then(r => r.json())
    .then(obj => createMain(obj))
}

function createMain(shoe){
    document.querySelector('#shoe-image').src = shoe.image
    document.querySelector('#shoe-name').innerText = shoe.name
    document.querySelector('#shoe-description').innerText = shoe.description
    document.querySelector('#shoe-price').innerText = shoe.price
    createForm(shoe)
    listReviews(shoe)
}

function createForm(shoe){
    let container = document.querySelector('#form-container')
    if (document.querySelector('#new-review')){
        document.querySelector('#new-review').remove()
    }

    let form = document.createElement('form')
    form.id = 'new-review'
    let div = document.createElement('div')
    div.class = 'form-control'
    let text = document.createElement('textarea')
    text.class = 'form-control'
    text.id = 'review-content'
    text.rows = '3'
    input = document.createElement('input')
    input.type = 'submit'
    input.class = "btn btn-primary"

    form.addEventListener('submit', (evt) => {
        evt.preventDefault()
        let userInput = evt.target['review-content'].value
        post(shoe, userInput)
        evt.target.reset()
    })
    container.appendChild(form)
    form.appendChild(div)
    div.appendChild(text)
    div.appendChild(input)
}

function listReviews(shoe){
    let reviewsList = document.querySelector('#reviews-list')
    clearReviews()
    shoe.reviews.forEach(review => {
    blankLi = document.createElement('li')
    blankLi.class = 'list-group-item'
    blankLi.innerText = review.content
    reviewsList.append(blankLi)
    })
}

function clearReviews(){
    document.querySelector('#reviews-list').innerHTML = ""
}

// Deliverable 3

function post(shoe, UserInput){
    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'   
        },
        body: JSON.stringify({
            content: UserInput
        })
    })
    .then(r => r.json())
    .then(obj => {
        index = shoe.id
        getMain(index)
    })
}