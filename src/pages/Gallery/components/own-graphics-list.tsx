import OwnGraphicsItem from "./own-graphics-item";
import {IOwnListData} from "pages/Gallery";

interface Props {
  ownList:Array<IOwnListData>,
  pending:boolean,
  setOwnList:any,
  setExhibitList:any,
}


export default function OwnGraphicsList({
  ownList,
  pending,
  setOwnList,
  setExhibitList
}:Props) {
  var pendingDiv = null;
  if (pending) {
    pendingDiv = (
      <div className="col-sm-4 col-md-3 col-lg-2 p-2">
        <OwnGraphicsItem id={0} url={""} createdTime={""} prompt={""} entries={0} setOwnList={undefined} setExhibitList={undefined} />
      </div>
    );
  }

  var entriesExists = ownList.find((x) => x.entries === true);

  return (
    <div
      className={
        "bg-secondary row align-items-sm-stretch p-2 gx-1 " +
        (ownList.length === 0 && !pending ? "visually-hidden" : "")
      }
    >
      {ownList.map((item) => {
        const { id, url, createdTime, prompt, entries } = item;
        return (
          <div key={id} className="col-sm-4 col-md-3 col-lg-2 p-2">
            <OwnGraphicsItem
              id={id}
              url={url}
              createdTime={createdTime}
              prompt={prompt}
              entries={entries ? 1 : entriesExists ? -1 : 0}
              setOwnList={setOwnList}
              setExhibitList={setExhibitList}
            />
          </div>
        );
      })}
      {pendingDiv}
    </div>
  );
}
