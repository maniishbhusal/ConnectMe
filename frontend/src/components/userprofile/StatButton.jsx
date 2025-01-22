import React from 'react';

export function StatButton({ label, value }) {
  return (
    <button className="text-center hover:bg-accent px-3 py-1 rounded-md transition-colors">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </button>
  );
}
