import style from "../index.module.css";
import { v4 } from "uuid";

interface Props {
  word: string;
  translated: string;
  mean: Array<string>;
}

export default function ScrabbleItem({ word, translated, mean }:Props) {
  let tooltip = <span>Can't find definition</span>;
  if (mean != null) {
    tooltip = (
      <div>
        {mean.map((m) => {
          return <div key={v4()}>{m}</div>;
        })}
        );
      </div>
    );
  }

  let translatedSpan = <></>;
  if (translated != null) {
    translatedSpan = <span className="mx-1">- {translated}</span>;
  }

  const heading = "heading_" + word;
  const collapse = "collapse_" + word;
  return (
    <div className="accordion-item">
      <div className="accordion-header" id={heading}>
        <button
          className="accordion-button collapsed p-1 m-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + collapse}
          aria-expanded="true"
          aria-controls={collapse}
        >
          <span>{word}</span>
          {translatedSpan}
        </button>
      </div>
      <div
        id={collapse}
        className="accordion-collapse collapse"
        aria-labelledby={heading}
        data-bs-parent="#accordionWords"
      >
        <div className={"accordion-body " + style.word_content}>
          <small>{tooltip}</small>
        </div>
      </div>
    </div>
  );
}
