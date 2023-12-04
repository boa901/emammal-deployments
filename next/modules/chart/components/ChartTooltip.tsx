'use client';

import { useEffect, useState } from 'react';

export default function ChartTooltip({ content, color }: { content: string, color: string }) {
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>();

  useEffect(() => {
    window.addEventListener('mousemove', (e) => setMousePosition({ x: e.pageX, y: e.pageY }));

    return () => window.removeEventListener('mousemove', (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  return mousePosition && content && content.length > 0 ? (
    <div
      style={{
        position: 'absolute',
        left: mousePosition.x + 15,
        top: mousePosition.y,
      }}
      className="flex flex-row bg-black/75 text-white rounded px-2"
    >
      <div className="w-4 h-4 border-2 border-white self-center mr-2" style={{ backgroundColor: color }} />
      <div className="self-center">{content}</div>
    </div>
  ) : null;
}
