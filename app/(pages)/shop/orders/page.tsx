import React from 'react'
import { userRequired } from '@/hooks/userRequired'
async function Orderspage() {
    await userRequired()
    return (
        <div>
            orders
        </div>
    )
}

export default Orderspage
