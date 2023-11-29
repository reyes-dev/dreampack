import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { FaRegPaperPlane } from "react-icons/fa";
import { SidebarEntryContext } from "context/SidebarEntryContext";

interface EditEntryProps {
  params: {
    id: string;
  };
}

function EditEntry({ params }: EditEntryProps) {
  const [entry, setEntry] = useState({ title: "", body: "", created_at: "" });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [, navigate] = useLocation();
  const { setSidebarEntriesUpdateTrigger } = useContext(SidebarEntryContext);
  // Store state data for CRUD operations
  useEffect(() => {
    getEntry();
  }, []);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
    }
  }, [entry]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    setFunction: (e: string) => void,
  ) => {
    setFunction(event.target.value);
  };

  const getEntry = async () => {
    const url = `/api/entries/${params.id}`;
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        return navigate("/entries/new");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntry(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  if (entry === undefined) {
    return <></>;
  }

  const updateEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length == 0 || body.length == 0) return;
    const url = `/api/entries/${params.id}`;
    const id = params.id;
    const body_param = { title, body, id };
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body_param),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.text();
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sidebarEntries"] });
      navigate(`/entries/${params.id}`);
    },
  });

  return (
    <form
      className="relative flex h-full w-full flex-col gap-4 border px-5 py-16"
      onSubmit={mutation.mutate}
    >
      <div className="flex justify-between gap-4">
        <label
          htmlFor="entryTitle"
          className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
        >
          Entry Title:
        </label>
        <input
          className="w-full rounded bg-[hsl(237.1,25.9%,19%)] p-2"
          name="entryTitle"
          id="entryTitle"
          data-cy="entryTitle"
          onChange={(event) => onChange(event, setTitle)}
          placeholder="Entry Title"
          value={title || ""}
        />
      </div>
      <label
        htmlFor="entryText"
        className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
      >
        Edit Your Dream Journal Entry:
      </label>
      <textarea
        className="h-full resize-none rounded bg-[hsl(237.1,25.9%,19%)] p-2 pl-5 pt-5"
        name="entryText"
        data-cy="entryText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Your entry here..."
        value={body || ""}
      />

      <button
        type="submit"
        className="min-h absolute -bottom-[1px] -right-[1px] flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
      >
        <span className="lg:block">Update entry</span>
        <FaRegPaperPlane />
      </button>
    </form>
  );
}

export default EditEntry;
