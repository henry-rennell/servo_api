const leftBar = document.querySelector('.right-side-bar')
const rightBar = document.querySelector('.left-side-bar')
const wrapper = document.querySelector('.wrapper')

window.addEventListener('keyup', handleKey)

function handleKey(e) {
    console.log(e)
    if (e.key == 'b') {
        leftBar.classList.toggle('hide')
        rightBar.classList.toggle('hide')
        wrapper.classList.toggle('hide')
    }

}