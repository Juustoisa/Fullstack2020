import React from 'react'


const NewContact = ({addName, nameValue, onChangeName, numberValue, onChangeNumber}) => {
    return (
        <form onSubmit={addName}>

        <div>
            name: <input
                value={nameValue}
                onChange={onChangeName}
            />
        </div>
        <div>
            number: <input
                value={numberValue}
                onChange={onChangeNumber}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default NewContact