'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0
  });

  useEffect(() => {
    // Mock data - trong thực tế sẽ fetch từ API
    setStats({
      totalSales: 15350000,
      totalOrders: 458,
      totalCustomers: 1250,
      totalProducts: 1250
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const statCards = [
    {
      title: 'Total Sales',
      value: formatCurrency(stats.totalSales),
      icon: (
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      ),
      color: 'red'
    },
    {
      title: 'Total Orders',
      value: formatNumber(stats.totalOrders),
      icon: (
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
      ),
      color: 'yellow'
    },
    {
      title: 'Total Customer',
      value: formatNumber(stats.totalCustomers),
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      ),
      color: 'blue'
    },
    {
      title: 'Total Products',
      value: formatNumber(stats.totalProducts),
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
      ),
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Chart</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 relative">
                {/* Mock line chart */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Y-axis */}
                  <line x1="20" y1="20" x2="20" y2="180" stroke="#e5e7eb" strokeWidth="2"/>
                  {/* X-axis */}
                  <line x1="20" y1="180" x2="180" y2="180" stroke="#e5e7eb" strokeWidth="2"/>
                  
                  {/* Grid lines */}
                  <line x1="20" y1="60" x2="180" y2="60" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="20" y1="140" x2="180" y2="140" stroke="#f3f4f6" strokeWidth="1"/>
                  
                  {/* Data lines */}
                  <path d="M30 160 Q60 140 90 120 T150 80" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M30 150 Q60 130 90 110 T150 70" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M30 140 Q60 120 90 100 T150 60" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  
                  {/* Data points */}
                  <circle cx="30" cy="160" r="3" fill="#8b5cf6"/>
                  <circle cx="60" cy="140" r="3" fill="#8b5cf6"/>
                  <circle cx="90" cy="120" r="3" fill="#8b5cf6"/>
                  <circle cx="120" cy="100" r="3" fill="#8b5cf6"/>
                  <circle cx="150" cy="80" r="3" fill="#8b5cf6"/>
                </svg>
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>2020</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>2021</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span>2022</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">unit: trăm Vnd</p>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 relative">
                {/* Mock donut chart */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="50 200" strokeDashoffset="0"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="40 200" strokeDashoffset="-50"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="30 200" strokeDashoffset="-90"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#06b6d4" strokeWidth="20" strokeDasharray="25 200" strokeDashoffset="-120"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="20 200" strokeDashoffset="-145"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="15 200" strokeDashoffset="-165"/>
                  
                  {/* Center text */}
                  <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-gray-900">1123.07</text>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Category 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Category 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Category 3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span>Category 4</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span>Category 5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Category 6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
