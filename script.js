async function fetchImageData() {
  const response = await fetch('https://picsum.photos/v2/list');
  const imageData = await response.json();
  return imageData;
}

async function initializeGallery() {
  const imageData = await fetchImageData();
  

  const authors = [...new Set(imageData.map(item => item.author))];
  

  const authorDropdown = document.getElementById('authorDropdown');
  authors.forEach(author => {
    const option = document.createElement('option');
    option.value = author;
    option.textContent = author;
    authorDropdown.appendChild(option);
  });


  authorDropdown.addEventListener('change', function() {
    const selectedAuthor = this.value;
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ''; // Clear current images

    const filteredImages = imageData.filter(item => item.author === selectedAuthor);
    filteredImages.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.download_url;

 
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const authorInfo = document.createElement('div');
      authorInfo.classList.add('author-info');
      authorInfo.innerHTML = `<b>${image.author}</b><p>This is a photo from ${image.author}</p>`;


      imageContainer.appendChild(imgElement);
      imageContainer.appendChild(authorInfo);


      gallery.appendChild(imageContainer);
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeGallery);
