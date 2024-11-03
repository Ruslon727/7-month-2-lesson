import { Button } from 'antd'
import React from 'react'

function PageInfo({title, subtitle, count, btnTitle}) {
    return (
        <div className='flex items-center  justify-between'>
            <div className='flex flex-col'>
                <h2 className='font-bold text-[25px]'>{title}</h2>
                <span className='text-slate-500 text-[15px] pl-1'>{subtitle} ({count})</span>
            </div>
            <Button size='large' type='primary'>{btnTitle}</Button>
        </div>)
}

export default PageInfo