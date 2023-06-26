import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Image } from "../types/image";
import { Loader } from "../components/Loader";

export const Detail: React.FC = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();

  const { user, addArtwork, isSupabaseLoading } = useAppContext();

  const { data, isLoading } = useQuery(["detail", imageId], () =>
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

  const addToCollection = async () => {
    const newArtwork: Image = {
      harvard_ref: data.id,
      image_src: data.primaryimageurl,
      title: data.title,
      year: data.dated,
      artist: findArtist(data),
    };
    await addArtwork(newArtwork);
    navigate("/collection");
  };

  if (isLoading || isSupabaseLoading) {
    return <Loader />;
  }

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
