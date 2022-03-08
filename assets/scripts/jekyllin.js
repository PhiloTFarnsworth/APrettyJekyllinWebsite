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