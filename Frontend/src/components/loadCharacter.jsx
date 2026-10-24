import { use, useState } from "react";
import abilities from "../json/abilities.json"
import classItem from "../json/class.json"
import race from "../json/race.json"
export function LoadCharacter() {
    const [newClass, setNewClass] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [abilitiesItems, setAbilitiesItems] = useState([]);
    const [raceItem, setRaceItem] = useState("");
    const [healthStat, setHealthStat] = useState(null)
    function rollAbility() {

        const newAbilities = abilities.map((ability) => {
            const numbers = [];

            for (let i = 0; i < 4; i++) {
                numbers.push(Math.floor(Math.random() * 6) + 1);
            }

            numbers.sort((a, b) => a - b);

            const score = numbers[1] + numbers[2] + numbers[3];
            const modifier = Math.floor((score - 10) / 2);
            console.log(modifier)

            return {
                ...ability,
                score,
                modifier
            };
        });
        setAbilitiesItems(newAbilities);
        return newAbilities;
    }

function rollClass(rolledAbilies) {
    const classNew = [];

    const sortedAbilities = [...rolledAbilies].sort((s1, s2) => {
        if (s1.score > s2.score) return -1;
        if (s1.score < s2.score) return 1;
        return 0;
    });

    const highestAbility = sortedAbilities.slice(0, 2);

    for (let i = 0; i < classItem.length; i++) {
        let matches = 0;

        for (let j = 0; j < highestAbility.length; j++) {
            for (let k = 0; k < classItem[i].best.length; k++) {
                if (highestAbility[j].id === classItem[i].best[k]) {
                    matches++;
                }
            }
        }

        if (matches === 1) {
            classNew.push(classItem[i]);
        }
    }

    const classId = Math.floor(Math.random() * classNew.length);
    const chosenClass = classNew[classId];

    setNewClass(chosenClass);

    const skills = [];
    const uniqueSkills = [...new Set(chosenClass.skill)];

    for (let i = 0; i < chosenClass.max; i++) {
        const skillEntry = Math.floor(Math.random() * uniqueSkills.length);
        const skill = uniqueSkills[skillEntry];

        if (!skills.includes(skill)) {
            skills.push(skill);
        } else {
            i--;
        }

        uniqueSkills.splice(skillEntry, 1);
    }

    setSelectedSkills(skills);
    return chosenClass;

}
    function rollRace() {
        const newRaceId = Math.floor(Math.random() * race.length)
        const newRaceName = race[newRaceId].name
        setRaceItem(newRaceName);
        console.log(newRaceName)
    }


    function roll() {
        const newAbilities = rollAbility();
        const chosenClass = rollClass( newAbilities);
        rollRace()

        const constitution = newAbilities[2]
        const healthJson = constitution.modifier
        const health = chosenClass.health + healthJson
        setHealthStat(health)
    }

    return(
        <main>
            <aside>
                <h2>abilities</h2>
                {abilitiesItems.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.score}</p>
                        <p>{item.modifier}</p>
                    </div>
                ))}
            </aside>
            <section>
                <h1>{raceItem}</h1>
                <h3>{newClass.name}</h3>
                <h2>{healthStat}</h2>
                <div>
                    {selectedSkills.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </section>
            <button onClick={roll}>Generate</button>
        </main>
    )
}