import { CoorTransition } from "../components/CoorTransition";
import '../styles/search.css';
import { routeTransitionEase } from "../helper/transitiontypes";

const Search = () => {

  
  const body = () =>{
    return(
      <div className="container-body-base"> 
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="search trans" transition={routeTransitionEase}/>
  );

};
  
export default Search;