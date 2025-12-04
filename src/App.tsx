import { useState, useMemo, type ChangeEvent } from "react";

import { convertToCSV } from "./converter";
import "./index.css";

export function App() {
  const [error, setError] = useState<string | null>(null);
  const [csv, setCSV] = useState<string | null>(null);
  const url = useMemo(() => {
    if (csv == null) {
      return null;
    }
    const file = new File([csv], "standards.csv", { type: "text/csv" });
    return URL.createObjectURL(file);
  }, [csv]);

  const updateLink = async (ev: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const text = ev.target.value;
      if (text === "") {
        setCSV(null);
        setError(null);
        return;
      }

      setCSV(convertToCSV(text));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const copy = () => {
    if (csv == null) {
      return;
    }
    navigator.clipboard.writeText(csv);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <textarea
        className="textarea"
        placeholder="Paste HTML here..."
        onChange={updateLink}
      />
      <div className="flex flex-row gap-2">
        {error != null ? (
          <div className="alert alert-error alert-vertical">
            <h3 className="font-bold">Failed to convert to CSV:</h3>
            <div>{error}</div>
          </div>
        ) : csv != null && url != null ? (
          <>
            <a href={url} role="button" className="btn">
              Download CSV
            </a>
            <button className="btn" onClick={copy}>
              Copy CSV to Clipboard
            </button>
          </>
        ) : (
          <div className="alert alert-info alert-soft">
            Please paste the HTML into the above textarea.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
