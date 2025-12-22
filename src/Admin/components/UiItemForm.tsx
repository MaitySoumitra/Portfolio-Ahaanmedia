// src/components/UiItemForm.tsx

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addUiItem } from '../api/uiItems';
import type { UiItem } from '../types';

const UiItemForm: React.FC = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [htmlUrl, setHtmlUrl]=useState('')

  const { mutate, isSuccess, error, isPending } = useMutation({
    mutationFn: (item: UiItem) => addUiItem(item),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({  name:name.trim(), imageUrl:imageUrl.trim(), htmlUrl:htmlUrl.trim() });
    setName('');
    setImageUrl('');
    setHtmlUrl('')
  };

  return (
    <div className="bg-[#fcfaf3] p-8 rounded-xl shadow-xl w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add UI Item</h2>

      {isSuccess && <p className="text-green-600 mb-4 text-sm text-center">✅ Item added successfully!</p>}
      {error && <p className="text-red-600 mb-4 text-sm text-center">❌ Failed to add item.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
        />

        {/* Use textarea for URL for better control/visibility */}
        <textarea
          placeholder="Image URL... end with .jpg/.png/.jpeg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          rows={3}
          className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white resize-none"
        />
        <textarea
          placeholder="Html URL... end with .html"
          value={htmlUrl}
          onChange={(e) => setHtmlUrl(e.target.value)}
          required
          rows={3}
          className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white resize-none"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition duration-200 font-medium"
        >
          {isPending ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default UiItemForm;
