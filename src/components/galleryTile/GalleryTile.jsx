import React from "react";
import {
  GalleryTile as DecibelGalleryTile,
  GalleryTileImageImg,
  GalleryTileDescription,
} from "@decibel/components";
import "./galleryTile.scss";

const GalleryTile = (
  { alt, src, description, lastModified, title, onClick },
) => {
  return (
    <DecibelGalleryTile
      onClick={onClick}
      title={title}
      subTitle={lastModified}
      renderImage={<GalleryTileImageImg
        alt={alt}
        fitHorizontal={true}
        src={src}
      />}
    >
      <GalleryTileDescription>{description}</GalleryTileDescription>
    </DecibelGalleryTile>
  );
};

export default GalleryTile;