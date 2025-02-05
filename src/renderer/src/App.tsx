const App = () => {
  return (
    <div className="min-h-screen bg-slate-800 p-6">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-white rounded shadow">
            Test Connection
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white">Status:</span>
            <span className="text-green-400">Connected</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white"
            placeholder="Search..."
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* CRUD Panel */}
          <div className="bg-slate-700 p-6 rounded-lg">
            <h2 className="text-white text-lg font-semibold mb-4">CRUD</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-white">First Name:</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded border border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-white">Last Name:</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded border border-gray-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-pink-200 px-4 py-2 rounded">Add</button>
                <button className="bg-pink-200 px-4 py-2 rounded">Update</button>
                <button className="bg-red-700 text-white px-4 py-2 rounded col-span-2">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* User's Data Panel */}
          <div className="bg-slate-700 p-6 rounded-lg">
            <h2 className="text-white text-lg font-semibold mb-4">User's Data</h2>
            <div className="bg-white rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-2 px-4 text-left">id</th>
                    <th className="py-2 px-4 text-left">f_name</th>
                    <th className="py-2 px-4 text-left">l_name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-blue-100">
                    <td className="py-2 px-4">11</td>
                    <td className="py-2 px-4">Karter</td>
                    <td className="py-2 px-4">Ballard</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App