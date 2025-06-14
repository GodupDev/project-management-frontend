import React, { useState } from 'react';
import { List, Avatar, Badge, Tag, Button, Empty, Spin } from 'antd';
import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../services/notificationApi';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';

const NotificationsList = () => {
  const currentUser = useSelector(selectCurrentUser);
  
  const [filters, setFilters] = useState({
    taskUpdates: true,
    projectUpdates: true,
    mentions: true,
    comments: true,
    isRead: undefined // undefined = all, true = read, false = unread
  });

  const { data: notificationsData, isLoading, isError } = useGetNotificationsQuery(filters);
  const [markAsRead] = useMarkAsReadMutation();

  const handleFilterChange = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAsRead('all').unwrap();
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  if (isLoading) return <Spin size="large" className="flex justify-center my-8" />;
  
  if (isError) return <Empty description="Không thể tải thông báo" />;
  
  const notifications = notificationsData?.data || [];

  return (
    <div className="notifications-list">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Tag.CheckableTag
            checked={filters.taskUpdates}
            onChange={() => handleFilterChange('taskUpdates')}
          >
            Tasks
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={filters.projectUpdates}
            onChange={() => handleFilterChange('projectUpdates')}
          >
            Projects
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={filters.mentions}
            onChange={() => handleFilterChange('mentions')}
          >
            Mentions
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={filters.comments}
            onChange={() => handleFilterChange('comments')}
          >
            Comments
          </Tag.CheckableTag>
        </div>
        <Button type="link" onClick={handleMarkAllAsRead}>
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={notifications}
        locale={{ emptyText: 'Không có thông báo' }}
        renderItem={(notification) => (
          <List.Item 
            className={notification.isRead ? 'bg-gray-50' : 'bg-white'}
            actions={[
              !notification.isRead && (
                <Button type="link" size="small" onClick={() => handleMarkAsRead(notification._id)}>
                  Đánh dấu đã đọc
                </Button>
              )
            ]}
          >
            <List.Item.Meta
              avatar={
                <Badge dot={!notification.isRead}>
                  <Avatar src={notification.authorId?.profileImage || 'https://via.placeholder.com/40'} />
                </Badge>
              }
              title={<span>{notification.content}</span>}
              description={
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  {notification.projectId?.name && ` • ${notification.projectId.name}`}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationsList;