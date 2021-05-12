import React from 'react'
import {formatRelative} from 'date-fns'

function Message({created=null, text='', displayName='', photoURL=''}) {
    return (
        <div className='msg'>
            <div className="content">
                <span className="contentItem">
            {photoURL?(
                <img className='portrait' src={photoURL} alt="Avatar" width={45} height={45} />
            ):null}
            </span>
            <span className="contentItem">
            {displayName? <p>{displayName}</p>:null}
            </span>
            <span className="contentItem">
            {created?.seconds?(
                <span>
                    {formatRelative(new Date(created.seconds * 1000),new Date())}
                </span>
            ):null}
            </span>
            </div>
            <p className='textmsg'>{text}</p>
        </div>
    )
}

export default Message
