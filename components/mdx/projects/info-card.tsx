interface InfoCardProps {
  title: string;
  items: {
    label: string;
    content: string | React.ReactNode;
  }[];
}

export function InfoCard({ title, items }: InfoCardProps) {
  return (
    <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-lg">
      {/* Title Bar */}
      <div className="bg-orange-500 text-white px-6 py-4">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex p-4 rounded-xl border border-gray-100 bg-white"
          >
            <div className="min-w-[120px] font-medium text-gray-700">
              {item.label}
            </div>
            <div className="flex-1 text-gray-600">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
