import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  fetchNotifications,
  markAsRead,
  Notification,
} from './NotificationService';

const socket: Socket = io('http://localhost:3000'); // Replace with your backend URL

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error'>(
    'all'
  );

  useEffect(() => {
    // Fetch initial notifications
    fetchNotifications('user123').then(setNotifications);

    // Listen for real-time notifications
    socket.on('receive_notification', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    // Cleanup
    return () => {
      socket.off('receive_notification');
    };
  }, []);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id).then(() => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    });
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((notif) => notif.category === filter);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="flex gap-4 mb-4">
        {(['all', 'info', 'warning', 'error'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`btn p-2 rounded-lg ${filter === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredNotifications.map((notif) => (
          <div
            key={notif._id}
            className={`p-4 border rounded ${notif.isRead ? 'bg-gray-100' : 'bg-blue-100'
              }`}
          >
            <p>{notif.message}</p>
            <p className="text-sm text-gray-600">Category: {notif.category}</p>
            {!notif.isRead && (
              <button
                onClick={() => handleMarkAsRead(notif._id)}
                className="text-blue-500 underline"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
