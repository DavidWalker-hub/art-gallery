import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";
import { Image } from "../types/image";

export const Detail: React.FC = () => {
  const { imageId } = useParams();
  const { user, addArtwork } = useAppContext();

  const { data } = useQuery(["detail", imageId], () =>
    axios
      .get(`https://api.harvardartmuseums.org/object/${imageId}`, {
        params: { apikey: import.meta.env.VITE_ART_APIKEY },
      })
      .then((res) => res.data)
  );

  const findArtist = (imageData: any) => {
    let artist = "Unknown Artist";
    if (
      imageData.people?.length > 0 &&
      imageData.people?.find((person: any) => person.role === "Artist")
    ) {
      artist = imageData.people?.find(
        (person: any) => person.role === "Artist"
      ).name;
    }
    return artist;
  };

  const addToCollection = () => {
    const newArtwork: Image = {
      id: data.id,
      image: data.primaryimageurl,
      title: data.title,
      year: data.dated,
      artist: findArtist(data),
    };
    addArtwork(newArtwork);
  };

  return (
    <Container>
      {data && (
        <Grid container mt={3} spacing={5}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                objectFit: "contain",
                objectPosition: "center center",
              }}
            >
              <img src={data.primaryimageurl} width="100%" height="100%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack justifyContent={"space-around"} height={"100%"}>
              <Stack spacing={1}>
                <Typography variant="h1" fontSize={30} fontWeight={500}>
                  {data?.title}
                </Typography>
                <Typography variant="body1">{`Artist: ${findArtist(
                  data
                )}`}</Typography>
                <Typography variant="body1">{`Date: ${data.dated}`}</Typography>
                {data.provenance && (
                  <Typography variant="body1">{`Provenance: ${data.provenance}`}</Typography>
                )}
              </Stack>
              <Box justifyContent={"center"} display="flex">
                {user && (
                  <Button
                    sx={{
                      marginBottom: 10,
                    }}
                    variant="contained"
                    onClick={addToCollection}
                  >
                    Add to Collection
                  </Button>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
