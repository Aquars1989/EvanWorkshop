import ScrabbleItem from "./scrabble-item";
import { v4 } from "uuid";
import { IScrabbleHelperData } from "fetch/fetch-evan-flask-api";

interface Props{
  listData : Array<IScrabbleHelperData>
}

export default function ScrabbleList({listData}:Props) {
  return (
    <div className="accordion accordion-flush" id="accordionWords">
      {listData.map((item) => {
        //console.log(item);
        const { word, translated, mean } = item;
        return (
            <ScrabbleItem
              key={v4()}
              word={word}
              translated={translated}
              mean={mean}
            />
        );
      })}
    </div>
  );
}
