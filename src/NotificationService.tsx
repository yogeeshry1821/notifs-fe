import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // Replace with your backend URL

export interface Notification {
    _id: string;
    message: string;
    category: 'info' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
}

export const fetchNotifications = async (
    userId: string,
    category?: string
): Promise<Notification[]> => {
    const response = await axios.get(`${API_BASE}/notifications/${userId}`, {
        params: { category },
    });
    return response.data;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
    await axios.patch(`${API_BASE}/notifications/${notificationId}/mark-read`);
};

export const sendNotification = async (
    message: string,
    userId: string,
    category: 'info' | 'warning' | 'error'
): Promise<void> => {
    await axios.post(`${API_BASE}/notify`, { message, userId, category });
};
