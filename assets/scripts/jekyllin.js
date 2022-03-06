const initNavs = [
    '#forward',
    '#behind',
    '#about'
]

const activeNavs = [
    '#newForward',
    '#newBehind'
]

//We need some recursive foolishness, otherwise we load the footer each time.  Since a footer only has three
//states (begin, middle, end), we don't really want to request a new footer when the majority of the time the 
//we'll be in the middle state.  The current implementation works for the first load, but on further loads we 
//also need to take the links relevant to the page loaded and inject them into the onclick event for the navigation
//button.  Crack this nut tomorrow.

function setFetchContent(selector, link) {
     // Now we add event listeners for both forward and back that will load the new information over the old one.
     document.querySelector(selector).onclick = () => {
        fetch(link, { method: "GET" })
        .then(response => response.text())
        .then(data => {
            // Get new data, maybe add a transition here for less jarring effect
            document.querySelector('main').innerHTML = data            
        })
        .catch(error => console.error(error))
    }
}

function morphLink(selector) {
    // We'll use jekyll to pass these links forward, then replace them with a top of screen href.
    if (!document.querySelector(selector)) {
        return null
    }      
    const link = document.querySelector(selector).href
    document.querySelector(selector).href = '#'

    // Now we add event listeners for both forward and back that will load the new information over the old one.
    fetchContent(selector, link)
    
    document.querySelector(selector).onclick = () => {
        fetch(link, { method: "GET" })
        .then(response => response.text())
        .then(data => {
            // Get new data, maybe add a transition here for less jarring effect
            document.querySelector('main').innerHTML = data
            //Update links            
        })
        .catch(error => console.error(error))
    }
}   

document.addEventListener("DOMContentLoaded", () => {
    navs.forEach(nav => morphLink(nav))
})