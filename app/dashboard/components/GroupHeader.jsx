export default function GroupHeader({ title, isExpanded, onToggle }) {
    return (
      <div className="flex items-center gap-2 py-4 px-6 bg-gray-50 border-y border-gray-200">
        <button
          onClick={onToggle}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
    );
  }