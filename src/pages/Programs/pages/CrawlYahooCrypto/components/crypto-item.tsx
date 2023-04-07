import style from "../index.module.css";

interface Props {
  name: string;
  price: string;
  change: string;
  changeRate: string;
}

export default function CryptoItem({ name, price, change, changeRate }: Props) {
  let changeCss = "";
  if (change.startsWith("-")) {
    changeCss = style.fall;
  } else if (change.startsWith("+")) {
    changeCss = style.rise;
  }

  let changeRateCss = "";
  if (changeRate.startsWith("-")) {
    changeRateCss = style.fall;
  } else if (changeRate.startsWith("+")) {
    changeRateCss = style.rise;
  }

  return (
    <tr>
      <td>{name}</td>
      <td className="text-end">{price}</td>
      <td className={"text-end "+changeCss}>{change}</td>
      <td className={"text-end "+changeRateCss}>{changeRate}</td>
    </tr>
  );
}
