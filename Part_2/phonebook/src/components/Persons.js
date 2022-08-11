import React from "react";

const Persons = ({personsArr, searchValue}) => {
    return (
        <ul>
            {personsArr.map((person) => {
                    if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        return (
                            <li key={person.name}>{person.name} {person.number}</li>
                        )
                    }
                }
            )}
        </ul>
    )
}

export default Persons