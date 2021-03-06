import React from "react";
import { Route, Link, useRouteMatch, useParams } from "react-router-dom";
import Info from "../Info";
import Reparto from "../Reparto";
import Videos from "../Videos";
import Similares from "../Similares";
import useDetail from "../../utils/hooks/useDetail";
import Seasons from "../season/Season";

const Details = () => {

  const { path, url } = useRouteMatch();
  const { media, id } = useParams();
  const seleccionDetail = media === "movie" ? { url: "videos", title: "VIDEOS", path: <Videos media={media} id={id}  ></Videos> } : { url: "seasons/1", title: "EPISODIOS", path: <Seasons media={media} id={id}></Seasons> };
  const [data] = useDetail(media, id)

  return (
    <div className="details-hero" >{data &&
      <div className="details-container">
        <div className="details-container-bg">
          <img
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} className="detail-bg"
            alt="imagen details" />
        </div>
        <div className="nav-bar-detail">
          <Link to={`${url}/info`} className="nav-bar-detail-text">INFO</Link>
          <Link to={`${url}/cast`} className="nav-bar-detail-text">REPARTO</Link>
          <Link to={`${url}/${seleccionDetail.url}`} className="nav-bar-detail-text">{seleccionDetail.title}</Link>
          <Link to={`${url}/similares`} className="nav-bar-detail-text">SIMILARES</Link>
        </div>

        <Route path={`${path}/info`}><Info media={media} id={id}></Info></Route>
        <Route path={`${path}/cast`}><Reparto media={media} id={id}></Reparto></Route>
        <Route path={`${url}/seasons/:season`}>
          <Seasons id={id} /></Route>
        <Route path={`${url}/videos`}>
          <Videos media={media} id={id} />
        </Route>
        <Route path={`${path}/similares`}><Similares media={media} id={id}></Similares></Route>


      </div>

    }

    </div >
  );

};

export default Details;