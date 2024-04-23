import { usePSubscribe, useSubscribeLs } from "worterbuch-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GenericLocationBrowser() {
  const path =
    decodeURI(useLocation().pathname.substring(1)) ||
    "stagenetSolution/locations";

  const poiTypes = useSubscribeLs(`${path}/poi`);

  const panels = poiTypes.map((t) => (
    <PoiTypePanel key={t} path={path} type={t} />
  ));

  return <>{panels}</>;
}

function PoiTypePanel({ path, type }) {
  const items = useSubscribeLs(`${path}/poi/${type}`);
  const pois = items.map((i) => (
    <PoiPanel key={i} path={path} type={type} poi={i} />
  ));

  return (
    <>
      <h2>{type}</h2>
      <div>{pois}</div>
    </>
  );
}

function PoiPanel({ path, type, poi }) {
  const propsPath = `${path}/poi/${type}/${poi}/properties/`;
  const props = usePSubscribe(propsPath + "#");

  return (
    <div
      style={{ border: "1px solid black", padding: "0.5em", margin: "0.5em" }}
    >
      <h3>{poi}</h3>
      <PropsTable propsPath={propsPath} props={props} />
      <NavButton path={path} type={type} poi={poi} />
    </div>
  );
}

function NavButton({ path, type, poi }) {
  const navigate = useNavigate();
  const onClick = () => navigate(`/${path}/poi/${type}/${poi}`);

  return <button onClick={onClick}>Go to</button>;
}

function PropsTable({ propsPath, props }) {
  const rows = [];
  for (const [k, v] of props) {
    rows.push(
      <tr key={k}>
        <td>{k.replace(propsPath, "")}</td>
        <td>{JSON.stringify(v)}</td>
      </tr>
    );
  }

  return (
    <div>
      Props:
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
