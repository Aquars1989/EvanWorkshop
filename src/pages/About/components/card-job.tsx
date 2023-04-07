import Style from "../index.module.css";

interface Props {
  title: string;
  description: string;
  tag: Array<string>;
  image: string;
}

export default function CardJob({ title, description, tag, image }:Props) {
  return (
    <div className={"card w-50 shadow mx-auto " + Style.carousel_card_body}>
      <div className="row g-0 ">
        <div className="col-md-6">
          <div className="card-header">
            <h4>{title}</h4>
          </div>
          <div className="card-body overflow-auto">
            <div className="lh-base">{description}</div>
          </div>
          <div className="card-footer">
            {tag.map((item) => {
              return (
                <div key={item} className="badge bg-secondary mx-1">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-3 m-auto col-md-6">
          <img className="w-100 p-5 shadow" alt={title} src={image} />
        </div>
      </div>
    </div>
  );
}
