import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

import './login.css';
import Logo from './assets/WEAVER_logo.png';
const PROFILE_PLACEHOLDER = 'https://via.placeholder.com/64'; // placeholder avatar

const FIELD_TYPES = {
  TEXT: 'Text field',
  IMAGE: 'Image field',
  LINK: 'Link field',
  PHONE: 'Phone number',
};

export default function ProfileEditor() {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  function addField(type) {
    const id = Date.now();
    const newField = {
      id,
      type,
      x: 20 + (fields.length * 10) % 200,
      y: 20 + (fields.length * 10) % 200,
      width: 260,
      height: 80,
      content: type === FIELD_TYPES.TEXT ? 'Edit me' : type === FIELD_TYPES.IMAGE ? PROFILE_PLACEHOLDER : type === FIELD_TYPES.LINK ? 'https://example.com' : '+57 300 000 0000',
    };
    setFields(prev => [...prev, newField]);
    setSelectedId(id);
  }

  function updateField(id, patch) {
    setFields(prev => prev.map(f => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeField(id) {
    setFields(prev => prev.filter(f => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function moveFieldUp(id) {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
      return copy;
    });
  }

  function moveFieldDown(id) {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === id);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
      return copy;
    });
  }

  return (
    <div className="login-page min-h-screen">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="logo" className="w-10 h-10 object-contain bg-gray-200 rounded" />
          <div className="flex items-center gap-3">
            <img src={PROFILE_PLACEHOLDER} alt="profile" className="w-10 h-10 rounded-full" />
            <nav className="flex gap-4 items-center">
              <a className="text-sm text-gray-700 hover:underline">Your web</a>
              <a className="text-sm text-gray-700 hover:underline">Contact list</a>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input className="border rounded px-2 py-1 w-64" placeholder="Search..." />

          <div className="relative">
            <button className="px-3 py-1 border rounded">More ▾</button>
            {/* Dropdown - blank links for now */}
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow p-2 hidden">
              <a className="block py-1">Contact</a>
              <a className="block py-1">About us</a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex gap-6 px-6 py-6">
        {/* Left menu */}
        <aside className="w-64 bg-white p-4 rounded shadow h-[calc(100vh-150px)] sticky top-24">
          <button onClick={() => setShowTemplateMenu(v => !v)} className="w-full mb-3 px-3 py-2 rounded border">Use a template</button>
          {showTemplateMenu && (
            <div className="mb-3 border p-2 text-sm text-gray-600">Template menu (empty for now)</div>
          )}

          <div className="mb-3">
            <h4 className="text-sm font-semibold mb-2">Add fields</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => addField(FIELD_TYPES.TEXT)} className="text-left px-3 py-2 rounded border">Text field</button>
              <button onClick={() => addField(FIELD_TYPES.IMAGE)} className="text-left px-3 py-2 rounded border">Image field</button>
              <button onClick={() => addField(FIELD_TYPES.LINK)} className="text-left px-3 py-2 rounded border">Link field</button>
              <button onClick={() => addField(FIELD_TYPES.PHONE)} className="text-left px-3 py-2 rounded border">Phone number</button>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button className="w-full px-3 py-2 rounded border">Change background</button>
          </div>
        </aside>

        {/* Central editor area */}
        <main className="flex-1">
          <div className="border rounded-lg p-4" style={{ minHeight: '70vh' }}>
            <div className="bg-white/80 rounded p-4 shadow-inner" style={{ minHeight: '60vh', position: 'relative' }}>
              <p className="text-sm text-gray-600 mb-3">Editor area: drag and resize items. (Fields are constrained to this inner box.)</p>

              {/* Editable items rendered using react-rnd */}
              {fields.map(field => (
                <Rnd
                  key={field.id}
                  size={{ width: field.width, height: field.height }}
                  position={{ x: field.x, y: field.y }}
                  bounds="parent"
                  onDragStop={(e, d) => updateField(field.id, { x: d.x, y: d.y })}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateField(field.id, {
                      width: parseInt(ref.style.width, 10),
                      height: parseInt(ref.style.height, 10),
                      x: position.x,
                      y: position.y,
                    });
                  }}
                  onClick={() => setSelectedId(field.id)}
                  style={{ zIndex: selectedId === field.id ? 50 : 10 }}
                  className={`border rounded p-2 bg-white shadow ${selectedId === field.id ? 'ring-2 ring-indigo-300' : ''}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <strong className="text-sm">{field.type}</strong>
                      <div className="flex gap-1">
                        <button onClick={() => moveFieldUp(field.id)} title="Move up" className="text-xs px-2 py-1 border rounded">↑</button>
                        <button onClick={() => moveFieldDown(field.id)} title="Move down" className="text-xs px-2 py-1 border rounded">↓</button>
                        <button onClick={() => removeField(field.id)} title="Remove" className="text-xs px-2 py-1 border rounded">✕</button>
                      </div>
                    </div>

                    <div className="flex-1 mt-2">
                      {field.type === FIELD_TYPES.TEXT && (
                        <textarea className="w-full h-full text-sm p-2 border rounded" value={field.content} onChange={e => updateField(field.id, { content: e.target.value })} />
                      )}

                      {field.type === FIELD_TYPES.IMAGE && (
                        <img src={field.content} alt="field-img" className="w-full h-full object-contain" />
                      )}

                      {field.type === FIELD_TYPES.LINK && (
                        <input className="w-full text-sm p-2 border rounded" value={field.content} onChange={e => updateField(field.id, { content: e.target.value })} />
                      )}

                      {field.type === FIELD_TYPES.PHONE && (
                        <input className="w-full text-sm p-2 border rounded" value={field.content} onChange={e => updateField(field.id, { content: e.target.value })} />
                      )}
                    </div>
                  </div>
                </Rnd>
              ))}

              {fields.length === 0 && (
                <div className="text-gray-500 italic">No fields yet — use the left menu to add Text, Image, Link or Phone fields.</div>
              )}
            </div>
          </div>
        </main>

        {/* Right menu */}
        <aside className="w-64 bg-white p-4 rounded shadow h-[calc(100vh-150px)] sticky top-24 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold mb-2">Help</h4>
            <p className="text-sm text-gray-600">Need help? This panel can contain guidance for the editor.</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => console.log('saving...', fields)} className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
            <button onClick={() => console.log('publishing...', fields)} className="flex-1 px-3 py-2 rounded border">Publish</button>
          </div>
        </aside>
      </div>
    </div>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
