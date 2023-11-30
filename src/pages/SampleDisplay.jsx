

function SampleDisplay({firstname, lastname, address, contact, gender, email, position, hiredate, deleteEmployee, employeeID}) {
    return (
        
        <div>
            <p>{firstname} {lastname} {address} {contact} {gender} {email} {position} {hiredate}</p>
            <button>Edit</button>
            <button onClick={()=>{
                deleteEmployee(employeeID, firstname, lastname)
            }}>Delete</button>
        </div>
    )
}

export default SampleDisplay