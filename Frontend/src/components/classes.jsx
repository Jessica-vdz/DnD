import { useState } from "react"
import ClassesInfo from "../json/class.json"

export function Classes({abil}){
    const [classes, setClasses] = useState([]);
    const classItem = [];

    for (let i = 0; i < ClassesInfo.length; i++){
        classItem.push(ClassesInfo[i]);
    }

    function roll() {
        const className = Math.floor(Math.random() * classItem.length) + 1
        console.log(classItem[className]);
    }
    return(
        <section>
            {classItem.map((item) => (
                <div key={item.id}>
                <h2>{item.name}</h2>
                <h4>{item.skill}</h4>
                </div>
            ))}
            <button onClick={roll}></button>
        </section>
    )
}