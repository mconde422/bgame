let mode = document.getElementById('mode')
let body = document.getElementById('body')
let saveTheme = localStorage.getItem("theme")
let start = document.getElementById('start')
let menuBtn = document.getElementById('menu-btn')
let menuBtn2 = document.getElementById('menu-btn2')
let menu = document.querySelector('.menu')
let navHeader = document.querySelector('.nav-header')
let header = document.querySelector('header')
let bandMenu = document.querySelector('.band-menu')
let btnMoreGame = document.querySelector('.more-game')
updateMode()


menuBtn.addEventListener('click', () => {
    menu.style.left = "0"
    menu.style.transition = "0.5s";
})
menuBtn2.addEventListener('click', () => {
    menu.style.left = "-50%"
    menu.style.transition = "0.5s";
})


if (saveTheme === "light") {
    body.classList.add('light')
}

function updateMode() {
    if (body.classList.contains('light')) {
        mode.innerHTML = "<i class='fi fi-rr-moon-stars'></i>"
    } else {
        mode.innerHTML = "<i class='fi fi-rr-sun'></i>"
    }
}

mode.addEventListener('click', () =>{
    body.classList.toggle("light")
    body.style.transition = "2s";
    if (body.classList.contains('light')) {
        localStorage.setItem("theme", "light")
    } else {
        localStorage.setItem("theme", "dark")
    }
    
    updateMode()
})

let totalPs4 = document.getElementById('totalTablePs4')
let totalPs2 = document.getElementById('totalTablePs2')

let jeuxTable = document.getElementById('jeuxTable')
let accessoirePs4 = document.getElementById('accessoireTablePs4')
let jeuxSelect = jeuxTable.value
let accessoireSelect = accessoirePs4.value
let minutePs4 = document.getElementById('minutePs4')
let minutePs4Select = minutePs4.value

let jeuxTable2 = document.getElementById('jeuxTable2')
let accessoirePs2 = document.getElementById('accessoireTablePs2')
let jeuxSelect2 = jeuxTable2.value
let accessoireSelect2 = accessoirePs2.value
let minutePs2 = document.getElementById('minutePs2')
let minutePs2Select = minutePs2.value

jeuxTable.addEventListener('change', (e) => {
    jeuxSelect = e.target.value
    prix()
})
accessoirePs4.addEventListener('change', (e) => {
    accessoireSelect = e.target.value
    prix()
})
minutePs4.addEventListener("change", (e) => {
    minutePs4Select = e.target.value
    prix()
})

jeuxTable2.addEventListener('change', (e) => {
    jeuxSelect2 = e.target.value
    prix()
})
accessoirePs2.addEventListener('change', (e) => {
    accessoireSelect2 = e.target.value
    prix()
})
minutePs2.addEventListener("change", (e) => {
    minutePs2Select = e.target.value
    prix()
    
})

let tarifs = {}
let tarifs2 = {}

fetch("tarifs.json")
    .then(res => res.json())
    .then(data => {
        tarifs = data.ps4
        tarifs2 = data.ps2
        prix()
    })


function prix() {
    const jeux = jeuxSelect
    const accessoire = accessoireSelect
    const minutePs4 = minutePs4Select

    if (!tarifs[jeux] || !tarifs[jeux][accessoire] || !minutePs4) {
        totalPs4.textContent = ""
        return
    }
    const tarifMinute = tarifs[jeux][accessoire]    
    const total = tarifMinute * Number(minutePs4Select)
    
    totalPs4.textContent = total.toLocaleString() + " FG"  
    
    const jeux2 = jeuxSelect2
    const accessoire2 = accessoireSelect2
    const minutePs2 = minutePs2Select
    
    if (!tarifs2[jeux2] || !tarifs2[jeux2][accessoire2] || !minutePs2) {
        totalPs2.textContent = ""
        return
    }
    const tarifMinute2 = tarifs2[jeux2][accessoire2]    
    const total2 = tarifMinute2 * Number(minutePs2Select)
    totalPs2.textContent = total2.toLocaleString() + "" + "FG" 
}

let inputDate = document.getElementById('date')

const today = new Date().toISOString().split('T')[0]

inputDate.value = today;
inputDate.min = today;

btnMoreGame.addEventListener('click', () => {
    window.location.href = "games.html"
})



