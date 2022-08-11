import React from "react";

const PersonForm = ({changePersons, handleNameChange, handleNumberChange}) => {
    return (
        <>
            <form onSubmit={changePersons}>
                <div>
                    name: <input onChange={handleNameChange} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm