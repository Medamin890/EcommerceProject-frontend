import React from 'react';
import { Dropdown, Button } from 'antd';
import { FilterOutlined, ArrowDownOutlined, ArrowUpOutlined, DownOutlined } from '@ant-design/icons';

const sortMenuItems = [
  { key: 'relevant', label: 'Relevant', icon: <FilterOutlined /> },
  { key: 'high', label: 'High to Low Price', icon: <ArrowDownOutlined /> },
  { key: 'low', label: 'Low to High Price', icon: <ArrowUpOutlined /> },
];

const SortDropdown = ({ setSortType }) => {
  const handleMenuClick = (e) => {
    setSortType(e.key);
  };

  // Use the new menu prop API with an object containing `items` and an onClick handler
  const menuProps = {
    items: sortMenuItems,
    onClick: handleMenuClick,
    selectable: true,
    defaultSelectedKeys: ['relevant'],
  };

  return (
    <Dropdown menu={menuProps} trigger={['hover']}>
      <Button>
        Sort By <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SortDropdown;
