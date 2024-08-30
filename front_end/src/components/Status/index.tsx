import React, { ButtonHTMLAttributes } from 'react'
import { Tag } from 'antd'
import './style.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    status: number;
    activedText?: string;
    bannedText?: string;
}

// const Status: React.FC<Props> = ({
//     status,
//     activedText = 'Active',
//     bannedText = 'Banned',
//     ...rest
// }) => {
//     if( status === 'active'){
//         return <Tag color="success" {...rest}>{activedText}</Tag>;
//     }
//     if( status === 'banned'){
//         return <Tag color='error' {...rest}>{bannedText}</Tag>
//     }
//     return null
// }
const Status: React.FC<Props> = ({
    status,
    activedText = 'Active',
    bannedText = 'Banned',
    ...rest
}) => {
    if (status === 1) {
        return <Tag color="success" className='status-tag success-tag' {...rest}>{activedText}</Tag>;
    }
    else if (status === 0) {
        return <Tag color='error' className='status-tag error-tag' {...rest}>{bannedText}</Tag>
    } else {
        return null
    }
}

export default Status