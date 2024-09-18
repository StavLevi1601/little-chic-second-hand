import { useEffect, useState } from "react";
import background1 from "../../assets/images/backgrounds/background-child1.webp";
import background2 from "../../assets/images/backgrounds/background-child2.webp";
import background3 from "../../assets/images/backgrounds/background-child3.webp";
import background4 from "../../assets/images/backgrounds/background-child4.jpg";
import background5 from "../../assets/images/backgrounds/background-child5.jpg";

const backgrounds = [
  `url(${background1})`,
  `url(${background2})`,
  `url(${background3})`,
  `url(${background3})`,
  `url(${background4})`,
  `url(${background5})`,
];

export function AnimationBackgrounds() {
  const [currentBackground, setCurrentBackground] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) =>
        prevBackground === backgrounds.length - 1 ? 0 : prevBackground + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        marginTop: "20px",
        height: "651px",
        backgroundImage: backgrounds[currentBackground],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}
