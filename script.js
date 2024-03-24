const accesskey = "rKBNsef8H3rw9ipa1TpDMHoBW1hWJDu0GU06y22qbyY"

const formE1 = document.querySelector("form")
const inputE1 =document.getElementById("search_bar")
const searchResults = document.querySelector(".search-results")
const showMore =document.getElementById("show-more")

let inputdata ="";
let page = 1;

async function searchImage(){
    inputdata = inputE1.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results

    if(page== 1){
        searchResults.innerHTML =""
    }

    results.map((result)=> {
     const imageWrapper =document.createElement('div')
     imageWrapper.classList.add("search-result")
     const image = document.createElement('img')
     image.src = result.urls.small
     image.alt = result.alt_description
      const imageLink =document.createElement('a')
      imageLink.href = result.links.html
      imageLink.target = "_blank"
      imageLink.textContent =result.alt_description

     imageWrapper.appendChild(image)
     imageWrapper.appendChild(imageLink)
     searchResults.appendChild(imageWrapper)

    })

    page++

    if(page>1){
        showMore.style.display ="block"
    }
}
formE1.addEventListener("submit", (event)=>{
      event.preventDefault()
      page =1;
      searchImage()
})

showMore.addEventListener("click", ()=>{
    searchImage()
})