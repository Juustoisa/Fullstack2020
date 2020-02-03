import React from 'react'


const Filter = ({value, onChange}) => {
    return (
    <form>
        <div>
            Filter phonebook: <input
                value={value}
                onChange={onChange}
            />
        </div>
        
    </form>
    )
}

export default Filter