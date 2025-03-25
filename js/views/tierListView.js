import { getPersonnages } from '../provider.js';
import { hideDetails } from './detailView.js'; 

const characterPlacements = {};

export async function loadTierList() {
    hideDetails();
    
    const personnages = await getPersonnages();
    
    await displayTierList(personnages);
    initDraggables();
}

const handleDragover = (event) => {
    event.preventDefault(); 
  
    const draggedImage = document.querySelector(".dragging");
    if (!draggedImage) return;

    const target = event.target;
    const isItemsContainer = target.classList.contains("items");
    const isImage = target.tagName === "IMG" && target !== draggedImage;

    if (isItemsContainer) {
        target.appendChild(draggedImage);
    } else if (isImage) {
        const { left, width } = target.getBoundingClientRect();
        const midPoint = left + width / 2;
  
        if (event.clientX < midPoint) {
            target.parentElement.insertBefore(draggedImage, target);
        } else {
            target.parentElement.insertBefore(draggedImage, target.nextSibling);
        }
    }
};
  
const handleDrop = (event) => {
    event.preventDefault(); 
    
    const draggedImage = document.querySelector(".dragging");
    if (!draggedImage) return;

    const tierContainer = event.currentTarget;
    const tierLabelElement = tierContainer.closest('.tier')?.querySelector('.label span');
    const tierLabel = tierLabelElement ? tierLabelElement.textContent : 'Unknown';
    
    const characterId = draggedImage.dataset.characterId;
    console.log(`Character ${characterId} dropped in tier ${tierLabel}`);
    
    characterPlacements[characterId] = tierLabel;
};

const initDraggables = () => {
    const cardsContainer = document.querySelector(".cards");
    const images = cardsContainer.querySelectorAll("img");

    images.forEach((img) => {
        img.draggable = true;

        img.addEventListener("dragstart", (e) => {
            images.forEach(otherImg => otherImg.classList.remove("dragging"));
            img.classList.add("dragging");
        });

        img.addEventListener("dragend", () => img.classList.remove("dragging"));

        img.addEventListener("dblclick", () => {
            if (img.parentElement !== cardsContainer) {
                cardsContainer.appendChild(img);
                cardsContainer.scrollLeft = cardsContainer.scrollWidth;
            }
        });
    });
};

async function displayTierList(personnages) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="tier-list-container">
        <h1>TierList</h1>
        <div class="tiers Tcontainer">
          <div class="tier"><div class="label S" contenteditable="true"><span>S</span></div><div class="items"></div></div>
          <div class="tier"><div class="label A" contenteditable="true"><span>A</span></div><div class="items"></div></div>
          <div class="tier"><div class="label B" contenteditable="true"><span>B</span></div><div class="items"></div></div>
          <div class="tier"><div class="label C" contenteditable="true"><span>C</span></div><div class="items"></div></div>
          <div class="tier"><div class="label D" contenteditable="true"><span>D</span></div><div class="items"></div></div>
        </div>
        <div class="cards Ccontainer">
            ${personnages.map(personnage => `
                <img 
                    src="${personnage.image}" 
                    class="img-tier" 
                    alt="${personnage.nom}" 
                    data-character-id="${personnage.id}" 
                    draggable="true" 
                />
            `).join('')}
        </div>
    </div>
    `;

    document.querySelectorAll(".tier .items").forEach(itemsContainer => {
        itemsContainer.addEventListener("dragover", handleDragover);
        itemsContainer.addEventListener("drop", handleDrop);
    });

    return characterPlacements;
}

export { characterPlacements };