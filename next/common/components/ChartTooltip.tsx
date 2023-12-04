'use client';

import { useEffect, useState } from 'react';

export default function ChartTooltip({ content }: { content: string }) {
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
      className="flex flex-row content-center bg-gray-900 text-white rounded px-2"
    >
      {content}
    </div>
  ) : null;
}
