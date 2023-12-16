export default function InsertModal() {
  const closeModal = () => {
    const modal = document.getElementById("myModal");
    if (!modal) return;
    modal.classList.toggle("hidden");
  };

  return (
    <div
      id="myModal"
      className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    >
      <div className="relative top-20 mx-auto p-5 border w-1/2 max-h-[80%] shadow-lg rounded-md bg-content">
        <div className="mt-3">
          <div className="mx-2">
            <h1>For Admin Use :)</h1>
            <h2>Secret Magic Word</h2>
            <input
              className="my-2 border-invertborder border-2 border-opacity-50 "
              type="text"
            />
            <h2>Document</h2>
            <textarea className="my-2 w-full h-96 border-invertborder border-2 border-opacity-50" />
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="p-2 m-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              Insert
            </button>
            <button
              className="p-2 m-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
