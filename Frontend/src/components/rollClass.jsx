import classItem from "../json/class.json"

export function rollClass(rolledAbilies) {
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

    const newWeapon = Math.floor(Math.random() * chosenClass.weapon.length);

    return { chosenClass, skills, newWeapon };
}