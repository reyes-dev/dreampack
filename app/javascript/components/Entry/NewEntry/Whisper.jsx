import React, { useEffect, useState, useContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import { ErrorModalContext } from "../../../context/ErrorModalContext";

function Whisper({ setEntryBodyHandler }) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const [transcription, setTranscription] = useState("");
  const { setErrorExists } = useContext(ErrorModalContext);

  useEffect(() => {
    if (mediaBlobUrl === undefined) return;
    createTranscription();
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (transcription === "") return;
    setEntryBodyHandler(transcription);
  }, [transcription]);

  const buildFormData = async () => {
    const recordedAudio = await fetch(mediaBlobUrl);
    const recordedAudioBlob = await recordedAudio.blob();
    const formData = new FormData();
    const file = new File([recordedAudioBlob], "input.wav", {
      type: "audio/wav",
    });
    formData.append("audio_data", file);
    return formData;
  };

  const createTranscription = async () => {
    const formData = await buildFormData();
    const token = document.querySelector("meta[name='csrf-token']").content;
    try {
      const response = await fetch(`/api/whisper_transcriptions`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      if (data === null || data.trim() === "") {
        setErrorExists(true);
        return console.log(
          "You received an empty response, meaning something is wrong. Please check to see if you entered the correct API key.",
        );
      }
      return setTranscription(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="flex gap-4">
      <button
        onClick={startRecording}
        className={`${status === "recording" ? "hidden" : ""
          } flex h-min items-center gap-2  whitespace-nowrap rounded border border-lime-500 
                      p-[0.450rem_0.450rem_0.4625rem] text-xs italic 
                      text-lime-400 hover:bg-slate-700  lg:text-lg`}
      >
        <span className="lg:text-md hidden lg:block xl:text-lg">
          Start Recording
        </span>
        <FaMicrophone />
      </button>
      <button
        onClick={stopRecording}
        className={`${status === "recording" ? "" : "hidden"
          } flex h-min items-center gap-2 whitespace-nowrap rounded border border-red-500 p-[0.450rem_0.450rem_0.4625rem] text-xs 
                      italic text-red-400 hover:bg-slate-700 
                      lg:text-lg`}
      >
        <span className="lg:text-md hidden lg:block xl:text-lg">
          Stop Recording
        </span>
        <FaStopCircle />
      </button>
    </section>
  );
}

export default Whisper;
