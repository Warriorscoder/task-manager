interface FilterButtonsProps {
    filter: string;
    setFilter: (filter: string) => void;
  }
  
  export default function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
    return (
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('All')}
          className={`px-3 py-1 rounded ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Active')}
          className={`px-3 py-1 rounded ${filter === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={`px-3 py-1 rounded ${filter === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Completed
        </button>
      </div>
    );
  }
  