import React from 'react'

export interface GlobalTypes {
    className?: string | undefined;
    children?: React.ReactNode;
}

export const AppWrapper : React.FC<GlobalTypes> = ({
    children
}) => {
    return (
        <main>
            {children}
        </main>
    )
}