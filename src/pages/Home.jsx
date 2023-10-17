import '../styles/home.css';
import { CoorTransition } from "../components/CoorTransition";
import { routeTransitionEase } from "../helper/transitiontypes";
import AsyncImage from '../components/AsyncImage';
import poster from "../assets/cinema.jpg"

const Home = () => {
  
  const body = () =>{
    return(
      <div className="container-body-home">
          <AsyncImage className="poster" src={poster}></AsyncImage>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );

};
  
export default Home;