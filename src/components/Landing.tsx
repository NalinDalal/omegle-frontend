import { useEffect, useState, useRef } from "react";
import { Room } from "./Room";

export const Landing = () => {
  const [name, setName] = useState("");

  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [joined, setJoined] = useState(false);
  const getCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // MediaStream
    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];
    console.log("videoTrack", videoTrack);
    console.log("audioTrack", audioTrack);
    setlocalVideoTrack(videoTrack);
    setLocalAudioTrack(audioTrack);
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = new MediaStream([videoTrack, audioTrack]);
    videoRef.current.play();
    // MediaStream
  };

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  if (!joined) {
    return (
      <div>
        <video autoPlay ref={videoRef}></video>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            setJoined(true);
          }}
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  );
};
