import type { ChangeEvent } from "react";

import "./index.css";

export function App() {
	const updateLink = async (ev: ChangeEvent<HTMLInputElement>) => {
		console.dir(ev)
	}

  return (
    <div className="flex flex-col items-center gap-2 p-8">
			<input type="file" onChange={updateLink} />
    </div>
  );
}

export default App;
