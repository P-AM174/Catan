import React, { useState } from 'react';

const RESOURCES = ['木材', 'レンガ', '羊毛', '小麦', '鉄鉱石'];
const COSTS = {
  '街道': { 木材: 1, レンガ: 1 },
  '開拓地': { 木材: 1, レンガ: 1, 羊毛: 1, 小麦: 1 },
  '都市': { 小麦: 2, 鉄鉱石: 3 },
  '発展カード': { 羊毛: 1, 小麦: 1, 鉄鉱石: 1 },
};

export default function CatanTracker() {
  const [inventory, setInventory] = useState({
    木材: 0, レンガ: 0, 羊毛: 0, 小麦: 0, 鉄鉱石: 0
  });

  // 資源の増減
  const updateRes = (res, amount) => {
    setInventory(prev => ({
      ...prev,
      [res]: Math.max(0, prev[res] + amount)
    }));
  };

  // 建築コストの支払い
  const build = (item) => {
    const cost = COSTS[item];
    const canAfford = Object.keys(cost).every(res => inventory[res] >= cost[res]);

    if (canAfford) {
      setInventory(prev => {
        const next = { ...prev };
        Object.keys(cost).forEach(res => {
          next[res] -= cost[res];
        });
        return next;
      });
    } else {
      alert("資源が足りません！");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">Catan Resource Manager</h1>

      {/* 資源カウンター */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {RESOURCES.map(res => (
          <div key={res} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
            <span className="text-lg font-bold">{res}</span>
            <div className="flex items-center gap-4">
              <button onClick={() => updateRes(res, -1)} className="bg-red-100 text-red-600 w-10 h-10 rounded-full text-xl">-</button>
              <span className="text-2xl w-8 text-center">{inventory[res]}</span>
              <button onClick={() => updateRes(res, 1)} className="bg-green-100 text-green-600 w-10 h-10 rounded-full text-xl">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* 建築ボタン */}
      <h2 className="text-xl font-semibold mb-3">建築 / 購入</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(COSTS).map(item => (
          <button
            key={item}
            onClick={() => build(item)}
            className="bg-blue-500 text-white py-3 rounded-lg font-medium active:bg-blue-700 shadow-md"
          >
            {item}
          </button>
        ))}
      </div>

      {/* リセットボタン */}
      <button 
        onClick={() => setInventory({木材:0, レンガ:0, 羊毛:0, 小麦:0, 鉄鉱石:0})}
        className="w-full mt-10 py-2 text-gray-500 underline text-sm"
      >
        すべてリセット
      </button>
    </div>
  );
}
