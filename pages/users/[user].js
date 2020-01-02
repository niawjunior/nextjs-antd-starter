import React from 'react'
import { useRouter } from 'next/router'
const User = () => {
    const router = useRouter()
    const { user } = router.query
    return (
        <div>
            {
                user && <h1>{`Hello user ${user}`}</h1>
            }

        </div>
    )
}

export default User