import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ClassesInfo from "./json/class.json"
import { LoadCharacter } from './components/loadCharacter'

function App() {
  const [abilities, setAbilities] = useState([
    { id: 0, name: "Strength", score: null, modifier: null },
    { id: 1, name: "Dexterity", score: null, modifier: null },
    { id: 2, name: "Constitution", score: null, modifier: null },
    { id: 3, name: "Intelligence", score: null, modifier: null },
    { id: 4, name: "Wisdom", score: null, modifier: null },
    { id: 5, name: "Charisma", score: null, modifier: null },
    ]);

  return (
    <>
      <LoadCharacter abilitiesItems={abilities} setAbilitiesItems={setAbilities} />
    </>
  )
}

export default App
