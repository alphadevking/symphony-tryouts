import React from 'react'

export interface GlobalTypes {
    className?: string | undefined;
    children?: React.ReactNode;
}

const AppWrapper: React.FC<GlobalTypes> = ({
    children
}) => {
    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
}

export default AppWrapper
