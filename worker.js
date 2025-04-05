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

const scoringRules = {
  single: { 1: 100, 5: 50 },
  triple: (face) => face === 1 ? 1000 : face * 100,
  quadruple: (face) => face === 1 ? 2000 : face * 200,
  straight: 1500,
  sixOfAKind: (face) => face === 1 ? 4000 : face * 400,
};

function calculateScore(combo) {
  let totalScore = 0;
  const simulations = 1000;

  const diceProbs = combo.map(dieName => 
    diceData.find(d => d.name === dieName).probs
  );

  // Use typed arrays for better performance
  const counts = new Uint8Array(6);
  
  for (let s = 0; s < simulations; s++) {
    counts.fill(0);
    
    for (let i = 0; i < 6; i++) {
      const rand = Math.random() * 100;
      let cumProb = 0;
      const probs = diceProbs[i];
      
      for (let j = 0; j < 6; j++) {
        cumProb += probs[j];
        if (rand < cumProb) {
          counts[j]++;
          break;
        }
      }
    }

    let score = 0;
    
    // Check for straight (1-2-3-4-5-6)
    if (counts[0] && counts[1] && counts[2] && counts[3] && counts[4] && counts[5]) {
      score = 1500;
      totalScore += score;
      continue;
    }

    // Check for six of a kind
    for (let i = 0; i < 6; i++) {
      if (counts[i] === 6) {
        score = i === 0 ? 4000 : (i + 1) * 400;
        totalScore += score;
        continue;
      }
    }

    // Check sets and singles
    for (let i = 0; i < 6; i++) {
      if (counts[i] >= 4) {
        score += i === 0 ? 2000 : (i + 1) * 200;
        counts[i] -= 4;
      } else if (counts[i] >= 3) {
        score += i === 0 ? 1000 : (i + 1) * 100;
        counts[i] -= 3;
      }
      
      // Add remaining singles (only for 1s and 5s)
      if (i === 0) score += counts[i] * 100;
      if (i === 4) score += counts[i] * 50;
    }

    totalScore += score;
  }

  return Math.round(totalScore / simulations);
}

function getTopCombinations(inventory) {
  if (inventory.length < 6) return [];

  const results = [];
  const seen = new Set();
  const n = inventory.length;
  
  const total = Math.pow(2, n);
  for (let i = 0; i < total; i++) {
    if (countBits(i) !== 6) continue;
    
    const combo = [];
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        combo.push(inventory[j]);
      }
    }
    
    const key = combo.sort().join(',');
    if (!seen.has(key)) {
      seen.add(key);
      const score = calculateScore(combo);
      results.push({ dice: combo, score });
      
      if (results.length > 5) {
        results.sort((a, b) => b.score - a.score);
        results.pop();
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

function countBits(n) {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

// Worker message handler
self.addEventListener('message', (e) => {
  const inventory = e.data;
  const results = getTopCombinations(inventory);
  self.postMessage(results);
});