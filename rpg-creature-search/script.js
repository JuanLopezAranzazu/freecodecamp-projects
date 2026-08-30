const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");

const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const creatureImage = document.getElementById("creature-image");

const API_URL = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

async function searchCreature() {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (!searchValue) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${searchValue}`);

    if (!response.ok) {
      throw new Error("Creature not found");
    }
    const data = await response.json();
    displayCreature(data);
  } catch (error) {
    alert("Creature not found");
    clearCreature();
  }
}

function displayCreature(creature) {
  creatureName.textContent = creature.name.toUpperCase();

  creatureId.textContent = `#${creature.id} `;

  weight.textContent = creature.weight;

  height.textContent = creature.height;

  types.innerHTML = "";

  creature.types.forEach((typeData) => {
    const typeElement = document.createElement("span");

    typeElement.classList.add("type");

    typeElement.textContent = typeData.name.toUpperCase();

    types.appendChild(typeElement);
  });

  hp.textContent = getStat(creature.stats, "hp");

  attack.textContent = getStat(creature.stats, "attack");

  defense.textContent = getStat(creature.stats, "defense");

  specialAttack.textContent = getStat(creature.stats, "special-attack");

  specialDefense.textContent = getStat(creature.stats, "special-defense");

  speed.textContent = getStat(creature.stats, "speed");

  creatureImage.innerHTML = "";

  if (creature.image) {
    const image = document.createElement("img");

    image.src = creature.image;

    image.alt = creature.name;

    creatureImage.appendChild(image);
  } else {
    creatureImage.textContent = creature.name.charAt(0).toUpperCase();
  }
}

function getStat(stats, statName) {
  const stat = stats.find((stat) => stat.name === statName);

  return stat ? stat.base_stat : 0;
}

function clearCreature() {
  creatureName.textContent = "—";
  creatureId.textContent = "—";

  weight.textContent = "—";
  height.textContent = "—";

  hp.textContent = "—";
  attack.textContent = "—";
  defense.textContent = "—";

  specialAttack.textContent = "—";
  specialDefense.textContent = "—";

  speed.textContent = "—";

  types.innerHTML = "";

  creatureImage.innerHTML = "?";
}

searchButton.addEventListener("click", searchCreature);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchCreature();
  }
});
