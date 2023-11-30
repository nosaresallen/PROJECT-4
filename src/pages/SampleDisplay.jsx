

function SampleDisplay({firstname, lastname, address, contact, gender, email, position, hiredate, deleteEmployee, employeeID}) {
    return (
        
        <div>
            <p>{firstname} {lastname} {address} {contact} {gender} {email} {position} {hiredate}</p>
            <button>edit</button>
            <button onClick={()=>{
                deleteEmployee(employeeID, firstname, lastname)
            }}>delete</button>
        </div>
    )
}

export default SampleDisplay