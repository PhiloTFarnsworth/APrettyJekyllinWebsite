const navs = [
    '#forward',
    '#behind'
]

// I don't really like to do this, but I also hate the idea of having to adjust order in more than one place.  The
// difficulty is that the github pages/Jekyll integration isn't completely up to date, so we cannot define custom 
// ordering in the main _config.yml.  While we could name our files or submit funny metadata and hijack the default
// blogging date scheme, that runs into the problem of having to edit all files if we insert something into the
// the middle of our faux manual.  So instead, we'll take the ugly but practical approach of defining order once as
// a constant here.
const order = [
    "dummyIndex.html",
    "contents.html",
    "why.html",
    "section.html",
    "data.html",
    "tables.html",
    "lists.html",
    "other.html",
    "form.html",
    "media.html",
    "satire.html",
    "epilogue.html"
]

//Since we're only serving from the index page, we should also set our browsing index to zero.  
let index = 0

//placeholder for scroll event, so we aren't checking scroll values every page
let scrollListener = null

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
                //Update links.  how do?  Well, we need to know which selector it is, then check where we are in the index
                //of our order constant and place link accordingly
                switch (selector) {
                    case '#forward':
                        //update index forward
                        index = index + 1
                        document.querySelector('#currentPage').innerHTML = index
                        //Check index, use the link from order to load forward.  If at end, disable(?) forward button.
                        if (index < order.length - 1) {
                            setFetchContent('#forward', order[index + 1])
                            document.querySelector('#behind').disabled = false
                            document.querySelector('#forward').disabled = false
                        } else {
                            document.querySelector('#forward').disabled = true
                        }
                        //backwards
                        setFetchContent('#behind', order[index - 1])
                        break;
                    case '#behind':
                        //see case '#forward'
                        index = index - 1
                        document.querySelector('#currentPage').innerHTML = index
                        if (index > 0) {
                            setFetchContent('#behind', order[index - 1])
                            document.querySelector('#behind').disabled = false
                            document.querySelector('#forward').disabled = false
                        } else {
                            document.querySelector('#behind').disabled = true
                        }
                        setFetchContent('#forward', order[index + 1])
                        
                        break;
                    default:
                        // will update when new directions are added
                        break;
                }

                const nav = document.querySelector('#siteNav')
                Array.from(nav.children).forEach(child => {
                    if (child.id !== 'toggleNav') {
                        const url = child.id.replace('Nav', '.html')
                        if (link === url) {
                            //set button disabled and visible
                            child.hidden = false
                            child.setAttribute('aria-hidden', false)
                            child.disabled = true
                        } else {
                            //set button hidden
                            child.hidden = true
                            child.setAttribute('aria-hidden', true)
                            child.disabled = true
                        }
                    }
                })
                //Add our scroll checker if page progress exists
                if (document.querySelector('#pageProgress')) {
                    scrollListener = document.addEventListener("scroll", () => {
                        //Page Progress
                        const yPos = Math.round(window.scrollY)
                        const yMax = Math.round(document.body.scrollHeight)
                        const progress = Math.round((yPos / yMax) * 100)
                        document.querySelector('#pageProgress').value = progress
                        document.querySelector('#progressSpan').innerHTML = progress
                    })
                } else {
                    if (scrollListener !== null) {
                        document.removeEventListener("scroll", scrollListener)
                        scrollListener = null
                    }
                }
                //Form handling
                if (document.querySelector("#exampleForm")) {
                    document.querySelector("#exampleForm").onsubmit = () => {
                        const text = document.querySelector('#formText').value
                        const numeral = document.querySelector('#formNumber').value
                        const ranger = document.querySelector('#formRange').value
                        const time = document.querySelector('#formDate').value
                        const yes = document.querySelector('#formBoxYes').checked ? 'YES' : 'NO'
                        const no = document.querySelector('#formBoxNo').checked ? 'NO' : 'YES'
                        const selection = document.querySelector('#formSelect').value
                        document.querySelector('#formResults').innerHTML = "Text: " +
                            text + " Number: " + numeral + " Range: " + ranger + " Time: " +
                            time + " Boxes: " + yes + ' ' + no + " Selection: " + selection
                        return false
                    }
                    //Clear Results
                    document.querySelector('#clearResults').onclick = () => {
                        document.querySelector('#formResults').innerHTML = "Form Cleared"
                    }
                }
            })
            .catch(error => console.error(error))
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setFetchContent('#forward', 'contents.html')
    populateNavLinks()
    document.querySelector('#about').onclick = () => {
        fetch("about.html", { method: "GET" })
            .then(response => response.text())
            .then(data => {
                document.querySelector('main').innerHTML = data
                document.querySelector('#currentPage').innerHTML = 'about'
                document.querySelector('#forward').disabled = true
                document.querySelector('#behind').onclick = () => {
                    fetch(order[0], { method: "GET" })
                        .then(response => response.text())
                        .then(data => {
                            document.querySelector('main').innerHTML = data
                            index = 0
                            document.querySelector('#currentPage').innerHTML = index
                            document.querySelector('#behind').disabled = true
                            setFetchContent('#forward', 'contents.html')
                            document.querySelector('#forward').disabled = false
                        })
                }
                document.querySelector('#behind').disabled = false
            })
            .catch(error => console.error(error))
    }
})

// Nav links need to:
// - Display button links to each page
// - Display the current page as a disabled button
// - Collapse and expand.

//How do?  Well, we start with all buttons defined in the HTML, but hidden.  On page initiation, we want to make visible/disable the home button,
//as well as associate all buttons with their navigation link.  Navigation links can be parsed from button ids.
function populateNavLinks() {
    const nav = document.querySelector('#siteNav')
    Array.from(nav.children).forEach(child => {
        if (child.id === 'toggleNav') {
            //For toggle nav, we want to swap the hidden and aria-hidden labels for all nav button on click, as well
            //as change the nav's aria-expanded to true.
            child.onclick = () => {
                if (child.dataset.active === 'true') {
                    // add offset to each item displayed
                    let offset = 0
                    Array.from(nav.children).forEach(kid => {
                        if (kid.id !== 'toggleNav') {
                            const url = kid.id.replace('Nav', '.html')
                            offset = offset - 20
                            if (url !== order[index]) {
                                const doAnimation = async () => {
                                    // Housekeeping
                                    document.querySelector('#toggleNav').disabled = true
                                    kid.disabled = true
                                    const anim = kid.animate([
                                        { hidden: "false", transform: 'translateY(0px)', height: '1.5rem', overflow: 'hidden', margin: '0.1rem' },
                                        { opacity: .3, transform: 'translateY(' + (offset / 2).toString() + 'px)', height: '.25rem', overflow: 'hidden', margin: '0rem', padding: '0' },
                                        { hidden: "true", opacity: 0, transform: 'translateY(' + offset.toString() + 'px)', height: '0.1rem', overflow: 'hidden', padding: '0' }
                                    ], {
                                        duration: 1000
                                    })
                                    await anim.finished
                                    document.querySelector('#toggleNav').disabled = false
                                    kid.disabled = true
                                    kid.hidden = true
                                    kid.setAttribute('aria-hidden', true)
                                }
                                doAnimation()
                                    .catch(error => console.error(error))
                            }
                        }
                    })
                    child.dataset.active = false
                    child.innerHTML = 'Expand Site Navigation'
                    nav.setAttribute('aria-expanded', false)
                } else {
                    // if not active, show all buttons
                    let offset = 0
                    Array.from(nav.children).forEach(kid => {
                        if (kid.id !== 'toggleNav') {
                            const url = kid.id.replace('Nav', '.html')
                            offset = offset - 20
                            if (url !== order[index]) {
                                const doAnimation = async () => {
                                    document.querySelector('#toggleNav').disabled = true
                                    kid.hidden = false
                                    const anim = kid.animate([
                                        { hidden: "true", opacity: 0, transform: 'translateY(' + offset.toString() + 'px)' },
                                        { opacity: .5, transform: 'translateY(' + (offset / 2).toString() + 'px)' },
                                        { hidden: "false", opacity: 1, transform: 'translateY(0px)' }
                                    ], {
                                        duration: 1000
                                    })
                                    await anim.finished
                                    kid.disabled = false
                                    kid.setAttribute('aria-hidden', false)
                                    document.querySelector('#toggleNav').disabled = false
                                }
                                doAnimation()
                                    .catch(error => console.error(error))
                            }
                        }
                    })
                    child.dataset.active = true
                    child.innerHTML = 'Collapse Site Navigation'
                    nav.setAttribute('aria-expanded', true)
                }
            }
        } else {
            // Ok, so for every child besides toggleNav, take the ID, slice the Nav off the end, and then graft '.html'
            // to the end of it. Bind a fetch to that link and you're gravy
            const url = child.id.replace("Nav", ".html")
            child.onclick = () => {
                fetch(url, { method: 'GET' })
                    .then(response => response.text())
                    .then(data => {
                        document.querySelector('main').innerHTML = data
                        index = order.findIndex((u) => u === url)
                        //Re-enable the previous button pressed and disable this button
                        Array.from(nav.children).forEach(kid => {
                            kid.id !== 'toggleNav' ? kid.disabled = false : ''
                        })
                        child.disabled = true
                        document.querySelector('#currentPage').innerHTML = index
                    })
                    .catch(error => console.error(error))
            }
        }
    })
}