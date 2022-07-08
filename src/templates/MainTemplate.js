import React from 'react'
import ApplicationBar from '../components/ApplicationBar'

const MainTemplate = ({ children }) => {
    return (
        <div>
            <ApplicationBar />
            {children}
        </div>
    )
}

export default MainTemplate
