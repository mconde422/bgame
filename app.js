const modal = document.getElementById('modal')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalPrice = document.getElementById('modal-price')
const closeBtn = document.querySelector('.close')

fetch('description.json')
  .then(res => res.json())
  .then(data => {

    document.querySelectorAll('.cardJeux, .cardmaterial').forEach(card => {

      card.addEventListener('click', () => {

        const gameId = card.dataset.id
        const gameData =
          data.ps4?.[gameId] ||
          data.ps2?.[gameId]

        if (!gameData) {
          console.error('Jeu introuvable:', gameId)
          return
        }

        modalImg.src = gameData.image
        modalTitle.textContent = gameData.title
        modalDesc.textContent = gameData.description
        modalPrice.textContent = gameData.price

        modal.classList.add('active')
      })

    })
  })

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active')
})

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active')
})
