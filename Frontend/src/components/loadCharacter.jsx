import { useState } from "react";
import classItem from "../json/class.json"
export function LoadCharacter({abilitiesItems , setAbilitiesItems}) {
    const [newClass, setNewClass] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);

    function rollAbility() {

        const newAbilities = abilitiesItems.map((ability) => {
            const numbers = [];

            for (let i = 0; i < 4; i++) {
                numbers.push(Math.floor(Math.random() * 6) + 1);
            }

            numbers.sort((a, b) => a - b);

            const score = numbers[1] + numbers[2] + numbers[3];
            const modifier = Math.floor((score - 10) / 2);

            return {
                ...ability,
                score,
                modifier
            };
        });
        setAbilitiesItems(newAbilities);
    }

function rollClass() {
    const classNew = [];

    const sortedAbilities = abilitiesItems.sort((s1, s2) => {
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
}

function roll() {
    rollAbility();
    rollClass();
}

    function roll() {
        rollAbility()
        rollClass()
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
                {newClass.name}
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