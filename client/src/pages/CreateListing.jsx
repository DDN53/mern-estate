import React from "react";

export default function CreateListing() {
  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 border rounded-lg "
            id="name"
            maxLength="62"
            minLength="10"
            required
          ></input>
          <input
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg "
            required
          ></input>
          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg "
            required
          ></input>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" required></input>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" required></input>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" required></input>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" required></input>
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" required></input>
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                className="p-3 border border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              ></input>
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathroom"
                className="p-3 border border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              ></input>
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="RegularPrice"
                className="p-3 border border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              ></input>
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="RegularPrice"
                className="p-3 border border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              ></input>
              <div className="flex flex-col items-center">
                <p>Discount price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="ml-2 font-normal text-gray-600">
              The first image will be cover(max 6){" "}
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="w-full p-3 border-gray-300 rounded"
              type="file"
              id="images"
              accept="image/* "
              multiple
            />
            <button className="p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
