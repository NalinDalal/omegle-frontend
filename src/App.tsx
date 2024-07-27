import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import { Room } from "./components/Room";

const roomProps = {
  name: "Example Name",
  localAudioTrack: null, // Replace with actual MediaStreamTrack if available
  localVideoTrack: null, // Replace with actual MediaStreamTrack if available
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/room" element={<Room {...roomProps} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
