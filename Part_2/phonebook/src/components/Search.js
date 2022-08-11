import React from "react";

const Search = ({handleEvent}) => {
    return (
        <div>
            filter shown with<input onChange={handleEvent} />
        </div>
    )
}

export default Search