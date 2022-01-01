const characters = document.getElementById('characters')
let numPage = 1
let url = `https://rickandmortyapi.com/api/character/?page=${numPage}`

const setObserver = (observable) => {
    let options = {
        root: null,
        rootMargin: '100px 0px 0px 0px',
        threshold: 0,
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            } else {
                entry.target.classList.remove('visible')
            }
        })
    }, options)
    observer.observe(observable)
}
const observeGetCharacters = (observable) => {
    let options = {
        root: null,
        rootMargin: '200px 0px 0px 0px',
        threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                url = `https://rickandmortyapi.com/api/character/?page=${++numPage}`
                getCharacters()
            }
        }, options)
    })

    observer.observe(observable)
}
const createCharacter = (character) => {
    const characterElement = document.createElement('div')
    characterElement.setAttribute('class', 'character')
    characterElement.setAttribute('data-id', character.id)

    // Character Image
    const characterImgContainer = document.createElement('div')
    characterImgContainer.setAttribute('class', 'character__img')
    const characterImg = document.createElement('img')
    characterImg.setAttribute('src', character.image)

    characterImgContainer.append(characterImg)

    // Character Content
    const characterContent = document.createElement('div')
    characterContent.setAttribute('class', 'character__content')

    const characterName = document.createElement('p')
    characterName.setAttribute('class', 'character__name')
    characterName.textContent = character.name

    const characterStatus = document.createElement('p')
    characterStatus.setAttribute('class', 'character__status character__text')
    characterStatus.setAttribute('data-status', character.status)
    characterStatus.textContent = `${character.status} - ${character.gender}`

    const characterIndicationLocation = document.createElement('p')
    characterIndicationLocation.setAttribute('class', 'character__indication')
    characterIndicationLocation.textContent = 'Last known location:'

    const characterLocation = document.createElement('p')
    characterLocation.setAttribute('class', 'character__text')
    characterLocation.textContent = character.location.name

    const characterIndicationOrigin = document.createElement('p')
    characterIndicationOrigin.setAttribute('class', 'character__indication')
    characterIndicationOrigin.textContent = 'First seen in:'

    const characterFirstSeenIn = document.createElement('p')
    characterFirstSeenIn.setAttribute('class', 'character__text')
    characterFirstSeenIn.textContent = character.origin.name

    characterContent.append(
        characterName,
        characterStatus,
        characterIndicationLocation,
        characterLocation,
        characterIndicationOrigin,
        characterFirstSeenIn
    )

    characterElement.append(characterImgContainer, characterContent)

    setObserver(characterElement)
    return characterElement
}

const getCharacters = async () => {
    try {
        const response = await fetch(url)
        const { results } = await response.json()

        const fragment = document.createDocumentFragment()
        results.forEach((character) => {
            const characterElement = createCharacter(character)
            fragment.appendChild(characterElement)
        })
        characters.appendChild(fragment)
        observeGetCharacters(characters.lastElementChild)
    } catch (error) {
        console.log('something went wrong')
    }
}

getCharacters()
