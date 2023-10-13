import "../styles/error.css"
import { CoorTransition } from "../components/CoorTransition";
import { routeTransitionOpacity } from "../helper/transitiontypes";

const Error = () => {
  
  const body = () =>{
    return(
      <div className="container-body-base">
        <h1>OOOPS! THATS NOT A VALID PAGE...</h1>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="error trans" transition={routeTransitionOpacity}/>
  );
};
export default Error;