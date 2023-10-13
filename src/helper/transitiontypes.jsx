export const routeTransitionSpring = {
    initial: {
      y: "-100vh",
    },
    final: {
      y: "0vh",
      transition: {
        type: "spring",
        mass: 0.4,
      },
    },
  };

  export const routeTransitionSpringFromRight = {
    initial: {
      x: "100vw",
    },
    final: {
      x: "0vw",
      transition: {
        type: "spring",
        mass: 0.4,
        ease: [0.5, 0.71, 1, 1.5],
      },
    },
  };

  export const routeTransitionSpringFromBottom = {
    initial: {
      y: "80vh",
    },
    final: {
      y: "0vh",
      transition: {
        type: "spring",
        mass: 0.4,
        ease: [0.5, 0.71, 1, 1.5],
      },
    },
  };

  export const routeTransitionEase = {
    initial:{ opacity: 0, scale: 0.5 },
    final: {
        opacity: 1, scale: 1.0,
        transition: {
            duration: 0.3,
            ease: [0.3, 0.51, 0.75, 1.0],
        },
    },
  };
  
  export const routeTransitionOpacity = {
    initial: {
      opacity: 0,
   },
    final: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
  

  export const routeTransitionBlackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        when: "afterChildren",
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  export const content = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 2.8 },
    },
  };
  
  export const title = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
  
  export const products = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  export const text = {
    initial: {
      y: 40,
    },
    animate: {
      y: 80,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  export const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };