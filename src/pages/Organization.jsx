import { Input, Select, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import PageInfo from '../components/PageInfo'
import CustomTable from '../components/CustomTable'
import { HTTP } from '../hook/useEnv'
import axios from 'axios'
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebounce'

function Organization() {
  const [tBodyData, setTBodyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const tHeadData = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
    },
    {
      title: 'Inn',
      dataIndex: 'inn',
    },
    {
      title: 'Direktor',
      dataIndex: 'director',
    },
    {
      title: 'Yaratilgan vaqt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Manzil',
      dataIndex: 'adress',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];
  const [searchData, setSearchData] = useState("")
  function handleSearchOrganization(e) {
    setIsLoading(true)
    setSearchData(e.target.value.toLowerCase())
    if (!e.target.value) {
      setTimeout(() => setRefresh(!refresh), 1000)
    }
  }
  const searchByName = useDebounce(searchData, 1000)

  useEffect(() => {
    if (searchByName) {
      setIsLoading(false)
      const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
      setTBodyData(filteredData)
    }
  }, [searchByName])

  useEffect(() => {
    axios(`${HTTP}/organization`).then(res => {
      setIsLoading(false)
      setTBodyData(res.data.map(item => {
        item.action = <div className='flex items-center gap-5'>
          <DashOutlined className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-blue-500' />
          <EditOutlined className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-green-500' />
          <DeleteOutlined className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-red-500' />
        </div>
        item.status = <Switch size='small' defaultChecked={JSON.parse(item.status)} />
        return item
      }))
    })
  }, [refresh])


  return (
    <div className='p-5'>
      <PageInfo title={"Tashkilotlar"} btnTitle={"Qo'shish"} count={5} subtitle={"tashkilotlar"} />
      <div className='my-5 flex items-center gap-5'>
        <Input onChange={handleSearchOrganization} placeholder='Qidirish...' type='text' size='large' allowClear className='w-[300px]' />
        <Select showSearch placeholder="Inn tanlang" optionFilterProp='label' size='large' className='w-[300px]' options={[{ value: "jack", label: "Jack", },]} />
      </div>
      <div>
        <CustomTable isLoading={isLoading} tBody={tBodyData} tHead={tHeadData} />
      </div>
    </div>
  )
}

export default Organization