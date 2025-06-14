import React, { useState, useEffect } from 'react';
import { Badge, Dropdown, Button, List, Avatar, Empty, Spin, Tag } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useGetNotificationsQuery } from '../../services/notificationApi';
import { selectUserProfile } from '@/store/slices/userProfileSlice';

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const userProfile = useSelector(selectUserProfile);
  const [filters, setFilters] = useState({
    taskUpdates: true,
    projectUpdates: true,
    mentions: true,
    comments: true
  });

  // Lấy cài đặt từ user profile khi component mount
  useEffect(() => {
    if (userProfile?.notificationSettings) {
      const { pushNotifications } = userProfile.notificationSettings;
      setFilters({
        taskUpdates: pushNotifications.taskUpdates, 
        projectUpdates: pushNotifications.projectUpdates,
        mentions: pushNotifications.mentions,
        comments: pushNotifications.comments
      });
    }
  }, [userProfile]);

  // Lọc thông báo theo cài đặt
  const { data: notificationsData, isLoading } = useGetNotificationsQuery(filters);

  const renderNotificationList = () => {
    if (isLoading) return <Spin />;
    if (!notificationsData?.data || notificationsData.data.length === 0) {
      return <Empty description="Không có thông báo" />;
    }

    return (
      <List
        itemLayout="horizontal"
        dataSource={notificationsData.data}
        style={{ maxHeight: '400px', overflow: 'auto', padding: '8px' }}
        renderItem={notification => {
          // Xác định loại thông báo
          let tagColor;
          let tagText;
          
          switch (notification.types) {
            case 'task_update':
              tagColor = 'blue';
              tagText = 'Nhiệm vụ';
              break;
            case 'project_update':
              tagColor = 'green';
              tagText = 'Dự án';
              break;
            case 'mention':
              tagColor = 'purple';
              tagText = 'Nhắc tên';
              break;
            case 'comment':
              tagColor = 'orange';
              tagText = 'Bình luận';
              break;
            default:
              tagColor = 'default';
              tagText = 'Hệ thống';
          }

          return (
            <List.Item className={notification.isRead ? 'bg-gray-50' : 'bg-white hover:bg-gray-100 cursor-pointer'}>
              <List.Item.Meta
                avatar={<Avatar src={notification.authorId?.profileImage} />}
                title={
                  <div className="flex items-center">
                    <Tag color={tagColor}>{tagText}</Tag>
                    <span>{notification.content}</span>
                  </div>
                }
                description={formatDistanceToNow(new Date(notification.createdAt), { 
                  addSuffix: true,
                  locale: vi 
                })}
              />
            </List.Item>
          );
        }}
      />
    );
  };

  return (
    <Dropdown
      overlay={
        <div className="w-80 bg-white rounded-md shadow-lg">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium">Thông báo</h3>
            <Button type="link" size="small">Đánh dấu đã đọc</Button>
          </div>
          {renderNotificationList()}
        </div>
      }
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
    >
      <Badge count={notificationsData?.unreadCount || 0} size="small" offset={[-2, 2]}>
        <Button 
          className="flex items-center" 
          type="text" 
          icon={<BellOutlined style={{ fontSize: '20px' }} />} 
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationsDropdown;