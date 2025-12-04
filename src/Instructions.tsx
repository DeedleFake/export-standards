import { useRef, useState, useEffect } from "react";

import numberOfResults from "./images/number-of-results.webp";
import elementInspector from "./images/element-inspector.webp";
import elementInspectorFirefox from "./images/element-inspector-firefox.webp";
import copy from "./images/copy.webp";
import copyFirefox from "./images/copy-firefox.webp";
import paste from './images/paste.webp'
import pasteDark from './images/paste-dark.webp'

const isFirefox = /firefox/i.test(navigator.userAgent);

type KeysParams = {
  keys: Array<string>;
};

function Keys({ keys }: KeysParams) {
  return keys.map((key, i) => (
    <>
      {i !== 0 ? "+" : null}
      <kbd className="kbd">{key}</kbd>
    </>
  ));
}

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(media.matches);

    const change = (ev: MediaQueryListEvent) => {
      setDarkMode(ev.matches);
    };
    media.addEventListener("change", change);
    return () => {
      media.removeEventListener("change", change);
    };
  });

	return darkMode
}

export function Instructions() {
	const darkMode = useDarkMode()

  const dialog = useRef<HTMLDialogElement>(null);
  const show = () => {
    dialog.current?.showModal();
  };
  const close = () => {
    dialog.current?.close();
  };

  return (
    <>
      <button className="btn" onClick={show}>
        Show Instructions
      </button>
      <dialog ref={dialog} className="modal">
        <div className="modal-box">
          <div>
            <p>
              First, visit the{" "}
              <a
                href="https://nsgreg.nga.mil/registries/browse/index.jsp?registryType=doc"
                className="link"
              >
                NSG Registry Browse page
              </a>
              , enter the criteria that you're looking for, and click "Browse".
            </p>
            <br />

            <p>
              On the next page, optionally increase the number of results:
              <img src={numberOfResults} />
            </p>
            <br />

            <p>
              Open your browser's developer tools, usually either by pressing{" "}
              <Keys keys={["F12"]} /> or <Keys keys={["Ctrl", "Shift", "I"]} />.
              Navigate to the element inspector tab:
              <img
                src={isFirefox ? elementInspectorFirefox : elementInspector}
              />
            </p>
            <br />

            <p>
              Right-click on the <code>&lt;html&gt;</code> entry in the list,
              open the "Copy" sub-menu, and click{" "}
              {isFirefox ? '"Outer HTML"' : '"Copy outerHTML"'}:
              <img src={isFirefox ? copyFirefox : copy} />
            </p>
            <br />

            <p>
              Close this modal and paste the copied HTML into the field on this
              page:
              <img src={darkMode ? pasteDark : paste} />
            </p>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Instructions;
