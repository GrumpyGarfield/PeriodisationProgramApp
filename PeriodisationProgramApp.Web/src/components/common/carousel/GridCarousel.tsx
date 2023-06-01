import { PropsWithChildren } from "react";
import Carousel from "react-material-ui-carousel";

type Props = {
  totalItems: number;
} & PropsWithChildren;

export function GridCarousel({ totalItems, children }: Props) {
  return (
    <Carousel
      animation="slide"
      autoPlay={false}
      indicators={totalItems > 1}
      swipe={totalItems > 1}
      navButtonsAlwaysInvisible={totalItems < 2}
      cycleNavigation={false}
      navButtonsAlwaysVisible={totalItems > 1}
    >
      {children}
    </Carousel>
  );
}
