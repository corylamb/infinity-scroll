const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 30;
const apiKey = 'NWSZpke1nag0Iroy9_QIB4su6zDxYYQB7VPX3rRKdPs';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if All images were loaded 
function imageLoaded() {
    imagesloaded++;
    if (imagesloaded === totalImages) {
        ready = true 
        loader.hidden = true;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// helper fuction to set attributes on the DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for the links & Photos, add ato DOM 
function displayPhotos() {
    imagesloaded = 0;
    totalImages = photosArray.length;
    // Run Function for each object in the photo array 
    photosArray.forEach((photo) => {
        //Creating an <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item);
    
    });
};

// get photos from unsplash api 

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {
        // catch error here
    }
}

// check to see if scrolling near botton of the page, Load mor photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
});

// on load 

getPhotos();