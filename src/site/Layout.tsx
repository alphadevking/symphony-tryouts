import React from 'react'
import { AppWrapper, GlobalTypes } from './AppWrapper'

const Layout:React.FC<GlobalTypes> = ({
    children
}) => {
    return (
        <AppWrapper>
            {children}
        </AppWrapper>
    )
}

export default Layout