import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  embedId: string;
  width: string | number;
};

const YoutubeEmbed = ({ embedId, width }: Props) => {
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
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
