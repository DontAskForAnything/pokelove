import "./Loading.css";

export const Loading = () => (
  <div className="w-screen h-screen justify-center flex items-center">
    <div className="w-28 justify-around flex">
      <div className="line w-4 h-4 rounded-full bg-blue-400 inline-block"></div>
      <div className="line w-4 h-4 rounded-full bg-blue-400 inline-block"></div>
      <div className="line w-4 h-4 rounded-full bg-blue-400 inline-block"></div>
    </div>
  </div>
);
