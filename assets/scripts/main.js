document.addEventListener("DOMContentLoaded", () => {
    //Submit Form
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
        return false;
    };
    //Clear Results
    document.querySelector('#clearResults').onclick = () => {
        document.querySelector('#formResults').innerHTML = "Form Cleared"
    }
});

document.addEventListener("scroll", () => {
    //Page Progress
    const yPos = Math.round(window.scrollY)
    const yMax = Math.round(document.body.scrollHeight)
    const progress = Math.round((yPos / yMax) * 100)
    document.querySelector('#pageProgress').value = progress
    document.querySelector('#progressSpan').innerHTML = progress
})