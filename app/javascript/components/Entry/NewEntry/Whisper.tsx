import React, { useEffect, useState, useContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import { PopupMessageContext } from "context/PopupMessageContext";

interface WhisperProps {
  setEntryBodyHandler: (transcription: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

function Whisper({ setEntryBodyHandler, setIsLoading }: WhisperProps) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/mp4" },
    });
  const [transcription, setTranscription] = useState("");
  const { setErrorExists } = useContext(PopupMessageContext);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  useEffect(() => {
    if (mediaBlobUrl === undefined) return;
    createTranscription();
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (transcription === "") return;
    setEntryBodyHandler(transcription);
  }, [transcription]);

  const buildFormData = async () => {
    const recordedAudio = await fetch(mediaBlobUrl as string);
    const recordedAudioBlob = await recordedAudio.blob();
    const formData = new FormData();
    const file = new File([recordedAudioBlob], "input.mp4", {
      type: "audio/mp4",
    });
    formData.append("audio_data", file);
    return formData;
  };

  const createTranscription = async () => {
    const formData = await buildFormData();
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      setIsLoading(true);
      const response = await fetch(`/api/whisper_transcriptions`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      setIsLoading(false);
      if (data === null || data.trim() === "") {
        setErrorExists(true);
      }
      return setTranscription(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="flex gap-4">
      <button
        type="button"
        onClick={startRecording}
        className={`${
          status === "recording" ? "hidden" : ""
        } flex h-min items-center gap-2  whitespace-nowrap rounded border border-lime-500 
                      p-[0.450rem_0.450rem_0.4625rem] italic 
                      text-lime-400 hover:bg-slate-700`}
        autoFocus
      >
        <span className="lg:block">Start Recording</span>
        <FaMicrophone />
      </button>
      <button
        type="button"
        onClick={stopRecording}
        className={`${
          status === "recording" ? "" : "hidden"
        } flex h-min items-center gap-2 whitespace-nowrap rounded border border-red-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-red-400 hover:bg-slate-700 
                      `}
      >
        <span className="lg:block">Stop Recording</span>
        <FaStopCircle />
      </button>
    </section>
  );
}

export default Whisper;
