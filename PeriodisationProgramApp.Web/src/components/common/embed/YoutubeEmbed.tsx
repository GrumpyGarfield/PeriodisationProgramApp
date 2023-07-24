import { useLayoutEffect, useRef } from "react";

type Props = {
  url: string;
  width: string | number;
  height: number;
  setHeight: (height: number) => void;
};

const getId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const YoutubeEmbed = ({ url, width, height, setHeight }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }

    setHeight((ref.current.offsetWidth / 16) * 9);
  }, [setHeight]);

  return (
    <div className="video-responsive" ref={ref}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${getId(url)}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
