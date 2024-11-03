import { AppleOutlined, BellOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='py-5 flex border-b-[2px] border-white items-center justify-between bg-[#001529]'>
      <Link className='pl-2 flex items-center text-white' to={"/"}>
        <AppleOutlined className='text-white scale-[2]' />
        <span className='text-[20px] pl-3'>Apple</span>
      </Link>
      <div className='flex items-center gap-5'>
        <Badge count={5} size='small'>
          <BellOutlined className='text-white scale-[1.5]' />
        </Badge>
        <Button size='middle' type='primary'>Log out</Button>
      </div>
    </div>
  )
}

export default Header