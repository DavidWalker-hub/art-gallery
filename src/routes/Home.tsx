import { Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Image } from "../types/image";
import { Gallery } from "../components/Gallery";
import { Loader } from "../components/Loader";
import { Search } from "@mui/icons-material";

export const Home: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data,
    isLoading,
    refetch: refetchImages,
  } = useQuery(
    "collection",
    () =>
      axios
        .get("https://api.harvardartmuseums.org/object", {
          params: {
            sort: "random",
            apikey: import.meta.env.VITE_ART_APIKEY,
            hasimage: 1,
            size: 20,
            classification: "Paintings",
            imagepermissionlevel: 0,
            keyword,
          },
        })
        .then((res) => {
          const data = res.data.records.map((record: any) => {
            let artist = "Unknown Artist";
            if (
              record.people?.length > 0 &&
              record.people?.find((person: any) => person.role === "Artist")
            ) {
              artist = record.people?.find(
                (person: any) => person.role === "Artist"
              ).name;
            }
            return {
              harvard_ref: record.id,
              title: record.title,
              image_src: record.primaryimageurl,
              year: record.dated,
              artist,
            };
          });
          return data
            .filter((record: Image) => record.image_src !== null)
            .slice(0, 6);
        }),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (keyword === "") {
      refetchImages();
    }
  }, [keyword, refetchImages]);

  return (
    <Container>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        mt={8}
        mb={-2}
      >
        <Grid item xs={8}>
          <TextField
            placeholder="Use a keyword to filter your search"
            fullWidth
            size="small"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => refetchImages()}>
            <Search />
          </Button>
        </Grid>
      </Grid>
      {isLoading ? <Loader /> : <Gallery images={data} />}
    </Container>
  );
};
