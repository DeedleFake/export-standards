import { useState, useMemo, type ChangeEvent } from "react";

import "./index.css";
import Instructions from "./Instructions";
import { convertToCSV } from "./converter";

type ErrorParams = {
  error: string;
};

function Error({ error }: ErrorParams) {
  return (
    <div className="alert alert-error">
      <div className="flex flex-col">
        <h3 className="font-bold">Failed to convert to CSV:</h3>
        <div>{error}</div>
      </div>
    </div>
  );
}

type ButtonsParams = {
  csv: string;
};

function Buttons({ csv }: ButtonsParams) {
  const url = useMemo(() => {
    const file = new File([csv], "standards.csv", { type: "text/csv" });
    return URL.createObjectURL(file);
  }, [csv]);

  const copy = () => {
    if (csv == null) {
      return;
    }
    navigator.clipboard.writeText(csv);
  };

  return (
    <>
      <a href={url} role="button" className="btn btn-primary">
        Download CSV
      </a>
      <button className="btn btn-primary" onClick={copy}>
        Copy CSV to Clipboard
      </button>
    </>
  );
}

export function App() {
  const [error, setError] = useState<string | null>(null);
  const [csv, setCSV] = useState<string | null>(null);

  const updateLink = (ev: ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Instructions />
      <textarea
        className="textarea"
        placeholder="Paste HTML here..."
        onChange={updateLink}
      />
      <div className="flex flex-row gap-2">
        {error != null ? (
          <Error error={error} />
        ) : csv != null ? (
          <Buttons csv={csv} />
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
