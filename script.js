// Fetch image data from API
async function fetchImageData() {
    const response = await fetch('https://picsum.photos/v2/list');
    const imageData = await response.json();
    return imageData;
  }
  
  // Populate dropdown with author names and filter images on selection
  async function initializeGallery() {
    const imageData = await fetchImageData();
    
    // Extract unique authors
    const authors = [...new Set(imageData.map(item => item.author))];
    
    // Populate the dropdown
    const authorDropdown = document.getElementById('authorDropdown');
    authors.forEach(author => {
      const option = document.createElement('option');
      option.value = author;
      option.textContent = author;
      authorDropdown.appendChild(option);
    });
  
    // Handle author selection and fetch images
    authorDropdown.addEventListener('change', function() {
      const selectedAuthor = this.value;
      const gallery = document.getElementById('imageGallery');
      gallery.innerHTML = ''; // Clear current images
  
      // Filter images by selected author and display
      const filteredImages = imageData.filter(item => item.author === selectedAuthor);
      filteredImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        gallery.appendChild(imgElement);
      });
    });
  }
  
  // Initialize the gallery on page load
  document.addEventListener('DOMContentLoaded', initializeGallery);
  