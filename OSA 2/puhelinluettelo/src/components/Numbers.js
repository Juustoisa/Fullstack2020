import React from 'react'


const Numbers = ({list, newFilter, handleDeleteReq}) => {
    console.log(list)
    return (
    <div> 
        {list.filter(value => value.name.toLowerCase().includes(newFilter.toLowerCase())).map((x) =>
                    <p key={x.name}> {x.name} {x.number} <button onClick={() => handleDeleteReq(x)}>delete</button></p>
                )}
        </div>
    )
}

export default Numbers