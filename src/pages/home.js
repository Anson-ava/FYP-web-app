import React from "react";

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="m-4 bg-gray-400 h-96 rounded-md flex items-center">
          <div className={"grid grid-cols-1 grid-rows-2 w-full"}>
            <div className={"text-4xl text-blue-900 font-black"}>abcd</div>
            <div className={"flex justify-center"}>
              <div
                className={"p-4 bg-white rounded-lg flex items-center w-1/2"}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-4 cursor-pointer text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none text-sm flex-grow text-gray-500 w-5/6"
                  type="text"
                  placeholder="bbc"
                />
              </div>
            </div>
            <div className={""}>
              <button onClick={this.result}>hello</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
