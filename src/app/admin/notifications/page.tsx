'use client';

import { useState } from 'react';

interface Notification {
  id: number;
  type: 'customer_complaint' | 'landlord_complaint';
  productName: string;
  rentalPrice: number;
  reason: string;
  description: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'customer_complaint',
      productName: 'Lều cắm trại 4 người',
      rentalPrice: 150000,
      reason: 'Sản phẩm không đúng mô tả',
      description: 'Lều bị rách và không đúng như hình ảnh',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      type: 'landlord_complaint',
      productName: 'Lều cắm trại 2 người',
      rentalPrice: 80000,
      reason: 'Khách hàng không trả tiền',
      description: 'Khách hàng đã sử dụng nhưng không thanh toán',
      status: 'pending',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      type: 'customer_complaint',
      productName: 'Thuyền SUP',
      rentalPrice: 200000,
      reason: 'Thiết bị hỏng',
      description: 'Thuyền bị thủng và không thể sử dụng',
      status: 'pending',
      createdAt: '2024-01-13'
    }
  ]);

  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const [decisionData, setDecisionData] = useState({
    resolution: '',
    note: ''
  });

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setDecisionData({
      resolution: '',
      note: ''
    });
    setShowDecisionModal(true);
  };

  const handleDecision = () => {
    if (selectedNotification) {
      setNotifications(notifications.map(n => 
        n.id === selectedNotification.id 
          ? { ...n, status: 'resolved' as const }
          : n
      ));
      setShowDecisionModal(false);
      setSelectedNotification(null);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getNotificationTypeText = (type: string) => {
    switch (type) {
      case 'customer_complaint':
        return 'Đơn khiếu nại từ khách hàng';
      case 'landlord_complaint':
        return 'Đơn khiếu nại từ chủ thuê';
      default:
        return 'Thông báo';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Giao diện admin/Thông báo</h1>
      </div>

      {/* Notification Type Dropdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Tất cả thông báo</option>
                <option value="customer_complaint">Khiếu nại từ khách hàng</option>
                <option value="landlord_complaint">Khiếu nại từ chủ thuê</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-red-600">Thông báo</h2>
            <div className="flex-1 max-w-md ml-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <div key={notification.id} className="border-b border-gray-200 pb-4">
                {index > 0 && <hr className="my-4" />}
                
                <div className="flex items-start space-x-4">
                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 text-sm">IMG</span>
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                      {getNotificationTypeText(notification.type)}
                    </h3>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Tên sản phẩm:</strong> {notification.productName}</p>
                      <p><strong>Tiền cho thuê:</strong> {notification.rentalPrice.toLocaleString()} VND</p>
                      <p><strong>Lý do:</strong> {notification.reason}</p>
                      <p><strong>Mô tả:</strong> {notification.description}</p>
                      <p><strong>Ngày tạo:</strong> {notification.createdAt}</p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleViewDetails(notification)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Không có thông báo nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail + Decision Modal */}
      {showDecisionModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Phiếu khiếu nại</h3>
              <button
                onClick={() => setShowDecisionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Complaint ticket layout */}
            <div className="border rounded-lg">
              {/* Header mimic */}
              <div className="border-b p-4 text-center font-bold tracking-wide">KHIẾU NẠI</div>

              {/* Selected product */}
              <div className="border-b p-4">
                <p className="text-sm text-blue-700 underline mb-3">Sản phẩm đã chọn:</p>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">IMG</span>
                  </div>
                  <div className="text-sm">
                    <p><strong>Tên sản phẩm</strong>: {selectedNotification.productName}</p>
                    <p><strong>Thành tiền</strong>: {selectedNotification.rentalPrice.toLocaleString()} VND</p>
                  </div>
                </div>
              </div>

              {/* Complaint fields */}
              <div className="p-4 space-y-4">
                <div className="text-sm font-medium">Chọn sản phẩm cần Khiếu nại</div>

                <div>
                  <label className="block text-sm text-red-600 mb-1">* Lý do:</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedNotification.reason}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Mô tả:</label>
                  <textarea
                    readOnly
                    value={selectedNotification.description}
                    className="w-full px-3 py-2 border rounded"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">*Đăng kèm hình ảnh hoặc video:</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="px-3 py-1 border rounded text-xs bg-gray-100" disabled>IMG</button>
                    <button className="px-3 py-1 border rounded text-xs bg-gray-100" disabled>VID</button>
                  </div>
                </div>

                {/* Decision area */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hướng giải quyết</label>
                    <select
                      value={decisionData.resolution}
                      onChange={(e) => setDecisionData({...decisionData, resolution: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Chọn hướng giải quyết</option>
                      <option value="refund_full">Hoàn tiền đầy đủ cho khách hàng</option>
                      <option value="refund_half">Hoàn phân nửa cho chủ thuê</option>
                      <option value="no_refund">Không hoàn tiền</option>
                      <option value="replace_product">Thay thế sản phẩm</option>
                      <option value="partial_refund">Hoàn tiền một phần</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú thêm</label>
                    <textarea
                      value={decisionData.note}
                      onChange={(e) => setDecisionData({...decisionData, note: e.target.value})}
                      placeholder="Nhập ghi chú về quyết định..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-2">
                  <div className="space-x-3">
                    <button
                      onClick={() => { handleDecision(); }}
                      className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
                    >
                      Đồng ý
                    </button>
                    <button
                      onClick={() => { setShowDecisionModal(false); setSelectedNotification(null); }}
                      className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                    >
                      Từ chối
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
