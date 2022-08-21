import React from "react";

const Persons = ({personsArr, searchValue, handleClick}) => {
    return (
        <ul>
            {personsArr.map((person) => {
                    if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        return (
                            <li key={person.name}>{person.name} {person.number} <button onClick={handleClick(person.id)}>delete</button></li>
                        )
                    }
                }
            )}
        </ul>
    )
}

export default Persons