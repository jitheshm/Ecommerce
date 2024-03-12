import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Mobile({ children }) {
    const navigate = useNavigate()
    const [component, setComponent] = useState(null)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setComponent(children);
            } else {
                navigate('/');
            }
        };

        // Initial setup
        handleResize();

        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [children])
   
    return (
        <div>
            {
                component
            }
        </div>
    )
}

export default Mobile