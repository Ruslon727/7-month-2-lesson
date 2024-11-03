import React, { useState } from 'react';
import { BankOutlined, LineOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { usePath } from '../hook/usePath';
const items = [
    {
        key: '1',
        icon: <BankOutlined className='scale-150' />,
        label: 'Tashkilotlar',
        children: [
            {
                key: '11',
                label: <Link to={usePath.organization}>Mening tashkilotim</Link>,
                icon: <LineOutlined/>
            }
        ],
    },
    {
        key: '2',
        icon: <UsergroupAddOutlined className='scale-150' />,
        label: 'Foydalanuvchilar',
        children: [
            {
                key: '22',
                label: <Link to={usePath.admin}>Administrator</Link>,
                icon: <LineOutlined/>
            },
            {
                key: '23',
                label: <Link to={usePath.students}>O'quvchilar</Link>,
                icon: <LineOutlined/>
            }   
        ],
    },
];
const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items);
const Navbar = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <Menu
            theme='dark'
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{
                width: "22%",
                height: "87.8vh"
            }}
            items={items}
        />
    );
};
export default Navbar;