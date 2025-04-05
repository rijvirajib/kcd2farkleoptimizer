# Farkle Dice Optimizer for *Kingdom Come: Deliverance 2*

## Overview
Optimize dice selections for the in-game Farkle mini-game by calculating the highest-scoring 6-dice combinations from their inventory.

## 1. What is KCD2's Farkle Game?
Farkle is a dice mini-game in *Kingdom Come: Deliverance 2* where players roll dice to earn points. The game features:
- **Special Dice**: Over 30 unique dice with custom probability distributions (e.g., "Weighted die" favors 1s, "Saint Antiochus' die" always rolls 3s).
- **Risk/Reward**: Players must decide whether to bank their points or risk rolling again for higher scores.

## 2. How the Game is Scored
Points are awarded based on dice combinations:
| Combination           | Scoring Rule                          |
|-----------------------|---------------------------------------|
| Single 1              | 100 points                            |
| Single 5              | 50 points                             |
| Three of a kind       | 1,000 (for 1s) or `face × 100`       |
| Four of a kind        | 2,000 (for 1s) or `face × 200`       |
| Straight (1–6)        | 1,500 points                          |
| Six of a kind         | 4,000 (for 1s) or `face × 400`       |

**Note**: Some dice (e.g., "Holy Trinity die") have unusual probability distributions that affect scoring potential.


## 3. How This Works
### Features
- **Dice Inventory**: Add dice from a library of 30+ KCD2 dice.
- **Presets**: Save/load dice sets via `localStorage`.
- **Optimizer**: Calculates the top 5 highest-scoring 6-dice combinations using Monte Carlo simulation (1,000 trials per combo).

### Technical Details
- **"Algorithm" (Brute Force Simulation)**:  
  1. Generates all possible 6-dice combinations from the inventory.  
  2. Simulates rolls for each combo using the dice's probability distributions.  
  3. Scores each roll using Farkle rules and averages the results.  
- **Performance**: Uses a Web Worker to avoid UI freezing during calculations.  

### Usage
1. Add dice to your inventory via search.  
2. Click **Calculate Combinations** to see optimal sets.  
3. Save frequent inventories as presets.  

---

## Live Demo
Try it [here](https://rijvirajib.github.io/kcd2farkleoptimizer/).