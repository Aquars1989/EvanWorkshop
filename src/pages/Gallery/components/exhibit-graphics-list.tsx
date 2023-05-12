import ExhibitGraphicsItem from "./exhibit-graphics-item";
import { IExhibitData } from "pages/Gallery";

interface Props {
  exhibitList: Array<IExhibitData>;
  setExhibitList: any;
  setLightToggler: any;
  setLightSource: any;
}

export default function ExhibitGraphicsList({
  exhibitList,
  setExhibitList,
  setLightToggler,
  setLightSource,
}: Props) {
  return (
    <div className="row px-3 py-3 px-sm-1 g-3">
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
            className="col-sm-4 col-md-3 col-lg-2"
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
              setLightToggler={setLightToggler}
              setLightSource={setLightSource}
            />
          </div>
        );
      })}
    </div>
  );
}
