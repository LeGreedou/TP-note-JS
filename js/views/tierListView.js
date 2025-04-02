import { getPersonnages } from '../provider.js';
import { hideDetails } from './detailView.js'; 
import { addRank } from '../services/notesService.js';
import { setupLazyLoading } from './genericView.js';

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
    addRank(characterId, tierLabel);

    tierContainer.appendChild(draggedImage);
};

const initDraggables = () => {
    const allImages = document.querySelectorAll(".img-tier");

    allImages.forEach((img) => {
        img.draggable = true;

        img.addEventListener("dragstart", (e) => {
            allImages.forEach(otherImg => otherImg.classList.remove("dragging"));
            img.classList.add("dragging");
        });

        img.addEventListener("dragend", () => img.classList.remove("dragging"));

        img.addEventListener("dblclick", () => {
            const cardsContainer = document.querySelector(".cards");
            if (img.parentElement.closest('.tier')) {
                cardsContainer.appendChild(img);
                cardsContainer.scrollLeft = cardsContainer.scrollWidth;
            }
        });
    });
};

async function displayTierList(personnages) {
    const app = document.getElementById('app');
    
    const tiersHTML = `
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
            ${personnages.filter(p => !p.notes || p.notes.length === 0).map(personnage => `
                <img 
                    data-src="${personnage.image}" 
                    src="data/lol-logo.jpg" 
                    class="img-tier" 
                    alt="${personnage.nom}" 
                    data-character-id="${personnage.id}" 
                    draggable="true" 
                    loading="lazy"
                />
            `).join('')}
        </div>
    </div>
    `;

    app.innerHTML = tiersHTML;

    const tiersMap = {
        'S': document.querySelector('.tier .label.S + .items'),
        'A': document.querySelector('.tier .label.A + .items'),
        'B': document.querySelector('.tier .label.B + .items'),
        'C': document.querySelector('.tier .label.C + .items'),
        'D': document.querySelector('.tier .label.D + .items')
    };

    personnages.forEach(personnage => {
        if (personnage.notes && personnage.notes.length > 0) {
            const latestNote = personnage.notes[personnage.notes.length - 1];
            const tierContainer = tiersMap[latestNote.rank];
            
            if (tierContainer) {
                const img = document.createElement('img');
                img.setAttribute('data-src', personnage.image);
                img.setAttribute('src', 'data/lol-logo.jpg');
                img.alt = personnage.nom;
                img.loading = "lazy";
                img.classList.add('img-tier');
                img.setAttribute('data-character-id', personnage.id);
                img.draggable = true;
                
                tierContainer.appendChild(img);
            }
        }
    });

    document.querySelectorAll(".tier .items").forEach(itemsContainer => {
        itemsContainer.addEventListener("dragover", handleDragover);
        itemsContainer.addEventListener("drop", handleDrop);
    });

    initDraggables();
    setupLazyLoading();
}

export async function getRankedCharacters() {
    const personnages = await getPersonnages();
    return personnages.filter(personnage => personnage.notes && personnage.notes.length > 0);
}
