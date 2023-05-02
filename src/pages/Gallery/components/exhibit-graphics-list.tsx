import ExhibitGraphicsItem from "./exhibit-graphics-item";
import {IExhibitData} from "pages/Gallery";

interface Props {
  exhibitList:Array<IExhibitData>,
  setExhibitList:any
}

export default function ExhibitGraphicsList({ exhibitList, setExhibitList }:Props) {
  return (
    <div className="bg-secondary row align-items-sm-stretch w-100 min-vh-100 p-2 gx-1">
      {exhibitList.map((item) => {
        const {
          id,
          url,
          createdTime,
          prompt,
          word1,
          word2,
          word3,
          likes,
          acterLikes,
        } = item;
        return (
          <div
            key={id}
            className="col-sm-4 col-md-3 col-lg-2 px-5 py-3 px-sm-3 p-lg-0 m-lg-3"
          >
            <ExhibitGraphicsItem
              id={id}
              url={url}
              createdTime={createdTime}
              prompt={prompt}
              word1={word1}
              word2={word2}
              word3={word3}
              likes={likes}
              acterLikes={acterLikes}
              setExhibitList={setExhibitList}
            />
          </div>
        );
      })}
    </div>
  );
}
