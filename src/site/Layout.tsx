import React from 'react'
import AppWrapper, { GlobalTypes } from './AppWrapper'

const Layout: React.FC<GlobalTypes> = ({
    children
}) => {
    return (
        <AppWrapper className='min-h-screen bg-gray-100'>
            {children}
        </AppWrapper>
    )
}

export default Layout
