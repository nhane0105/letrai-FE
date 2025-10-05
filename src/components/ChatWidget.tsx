'use client';

import { useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  from: 'me' | 'shop';
  type: 'text' | 'image' | 'video';
  content: string; // text content or objectURL for media
  time: number;
};
type Thread = { id: string; name: string; lastTime: string; unread?: number; messages: Message[] };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 't1',
      name: 'N&T Camping Official',
      lastTime: 'Hôm nay',
      unread: 0,
      messages: [
        { id: 'm1', from: 'shop', type: 'text', content: 'Xin chào! N&T Camping có thể giúp gì cho bạn?', time: Date.now() },
      ],
    },
    {
      id: 't2',
      name: 'Chăm sóc khách hàng',
      lastTime: 'Hôm qua',
      unread: 2,
      messages: [
        { id: 'm2', from: 'shop', type: 'text', content: 'Bạn cần hỗ trợ gì về đơn hàng?', time: Date.now() - 86400000 },
      ],
    },
  ]);
  const [activeId, setActiveId] = useState('t1');
  const active = threads.find((t) => t.id === activeId)!;
  const [input, setInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [activeId, threads, open]);

  function addMessage(msg: Message) {
    setThreads((prev) => prev.map((t) => (t.id === activeId ? { ...t, messages: [...t.messages, msg] } : t)));
  }

  function send() {
    if (!input.trim()) return;
    addMessage({ id: String(Date.now()), from: 'me', type: 'text', content: input.trim(), time: Date.now() });
    setInput('');
    // demo reply
    setTimeout(() => {
      addMessage({ id: String(Date.now() + 1), from: 'shop', type: 'text', content: 'Shop đã nhận được tin nhắn của bạn!', time: Date.now() });
    }, 600);
  }

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    files.forEach((f) => {
      const url = URL.createObjectURL(f);
      const type: 'image' | 'video' = f.type.startsWith('video') ? 'video' : 'image';
      addMessage({ id: String(Date.now() + Math.random()), from: 'me', type, content: url, time: Date.now() });
    });
    // optional auto-reply
    setTimeout(() => {
      addMessage({ id: String(Date.now() + Math.random()), from: 'shop', type: 'text', content: 'Shop đã nhận được tệp của bạn.', time: Date.now() });
    }, 600);
    e.currentTarget.value = '';
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-orange-600 text-white w-14 h-14 shadow-lg flex items-center justify-center"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="w-[920px] max-w-[96vw] h-[600px] max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden flex">
          {/* Sidebar threads */}
          <div className="w-72 border-r flex flex-col">
            <div className="px-3 py-3 border-b font-semibold flex items-center justify-between">
              Chat
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-2">
              <input placeholder="Tìm theo tên" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  className={`w-full text-left px-3 py-3 flex items-start gap-3 hover:bg-gray-50 ${activeId === t.id ? 'bg-orange-50' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-semibold">{t.name.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium line-clamp-1">{t.name}</span>
                      <span className="text-xs text-gray-400">{t.lastTime}</span>
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">{t.messages.at(-1)?.type === 'text' ? t.messages.at(-1)?.content : t.messages.at(-1)?.type === 'image' ? 'Đã gửi Ảnh' : 'Đã gửi Video'}</div>
                  </div>
                  {t.unread ? (
                    <span className="ml-2 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">{t.unread}</span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 flex flex-col">
            <div className="bg-orange-600 text-white px-4 py-3 font-semibold">{active.name}</div>
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-orange-50/30">
              {active.messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {m.type === 'text' ? (
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow ${
                        m.from === 'me' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-white border rounded-bl-none'
                      }`}
                    >
                      {m.content}
                    </div>
                  ) : m.type === 'image' ? (
                    <div className="max-w-[75%]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.content} alt="image" className="rounded-lg shadow border max-h-60" />
                    </div>
                  ) : (
                    <div className="max-w-[75%]">
                      <video src={m.content} controls className="rounded-lg shadow border max-h-60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 border-t bg-white flex items-center space-x-2">
              <button className="px-2 py-2 text-gray-500" onClick={() => fileRef.current?.click()}>📎</button>
              <input ref={fileRef} type="file" accept="image/*,video/*" multiple onChange={onPickFiles} className="hidden" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Nhập nội dung tin nhắn"
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button onClick={send} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Gửi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


