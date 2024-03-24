const accesskey = "rKBNsef8H3rw9ipa1TpDMHoBW1hWJDu0GU06y22qbyY"

const formE1 = document.querySelector("form")
const inputE1 =document.getElementById("search_bar")
const searchResults = document.querySelector(".search-results")
const showMore =document.getElementById("show-more")
const likedImagesContainer = document.getElementById("liked-images")

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

      const likeButton =document.createElement("button")
      likeButton.classList.add("like-button")
      likeButton.textContent= "Like";

     imageWrapper.appendChild(image)
     imageWrapper.appendChild(imageLink)
     imageWrapper.appendChild(likeButton)
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

searchResults.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
        const imageWrapper = event.target.parentElement;
        const imageUrl = imageWrapper.querySelector("img").src;
        const altText = imageWrapper.querySelector("img").alt;
        const linkUrl = imageWrapper.querySelector("a").href;

        // Check if image is already liked
        const isLiked = likedImagesContainer.querySelector(`img[src="${imageUrl}"]`);

        // If image is not liked, add it to liked images
        if (!isLiked) {
            addLikedImage(imageUrl, altText, linkUrl);
            event.target.textContent = "Unlike"; // Change button text to "Unlike"
        } else {
            // If image is already liked, remove it from liked images
            removeLikedImage(imageUrl);
            event.target.textContent = "Like"; // Change button text to "Like"
        }
        updateLikedImagesMessage()
    }
});

// Function to add liked image
function addLikedImage(imageUrl, altText, linkUrl) {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("liked-image");

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altText;

    const imageLink = document.createElement("a");
    imageLink.href = linkUrl;
    imageLink.target = "_blank";
    imageLink.textContent = altText;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    likedImagesContainer.appendChild(imageWrapper);
    updateLikedImagesMessage()

}

// Function to remove liked image
function removeLikedImage(imageUrl) {
    const likedImage = likedImagesContainer.querySelector(`img[src="${imageUrl}"]`);
    if (likedImage) {
        likedImage.parentElement.remove();
    }
    updateLikedImagesMessage()
}

// Show message if there are no liked images
if (likedImagesContainer.children.length === 0) {
    const noLikedImagesMsg = document.createElement("p");
    noLikedImagesMsg.textContent = "No liked images.";
    likedImagesContainer.appendChild(noLikedImagesMsg)
}

function updateLikedImagesMessage() {
    if (likedImagesContainer.children.length === 0) {
        const noLikedImagesMsg = document.createElement("p");
        noLikedImagesMsg.textContent = "No liked images.";
        likedImagesContainer.appendChild(noLikedImagesMsg);
    } else {
        const noLikedImagesMsg = likedImagesContainer.querySelector("p");
        if (noLikedImagesMsg) {
            noLikedImagesMsg.remove();
        }
    }
}
