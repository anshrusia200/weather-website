// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//    response.json().then((data) => {
//        console.log(data)
//    })
// })

// const address = document.getElementById('address').innerText



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            let error = data.error
           document.getElementById('location').innerHTML = `${error}`
           document.getElementById('temp').innerHTML = `Can't detect temperature of an unknown location`

            
        }else{
            let loc = data.location
            let temp = data.Weather
           document.getElementById('location').innerHTML = `${loc}`
           document.getElementById('temp').innerHTML = `${temp}`
           
        }
    })
})
})