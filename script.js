// Dice data (name + probability distribution)
const diceData = [
  { name: "Aranka's die", probs: [28.6, 4.8, 28.6, 4.8, 28.6, 4.8] },
  { name: "Cautious cheater's die", probs: [23.8, 14.3, 9.5, 14.3, 23.8, 14.3] },
  { name: "Ci die", probs: [13.0, 13.0, 13.0, 13.0, 13.0, 34.8] },
  { name: "Devil's head die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] },
  { name: "Die of misfortune", probs: [4.5, 22.7, 22.7, 22.7, 22.7, 4.5] },
  { name: "Even die", probs: [6.7, 26.7, 6.7, 26.7, 6.7, 26.7] },
  { name: "Favourable die", probs: [33.3, 0.0, 5.6, 5.6, 33.3, 22.2] },
  { name: "Fer die", probs: [13.0, 13.0, 13.0, 13.0, 13.0, 34.8] },
  { name: "Greasy die", probs: [17.6, 11.8, 17.6, 11.8, 17.6, 23.5] },
  { name: "Grimy die", probs: [6.3, 31.3, 6.3, 6.3, 43.8, 6.3] },
  { name: "Grozav's lucky die", probs: [6.7, 66.7, 6.7, 6.7, 6.7, 6.7] },
  { name: "Heavenly Kingdom die", probs: [36.8, 10.5, 10.5, 10.5, 10.5, 21.1] },
  { name: "Holy Trinity die", probs: [18.2, 22.7, 45.5, 4.5, 4.5, 4.5] },
  { name: "Hugo's Die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] },
  { name: "King's die", probs: [12.5, 18.8, 21.9, 25.0, 12.5, 9.4] },
  { name: "Lousy gambler's die", probs: [10.0, 15.0, 10.0, 15.0, 35.0, 15.0] },
  { name: "Lu die", probs: [13.0, 13.0, 13.0, 13.0, 13.0, 34.8] },
  { name: "Lucky Die", probs: [27.3, 4.5, 9.1, 13.6, 18.2, 27.3] },
  { name: "Mathematician's Die", probs: [16.7, 20.8, 25.0, 29.2, 4.2, 4.2] },
  { name: "Molar die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] },
  { name: "Odd die", probs: [26.7, 6.7, 26.7, 6.7, 26.7, 6.7] },
  { name: "Ordinary die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] },
  { name: "Painted die", probs: [18.8, 6.3, 6.3, 6.3, 43.8, 18.8] },
  { name: "Pie die", probs: [46.2, 7.7, 23.1, 23.1, 0.0, 0.0] },
  { name: "Premolar die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] },
  { name: "Sad Greaser's Die", probs: [26.1, 26.1, 4.3, 4.3, 26.1, 13.0] },
  { name: "Saint Antiochus' die", probs: [0.0, 0.0, 100.0, 0.0, 0.0, 0.0] },
  { name: "Shrinking die", probs: [22.2, 11.1, 11.1, 11.1, 11.1, 33.3] },
  { name: "St. Stephen's die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] },
  { name: "Strip die", probs: [25.0, 12.5, 12.5, 12.5, 18.8, 18.8] },
  { name: "Three die", probs: [12.5, 6.3, 56.3, 6.3, 12.5, 6.3] },
  { name: "Unbalanced Die", probs: [25.0, 33.3, 8.3, 8.3, 16.7, 8.3] },
  { name: "Unlucky die", probs: [9.1, 27.3, 18.2, 18.2, 18.2, 9.1] },
  { name: "Wagoner's Die", probs: [5.6, 27.8, 33.3, 11.1, 11.1, 11.1] },
  { name: "Weighted die", probs: [66.7, 6.7, 6.7, 6.7, 6.7, 6.7] },
  { name: "Wisdom tooth die", probs: [16.7, 16.7, 16.7, 16.7, 16.7, 16.7] }
];

let worker = null;
function initWorker() {
  if (worker) {
    worker.terminate();
  }
  worker = new Worker('worker.js');
  
  worker.addEventListener('message', (e) => {
    const topCombos = e.data;
    updateResults(topCombos);
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
  });

  worker.addEventListener('error', (error) => {
    console.error('Worker error:', error);
    alert('An error occurred while calculating combinations');
    document.getElementById('loading').classList.add('hidden');
  });
}

function updateResults(topCombos) {
  const resultsContainer = document.getElementById('optimal-combinations');
  
  if (topCombos.length === 0) {
    resultsContainer.innerHTML = `<p class="text-red-500">No valid combinations found.</p>`;
  } else {
    resultsContainer.innerHTML = topCombos.map((combo, idx) => `
      <div class="bg-gray-50 p-4 rounded-lg border">
        <h3 class="font-bold">#${idx + 1}: ${combo.dice.join(", ")}</h3>
        <p class="mt-2">Score: <span class="font-semibold">${combo.score}</span></p>
      </div>
    `).join('');
  }
}

window.addEventListener('unload', () => {
  if (worker) {
    worker.terminate();
  }
});

// Scoring rules
const scoringRules = {
  single: { 1: 100, 5: 50 },
  triple: (face) => face === 1 ? 1000 : face * 100,
  quadruple: (face) => face === 1 ? 2000 : face * 200,
  straight: 1500,
  sixOfAKind: (face) => face === 1 ? 4000 : face * 400,
};

let inventory = [];

function updateInventoryUI() {
  const container = document.getElementById('dice-inventory');
  container.innerHTML = inventory.map((die, index) => `
    <div class="bg-gray-200 px-3 py-1 flex items-center gap-2 border">
      ${die}
      <button class="text-red-500 hover:text-red-700" data-index="${index}">×</button>
    </div>
  `).join('');
}

function updatePresetSelect() {
  const presetSelect = document.getElementById('preset-select');
  presetSelect.innerHTML = '<option value="">Load a preset...</option>';
  
  const presets = JSON.parse(localStorage.getItem('farklePresets') || '{}');
  for (const [name, dice] of Object.entries(presets)) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    presetSelect.appendChild(option);
  }
}

// Event Listeners
document.getElementById('dice-search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  if (query.length < 2) {
    document.getElementById('search-results').classList.add('hidden');
    return;
  }
  
  const results = diceData.filter(die => 
    die.name.toLowerCase().includes(query)
  );
  
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = results.map(die => `
    <div class="p-2 hover:bg-gray-100 cursor-pointer" data-die="${die.name}">
      ${die.name}
    </div>
  `).join('');
  
  resultsContainer.classList.remove('hidden');
});

document.getElementById('search-results').addEventListener('click', (e) => {
  if (e.target.dataset.die) {
    const dieName = e.target.dataset.die;
    inventory.push(dieName);
    updateInventoryUI();
    document.getElementById('search-results').classList.add('hidden');
    document.getElementById('dice-search').value = '';
  }
});

document.getElementById('dice-inventory').addEventListener('click', (e) => {
  if (e.target.dataset.index) {
    inventory.splice(parseInt(e.target.dataset.index), 1);
    updateInventoryUI();
  }
});

document.getElementById('calculate-btn').addEventListener('click', () => {
  if (inventory.length < 6) {
    alert("You need at least 6 dice in your inventory!");
    return;
  }

  // Initialize worker if not already done
  if (!worker) {
    initWorker();
  }

  // Show loading indicator
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('results').classList.add('hidden');

  // Send inventory to worker
  worker.postMessage(inventory);
});

document.getElementById('save-preset-btn').addEventListener('click', () => {
  if (inventory.length === 0) {
    alert("Inventory is empty");
    return;
  }
  document.getElementById('save-preset-modal').classList.remove('hidden');
  document.getElementById('preset-name').value = '';
  document.getElementById('preset-name').focus();
});

// Handle modal close
document.getElementById('cancel-save-preset').addEventListener('click', () => {
  document.getElementById('save-preset-modal').classList.add('hidden');
});

// Handle save preset confirmation
document.getElementById('confirm-save-preset').addEventListener('click', () => {
  const presetName = document.getElementById('preset-name').value.trim();
  if (!presetName) {
    alert("Please enter a preset name");
    return;
  }

  const presets = JSON.parse(localStorage.getItem('farklePresets') || '{}');
  presets[presetName] = inventory;
  localStorage.setItem('farklePresets', JSON.stringify(presets));
  updatePresetSelect();
  document.getElementById('save-preset-modal').classList.add('hidden');
});

// Allow closing modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('save-preset-modal').classList.add('hidden');
  }
});

// Allow submitting preset name with Enter key
document.getElementById('preset-name').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('confirm-save-preset').click();
  }
});

// Prevent clicks inside modal from closing it
document.querySelector('#save-preset-modal > div').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Close modal when clicking outside
document.getElementById('save-preset-modal').addEventListener('click', () => {
  document.getElementById('save-preset-modal').classList.add('hidden');
});

document.getElementById('load-preset-btn').addEventListener('click', () => {
  const presetName = document.getElementById('preset-select').value;
  if (!presetName) return;

  const presets = JSON.parse(localStorage.getItem('farklePresets') || '{}');
  inventory = presets[presetName] || [];
  updateInventoryUI();
});

document.getElementById('delete-preset-btn').addEventListener('click', () => {
  const presetName = document.getElementById('preset-select').value;
  if (!presetName) return;

  const presets = JSON.parse(localStorage.getItem('farklePresets') || '{}');
  delete presets[presetName];
  localStorage.setItem('farklePresets', JSON.stringify(presets));
  updatePresetSelect();
});

// Initialize preset dropdown on page load
updatePresetSelect();