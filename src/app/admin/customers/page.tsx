'use client';

import { useMemo, useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob?: string;
  address?: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'C001', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '+84 123 456 789', dob: '1998-03-31', address: '273 An Dương Vương, Quận 5' },
  ]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState<Customer>({ id: '', name: '', email: '', phone: '', dob: '', address: '' });

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
      ),
    [customers, search]
  );

  const openAdd = () => {
    setForm({ id: '', name: '', email: '', phone: '', dob: '', address: '' });
    setShowAdd(true);
  };

  const openEdit = (c: Customer) => {
    setForm({ ...c });
    setShowEdit(true);
  };

  const saveCustomer = () => {
    if (showAdd) {
      const id = `C${String(Date.now()).slice(-4)}`;
      setCustomers((prev) => [...prev, { ...form, id }]);
      setShowAdd(false);
    } else if (showEdit) {
      setCustomers((prev) => prev.map((c) => (c.id === form.id ? form : c)));
      setShowEdit(false);
    }
  };

  const deleteCustomer = (id: string) => {
    if (confirm('Xóa khách hàng này?')) setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Giao diện admin/ Người dùng</h1>
        <div className="flex items-center space-x-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button onClick={openAdd} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Thêm</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white border rounded-lg p-4 flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold">
                {c.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-gray-500">{c.email}</div>
                <div className="text-xs text-gray-500">{c.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => openEdit(c)}
                className="p-2 rounded hover:bg-green-50 text-green-600"
                title="Sửa"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
              <button
                onClick={() => deleteCustomer(c.id)}
                className="p-2 rounded hover:bg-red-50 text-red-600"
                title="Xóa"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-500">Không có khách hàng</div>}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Customer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Enter Full Name" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Enter Email" />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Enter Phone" />
              </div>
              <div>
                <label className="block text-sm mb-1">Date of Birth</label>
                <input type="date" value={form.dob} onChange={(e)=>setForm({...form,dob:e.target.value})} className="w-full border rounded px-3 py-2" placeholder="mm/dd/yyyy" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1">Address</label>
              <input value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Enter Address" />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={()=>setShowAdd(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={saveCustomer} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Save Customer</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 mx-4">
            <h3 className="text-lg font-semibold mb-4">Update Customer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Date of Birth</label>
                <input type="date" value={form.dob} onChange={(e)=>setForm({...form,dob:e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1">Address</label>
              <input value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={()=>setShowEdit(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={saveCustomer} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Save Customer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
