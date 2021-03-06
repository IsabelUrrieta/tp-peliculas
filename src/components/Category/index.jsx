import React from "react";
import CardContainer from "../Card-Container";
import { useParams } from "react-router-dom";
import useTitle from "../../utils/hooks/useTitle";
import useGet from "../../utils/hooks/useGet";
import { URL_BASE } from "../../constantes/apiConfig";
import Paginado from "../Paginado";



const Category = () => {
  const createURL = () => {

    if (searchParam) {
      console.log(searchParam)
      //&with_genres=10765

      return `${URL_BASE}discover/${media}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${searchParam}`;
    }
    if (media === "multi") {
      return `${URL_BASE}search/multi?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=${category}`;
    }

    if (category === "trending") {
      return `${URL_BASE}${category}/${media}/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
    }
    return `${URL_BASE}${media}/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
  }
  const { media, category, searchParam, page } = useParams();
  const title = useTitle(media, category);
  const [data, loading] = useGet(createURL());

  if (loading) {
    return (<div class="preloader"></div>
    )
  }
  if (data) {
    return (

      <div className="category-container">
        <div className="category-components">
          <h1 className="categoryPreview-title">{searchParam ? `Genero - ${category}` : title}</h1>
          <CardContainer className="category" cards={data.results} media={media} />
          <Paginado media={media} category={category} id={data.id} page={page} searchparam={searchParam} totalPages={data.total_pages} ></Paginado>

        </div>

      </div>
    )
  }
  return null;

}





export default Category;
