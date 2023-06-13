import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  url: string;
  width: string | number;
};

const getId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const YoutubeEmbed = ({ url, width }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }

    setHeight((ref.current.offsetWidth / 16) * 9);
  }, []);

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
