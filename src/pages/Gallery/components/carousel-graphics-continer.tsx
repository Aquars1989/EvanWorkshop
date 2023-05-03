import Style from "../index.module.css";
import CarouselGraphicsItem from "./carousel-graphics-item";
import { IExhibitData } from "pages/Gallery";

interface Props {
  exhibitList: Array<IExhibitData>;
  setExhibitList: any;
  setLightToggler: any;
  setLightSource: any;
}

export default function CarouselGraphicsContiner({
  exhibitList,
  setExhibitList,
  setLightToggler,
  setLightSource,
}: Props) {
  function compareLikes(a: IExhibitData, b: IExhibitData) {
    if (a.likes < b.likes) {
      return -1;
    }
    if (a.likes > b.likes) {
      return 1;
    }
    return 0;
  }

  let placeholders;
  if (exhibitList.length === 0) {
    placeholders = (
      <div className={"carousel-item active "}>
        <div className="w-75 p-2 m-auto ">
          <CarouselGraphicsItem
            id={0}
            url={""}
            createdTime={""}
            prompt={""}
            word1={""}
            word2={""}
            word3={""}
            likes={0}
            acterLikes={0}
            setExhibitList={undefined}
            setLightToggler={undefined}
            setLightSource={undefined}
          />
        </div>
      </div>
    );
  }

  let count = 0;
  return (
    <div
      id="carouselAutoplaying"
      className="carousel slide bg-secondary w-100 py-1"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselAutoplaying"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselAutoplaying"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselAutoplaying"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselAutoplaying"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselAutoplaying"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner pt-2 pb-3">
        {placeholders}
        {exhibitList
          .sort(compareLikes)
          .reverse()
          .slice(0, 5)
          .map((item) => {
            count++;
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
                className={"carousel-item" + (count <= 1 ? " active" : "")}
              >
                <div className="w-75 p-0 p-md-2 m-auto">
                  <CarouselGraphicsItem
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
              </div>
            );
          })}
      </div>
      <button
        className={
          "carousel-control-prev bg-secondary " + Style.carousel_control
        }
        type="button"
        data-bs-target="#carouselAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className={
          "carousel-control-next bg-secondary " + Style.carousel_control
        }
        type="button"
        data-bs-target="#carouselAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
