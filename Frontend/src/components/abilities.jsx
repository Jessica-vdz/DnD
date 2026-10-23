import { useState } from "react"

export function Abilities() {

    const [totalnumber, setTotalNumber] = useState([null]);
    const [abilites, setAbilities] = useState([]);
    function roll() {
        const abilitiesScore = [];
        
        for (let i = 0; i < 4; i++) {
        const newNumber = [];
        
        for (let j = 0; j < 4; j++) {
            const number = Math.floor(Math.random() * 6) + 1;
            newNumber.push(number);
            newNumber.sort();
        }
        const calculate = newNumber[1] + newNumber[2] + newNumber[3];
        abilitiesScore.push(calculate)
        console.log(newNumber);
    }

        setAbilities(abilitiesScore);
    }
    
    return(
        <section>
            <aside>
                <div>
                    <h3>Strength</h3>
                    {abilites[0]}
                </div>
                <div>
                    <h3>Dexterity</h3>
                    {abilites[1]}
                </div>
                <div>
                    <h3>Strength</h3>
                    {abilites[2]}
                </div>
                <div>
                    <h3>Dexterity</h3>
                    {abilites[3]}
                </div>
                
            <button onClick={(e)=> {roll()}}>Generate</button>
            </aside>
            <div>
                {totalnumber}
            </div>
        </section>
    )
}