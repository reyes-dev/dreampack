import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

function Whisper({ setEntryBodyHandler }) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const [transcription, setTranscription] = useState("");

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
      setTranscription(data);
      return;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="flex gap-4">
      <button
        onClick={startRecording}
        className="text-md h-min whitespace-nowrap rounded 
                      border border-lime-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-lime-400  hover:bg-slate-700"
      >
        Start Recording
      </button>
      <button
        onClick={stopRecording}
        className="text-md h-min whitespace-nowrap rounded border border-red-500 
                      p-[0.450rem_0.450rem_0.4625rem] italic text-red-400 
                      hover:bg-slate-700"
      >
        Stop Recording
      </button>
    </section>
  );
}

export default Whisper;
