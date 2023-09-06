const searchInput = document.getElementById("inputBuscar");
const searchButton = document.getElementById("btnBuscar");
const resultsContainer = document.getElementById("contenedor");

function createResultCard(title, description, imageUrl, dateCreated) {
    const card = document.createElement("div");
    card.classList.add("result-card");
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = title;
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    const dateElement = document.createElement("p");
    dateElement.textContent = `Fecha de creación: ${dateCreated}`;
    card.appendChild(imageElement);
    card.appendChild(titleElement);
    card.appendChild(descriptionElement);
    card.appendChild(dateElement);
    return card;
  }

  searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.trim();
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchText)}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = "";
        if (data.collection.items.length === 0) {
          resultsContainer.innerHTML = "No se encontraron imágenes.";
        } else {
          data.collection.items.forEach((item) => {
            const title = item.data[0].title;
            const description = item.data[0].description;
            const imageUrl = item.links[0].href;
            const dateCreated = item.data[0].date_created;
            const resultCard = createResultCard(
              title,
              description,
              imageUrl,
              dateCreated
            );
            resultsContainer.appendChild(resultCard);
          });
        }
      })
      .catch((error) => {console.error("Error al realizar la solicitud:", error);
    });
});