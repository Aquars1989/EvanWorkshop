import OwnGraphicsItem from "./own-graphics-item";
import {IOwnListData} from "pages/Gallery";

interface Props {
  ownList:Array<IOwnListData>;
  pending:boolean;
  setOwnList:any;
  setExhibitList:any;
  setLightToggler: any;
  setLightSource: any;
}


export default function OwnGraphicsList({
  ownList,
  pending,
  setOwnList,
  setExhibitList,
  setLightToggler,
  setLightSource
}:Props) {
  var pendingDiv = null;
  if (pending) {
    pendingDiv = (
      <div className="col-sm-4 col-md-3 col-lg-2 p-2">
        <OwnGraphicsItem id={0} url={""} createdTime={""} prompt={""} exhibit={0} setOwnList={undefined} setExhibitList={undefined} setLightToggler={undefined} setLightSource={undefined} />
      </div>
    );
  }

  var exhibitExists = ownList.find((x) => x.exhibit === true);

  return (
    <div
      className={
        "bg-secondary row align-items-sm-stretch px-5 py-3 px-sm-3 gx-1 " +
        (ownList.length === 0 && !pending ? "visually-hidden" : "")
      }
    >
      {ownList.map((item) => {
        const { id, url, createdTime, prompt, exhibit } = item;
        return (
          <div key={id} className="col-sm-4 col-md-3 col-lg-2 p-2">
            <OwnGraphicsItem
              id={id}
              url={url}
              createdTime={createdTime}
              prompt={prompt}
              exhibit={exhibit ? 1 : exhibitExists ? -1 : 0}
              setOwnList={setOwnList}
              setExhibitList={setExhibitList}
              setLightToggler={setLightToggler}
              setLightSource={setLightSource}
            />
          </div>
        );
      })}
      {pendingDiv}
    </div>
  );
}
