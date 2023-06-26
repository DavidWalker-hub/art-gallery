import React from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import { Image } from "../types/image";

interface GalleryProps {
  images: Image[];
  isCollection?: boolean;
  handleRemoveArtwork?: (artwork: Image) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  isCollection = false,
  handleRemoveArtwork,
}) => {
  return (
    <ImageList
      sx={{
        marginTop: "10vh",
      }}
      rowHeight={300}
      cols={3}
      gap={6}
    >
      {images?.map((image: Image) => (
        <>
          <Link
            component={RouterLink}
            to={`/detail/${image.harvard_ref}`}
            sx={{ textDecoration: "none", color: "black" }}
            key={image.id}
          >
            <ImageListItem sx={{ maxHeight: 280, maxWidth: "100%" }}>
              {isCollection && handleRemoveArtwork && (
                <Tooltip title="Remove artwork from your collection">
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (image) {
                        handleRemoveArtwork(image);
                      }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              )}
              <img
                src={image.image_src}
                style={{ height: 170, width: "100%" }}
              />
              <ImageListItemBar
                title={image.title}
                position="below"
                subtitle={
                  <span>
                    Artist: {image.artist} | Date: {image.year}
                  </span>
                }
                sx={{ maxWidth: 350 }}
              />
            </ImageListItem>
          </Link>
        </>
      ))}
    </ImageList>
  );
};
