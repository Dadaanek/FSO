import React from "react";

const PersonForm = ({changePersons, handleNameChange, handleNumberChange, nameValue, numberValue}) => {
    return (
        <>
            <form onSubmit={changePersons}>
                <div>
                    name: <input onChange={handleNameChange} value={nameValue}/>
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={numberValue}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm