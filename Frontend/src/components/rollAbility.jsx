import abilities from "../json/abilities.json";

export function rollAbility() {
  const newAbilities = abilities.map((ability) => {
    const numbers = [];

    for (let i = 0; i < 4; i++) {
      numbers.push(Math.floor(Math.random() * 6) + 1);
    }

    numbers.sort((a, b) => a - b);

    const score = numbers[1] + numbers[2] + numbers[3];
    const modifier = Math.floor((score - 10) / 2);
    console.log(modifier);

    return {
      ...ability,
      score,
      modifier,
    };
  });
  return newAbilities;
}
