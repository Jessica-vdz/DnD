
import { useState } from "react";
import race from "../json/race.json";
import { rollAbility } from "./rollAbility";
import { rollClass } from "./rollClass";

export function LoadCharacter() {
  const [newClass, setNewClass] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [abilitiesItems, setAbilitiesItems] = useState([]);
  const [newWeapon, setNewWeapon] = useState("Not generated yet");

  const [raceItem, setRaceItem] = useState("Unknown Race");

  const [healthStat, setHealthStat] = useState(null);
  const [attackStat, setAttackStat] = useState(null);

  function rollRace() {
    const newRaceId = Math.floor(Math.random() * race.length);
    const newRaceName = race[newRaceId].name;
    setRaceItem(newRaceName);
  }

  function roll() {
    const newAbilities = rollAbility();
    setAbilitiesItems(newAbilities);

    const attack = newAbilities[0].modifier;
    setAttackStat(attack + 2);

    const chosenClass = rollClass(newAbilities);
    setNewClass(chosenClass.chosenClass);
    setSelectedSkills(chosenClass.skills);

    setNewWeapon(
      chosenClass.chosenClass.weapon[chosenClass.newWeapon]
    );

    rollRace();

    const constitution = newAbilities[2];
    const healthJson = constitution.modifier;
    const health =
      Number(chosenClass.chosenClass.health) + Number(healthJson);

    setHealthStat(health);
  }

  return (
    <main>
      <div className="scrollContent">
        <header className="scrollHeader">
          <h1>{raceItem}</h1>
          <h2>{newClass?.name ?? "Choose Your Class"}</h2>
        </header>

        <div className="scrollMain">
          <aside className="scrollAbility">
            {abilitiesItems.length > 0 ? (
              abilitiesItems.map((item) => (
                <div key={item.id} className="abilityContainer">
                  <div className="abilityStat">
                    <h3>{item.name}</h3>
                    <h4>{item.score}</h4>
                  </div>

                  <div className="abilityModifier">
                    <h4>{item.modifier}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p className="placeholder">
                Your abilities will appear here.
              </p>
            )}
          </aside>

          <section className="scrollStats">
            <div className="scrollStat">
              <h3>HP: {healthStat ?? "Not generated"}</h3>
            </div>

            <div className="scrollStat">
              <h3>Weapon: {newWeapon}</h3>
            </div>

            <div className="scrollStat">
              <h3>
                Attack: {attackStat == null ? "Not generated" : `+ ${attackStat}`}
              </h3>
            </div>

            <div className="scrollStat">
              <h3>Skills: </h3>

              {selectedSkills.length > 0 ? (
                selectedSkills.map((item, index) => (
                  <p key={index}>{item}</p>
                ))
              ) : (
                <p className="placeholder">
                  Your skills will appear here.
                </p>
              )}
            </div>
          </section>
        </div>

        <button onClick={roll}>Generate Character</button>
      </div>
    </main>
  );
}
