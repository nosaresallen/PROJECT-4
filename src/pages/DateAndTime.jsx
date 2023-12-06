import { useState, useEffect } from 'react';

function DateTimeDisplay () {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return date.toLocaleTimeString('en-US', options);
    };

    return (
        <div style={{  textAlign: 'center', color: 'white' }}>
            <p >{formatDate(currentDateTime)}</p>
            <p>{formatTime(currentDateTime)}</p>
        </div>
    );
}

export default DateTimeDisplay;
