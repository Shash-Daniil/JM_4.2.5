let suggests = document.querySelector(".suggests")
let repoList = document.querySelector(".repo-list")
let items

function getRepos(word) {
    fetch(`https://api.github.com/search/repositories?q=${word}&per_page=5`)
    .then(response => response.json())
    .then(response => {
        items = response.items
        suggests.innerHTML = '';
        items.forEach(element => {
            addSuggests(element)
        })
        console.log(items)
    })
}

suggests.addEventListener('click', e => {
    let elem = items.find(elem => {
        if (elem.name == e.target.textContent)
            return true
    })
    repoListAddElement(elem)
})

function addSuggests(item) {
    let listElem = document.createElement("li")
    listElem.classList.add('suggests__elem')
    listElem.textContent = item.name
    suggests.appendChild(listElem)
}

let searchInput = document.querySelector(".search-input")

let debouncedGetRepos = debounce(getRepos, 1000)
function debounce(fn, debounceTime) {
    let timeout
    return function () {
        const kek = () => { 
            fn.apply(this, arguments)
        }
        clearTimeout(timeout)
        timeout = setTimeout(kek, debounceTime)
    }
}

searchInput.addEventListener("input", () => {
    debouncedGetRepos(searchInput.value)
})

function repoListAddElement(elem) {
    searchInput.value = ''
    suggests.innerHTML = ''
    let repoListElem = document.createElement('div')
    repoListElem.classList.add("repo-list__elem")
    let name = elem.name
    let stargazers_count = elem.stargazers_count
    let owner = elem.owner.login
    repoListElem.innerHTML = `
        <div>Name: ${name}</div>
        <div>Owner: ${owner}</div>
        <div>Stars: ${stargazers_count}</div>
        <button class="close-btn"></button>
    `
    repoList.appendChild(repoListElem)

    let closeBtn = document.querySelectorAll(".close-btn")
    closeBtn.forEach(elem => {
        elem.addEventListener('click', e => {
            elem.parentNode.remove()
        })
})
}