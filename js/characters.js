const characters = document.getElementById('characters')
const url = 'https://rickandmortyapi.com/api/character'

const createCharacter = (character) => {
    const characterElement = document.createElement('div')
    characterElement.setAttribute('class', 'character')
    characterElement.setAttribute('data-id', character.id)

    // Character Image
    const characterImgContainer = document.createElement('div')
    characterImgContainer.setAttribute('class', 'character__img')
    const characterImg = document.createElement('img')
    characterImg.setAttribute('src', character.image)

    // Character Content

    const characterContent = document.createElement('div')
    characterContent.setAttribute('class', 'character__content')

    const characterName = document.createElement('p')
    characterName.setAttribute('class', 'character__name')
    characterName.textContent = character.name

    const characterStatus = document.createElement('p')
    characterStatus.setAttribute('class', 'character__status character__text')
    characterStatus.setAttribute('data-status', character.status)
    characterStatus.textContent = `${character.status}-${character.gender}`

    const characterIndicationLocation = document.createElement('p')
    characterIndicationLocation.setAttribute('class', 'character__indication')
    characterIndicationLocation.textContent = 'Last known location:'

    const characterLocation = document.createElement('p')
    characterLocation.setAttribute('class', 'character__text')
    characterLocation.textContent = character.location.name

    const characterIndicationOrigin = document.createElement('p')
    characterIndicationOrigin.setAttribute('class', 'character__indication')
    characterIndicationOrigin.textContent = 'First seen in:'
    // <div class="character">
    //     <div class="character__img">
    //         <img src="../assets/images/1.jpg" alt="" />
    //     </div>
    //     <div class="character__content">
    //         <p class="character__name">Evil summer Clone</p>

    //         <p class="character__status character__text" data-status="dead">Dead-Human</p>
    //         <p class="character__indication">Last known location:</p>
    //         <p class="character__text">Earth (C-127)</p>
    //         <p class="character__indication">First seen in:</p>
    //         <p class="character__text">Meseseck and destroy</p>
    //     </div>
    // </div>
}
const getCharacters = async () => {
    const response = await fetch(url)
    const { results } = await response.json()

    const fragment = document.createDocumentFragment()
    results.forEach((character) => {
        console.dir(character)
        // const characterElement = createCharacter(character)
        // fragment.appendChild(characterElement)
    })
}

getCharacters()
