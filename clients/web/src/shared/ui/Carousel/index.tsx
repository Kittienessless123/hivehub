import { borderRadius } from "shared/lib/styled/borderRadius";
import { fullHeight, fullWidth } from "shared/lib/styled/sizes";
import styled from "styled-components";
import { useState, useEffect } from "react";

type ImageProps = {
  source: string;
  alt?: string;
};

export interface CarouselProps {
  images: ImageProps[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  infinite?: boolean;
  effect?: "scroll" | "fade";
}

const CarouselContainer = styled.div`
  ${fullWidth};
  ${fullHeight};
  position: relative;
  overflow: hidden;
  ${borderRadius.s};
`;

const SlidesContainer = styled.div<{ $currentIndex: number; $effect: string }>`
  display: flex;
  height: 100%;
  transition: ${(props) =>
    props.$effect === "scroll" ? "transform 0.3s ease" : "none"};
  transform: ${(props) =>
    props.$effect === "scroll"
      ? `translateX(-${props.$currentIndex * 100}%)`
      : "none"};
`;

const Slide = styled.div<{ $active: boolean; $effect: string }>`
  flex: 0 0 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: ${(props) =>
    props.$effect === "fade" ? (props.$active ? 1 : 0) : 1};
  transition: ${(props) =>
    props.$effect === "fade" ? "opacity 0.5s ease" : "none"};
  position: ${(props) => (props.$effect === "fade" ? "absolute" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.$active ? "white" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background: white;
  }
`;

const Counter = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  z-index: 2;
`;

export const Carousel = (props: CarouselProps) => {
  const {
    images,
    autoplay = false,
    autoplaySpeed = 3000,
    dots = true,
    infinite = true,
    effect = "scroll",
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (infinite) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
    }
  };

  useEffect(() => {
    if (!autoplay || images.length <= 1) return;

    const interval = setInterval(goToNext, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, images.length, currentIndex, goToNext]);

  if (!images?.length) {
    return null;
  }

  return (
    <CarouselContainer>
      <SlidesContainer $currentIndex={currentIndex} $effect={effect}>
        {images.map((image, index) => (
          <Slide
            key={index}
            $active={index === currentIndex}
            $effect={effect}
            style={{
              backgroundImage: `url(${image.source})`,
            }}
          />
        ))}
      </SlidesContainer>

      {dots && images.length > 1 && (
        <DotsContainer>
          {images.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotsContainer>
      )}

      <Counter>
        {currentIndex + 1} / {images.length}
      </Counter>
    </CarouselContainer>
  );
};

// <Carousel
//   images={[
//     { source: "/image1.jpg", alt: "Image 1" },
//     { source: "/image2.jpg", alt: "Image 2" },
//   ]}
//   autoplay={true}
//   autoplaySpeed={5000}
//   dots={true}
//   effect="fade"
// />
