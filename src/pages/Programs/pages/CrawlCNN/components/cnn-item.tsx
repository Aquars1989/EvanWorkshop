import { NavLink } from "react-router-dom";

interface Props {
  headline:string,
  category:string,
  url:string,
  lastPublish:string
}

export default function CNNItem({
  headline,
  category,
  url,
  lastPublish
}:Props) {

  let categoryText=<></>
  //console.log(category);
  
  if(category!==null && category!=="")
  {
    categoryText=<b>[{category}] </b>
  }
  return (
    <tr>
      <td>
        <NavLink className="nav-link" to={url}>{categoryText}{headline} - {new Date(lastPublish).toISOString().slice(0, 10)}</NavLink>
      </td>
    </tr>
  );
}
