import { CoorTransition } from "../components/CoorTransition";
import '../styles/categories.css';
import { routeTransitionEase } from "../helper/transitiontypes";

const Categories = () => {
 
  const body = () =>{
    return(
      <div className="container-body-base"> 
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="categories trans" transition={routeTransitionEase}/>
  );

};
  
export default Categories;
