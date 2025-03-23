import './style.css'


const availableDecks = {"Coins":14,"Cups":14,"Major":22,"Swords":14,"Wands":14}; //Add Deck of Many things support
let selectedDecks: string[] = [];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Draw Three Tarot Cards</h1>
    
    <div id="card-container">
    
    </div>
    
    <div id="pullup-footer">
        <div id="deck-selection">
            <h3>Select Decks:</h3>
            <list id="deck-dropdown">
                ${Object.keys(availableDecks).map((deck: string): string => `<ul><input type="checkbox" id="deck-select" onchange="handleSelection('${deck}', this.checked)"><label>${deck}</label></input></ul>`).join("")}
            </list>
        </div>
    </div>
  </div>
`;

let cardContainer = document.querySelector<HTMLDivElement>('#card-container')!;
createCard(cardContainer);
createCard(cardContainer);
createCard(cardContainer);

(window as any)["handleSelection"] = function handleSelection(deck:string, checked:boolean){
    if(checked){
        //put in list
        if(!selectedDecks.includes(deck)){
        selectedDecks.push(deck);
        }
    }
    if(!checked){
        //remove from list
        if(selectedDecks.includes(deck)) {
            selectedDecks.splice(selectedDecks.indexOf(deck), 1);
        }
    }
}

function createCard(cardContainer:HTMLDivElement) {
    let cardElement = document.createElement('div');
    cardContainer.appendChild(cardElement);
    cardElement.classList.add("tarot");
    cardElement.onclick= () => {
        let cardPool:string[] = [];
        console.log("test");
        selectedDecks.forEach(value => {
            let size = availableDecks[value as keyof typeof availableDecks];
            for (let i = 0; i < size; i++) {
                cardPool.push(`/CardImages/${value}/CM_Tarot__${value}_${i+1}.png`);
            }
        });

        cardFace.src=cardPool[randomint(cardPool.length - 1,0)];
    };

    let cardFace = document.createElement("img");
    cardFace.src="/CardImages/Back/CM_Tarot__Card_Back-1.png";

    cardElement.appendChild(cardFace);
    return cardElement.outerHTML;
}

function randomint(max: number, min: number): number{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
