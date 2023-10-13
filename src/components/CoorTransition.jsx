import { motion} from "framer-motion";
export const CoorTransition = ({page,name,transition}) =>{
    return(
        <motion.div 
            variants={transition}
            initial="initial"
            animate="final"
            className={name}> 
            {page()}
        </motion.div>
    )
}