import { CoorTransition } from "../components/CoorTransition";
import '../styles/home.css';
import { routeTransitionEase } from "../helper/transitiontypes";
import { BaseBody } from "../components/BaseBody";

const Home = () => {

  
  const body = () =>{
    return(
      <BaseBody>
      </BaseBody>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );

};
  
export default Home;