import { Container, Typography } from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { Gallery } from "../components/Gallery";
import { Image } from "../types/image";

export const Collection: React.FC = () => {
  const { userCollection, removeArtwork } = useAppContext();
  const handleRemoveArtwork = (artwork: Image) => {
    removeArtwork(artwork.id);
  };
  return (
    <Container>
      <Typography
        variant="h1"
        textAlign={"center"}
        fontSize={26}
        fontWeight={600}
        color={"primary"}
        mt={5}
      >
        My Collection
      </Typography>
      <Gallery
        images={userCollection ? userCollection : []}
        isCollection
        handleRemoveArtwork={handleRemoveArtwork}
      />
    </Container>
  );
};
