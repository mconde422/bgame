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

if (mode) updateMode()

if (menuBtn && menu) menuBtn.addEventListener('click', () => {
    menu.style.left = "0"
    menu.style.transition = "0.5s"
})
if (menuBtn2 && menu) menuBtn2.addEventListener('click', () => {
    menu.style.left = "-100%"
    menu.style.transition = "0.5s"
})


if (body && saveTheme === "light") {
    body.classList.add('light')
}

function updateMode() {
    if (!mode) return
    if (body && body.classList.contains('light')) {
        mode.innerHTML = "<i class='fi fi-rr-moon-stars'></i>"
    } else {
        mode.innerHTML = "<i class='fi fi-rr-sun'></i>"
    }
}

if (mode) mode.addEventListener('click', () => {
    if (body) body.classList.toggle("light")
    if (body) body.style.transition = "2s"
    if (body && body.classList.contains('light')) {
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
let minutePs4 = document.getElementById('minutePs4')
let jeuxTable2 = document.getElementById('jeuxTable2')
let accessoirePs2 = document.getElementById('accessoireTablePs2')
let minutePs2 = document.getElementById('minutePs2')

let jeuxSelect = jeuxTable ? jeuxTable.value : ''
let accessoireSelect = accessoirePs4 ? accessoirePs4.value : ''
let minutePs4Select = minutePs4 ? minutePs4.value : ''
let jeuxSelect2 = jeuxTable2 ? jeuxTable2.value : ''
let accessoireSelect2 = accessoirePs2 ? accessoirePs2.value : ''
let minutePs2Select = minutePs2 ? minutePs2.value : ''

if (jeuxTable) jeuxTable.addEventListener('change', (e) => { jeuxSelect = e.target.value; prix() })
if (accessoirePs4) accessoirePs4.addEventListener('change', (e) => { accessoireSelect = e.target.value; prix() })
if (minutePs4) minutePs4.addEventListener("change", (e) => { minutePs4Select = e.target.value; prix() })
if (jeuxTable2) jeuxTable2.addEventListener('change', (e) => { jeuxSelect2 = e.target.value; prix() })
if (accessoirePs2) accessoirePs2.addEventListener('change', (e) => { accessoireSelect2 = e.target.value; prix() })
if (minutePs2) minutePs2.addEventListener("change", (e) => { minutePs2Select = e.target.value; prix() })

let tarifs = {}
let tarifs2 = {}

if (totalPs4 || totalPs2) {
    fetch("tarifs.json")
        .then(res => res.json())
        .then(data => {
            tarifs = data.ps4
            tarifs2 = data.ps2
            prix()
        })
}


function prix() {
    if (!totalPs4 || !totalPs2) return
    const jeux = jeuxSelect, accessoire = accessoireSelect, m4 = minutePs4Select
    if (!tarifs[jeux] || !tarifs[jeux][accessoire] || !m4) {
        totalPs4.textContent = ""
    } else {
        const total = tarifs[jeux][accessoire] * Number(m4)
        totalPs4.textContent = total.toLocaleString() + " FG"
    }
    const jeux2 = jeuxSelect2, accessoire2 = accessoireSelect2, m2 = minutePs2Select
    if (!tarifs2[jeux2] || !tarifs2[jeux2][accessoire2] || !m2) {
        totalPs2.textContent = ""
    } else {
        const total2 = tarifs2[jeux2][accessoire2] * Number(m2)
        totalPs2.textContent = total2.toLocaleString() + " FG"
    }
}

let inputDate = document.getElementById('date')

const today = new Date().toISOString().split('T')[0]

inputDate.value = today;
inputDate.min = today;

btnMoreGame.addEventListener('click', () => {
    window.location.href = "games.html"
})


