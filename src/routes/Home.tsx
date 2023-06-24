import { Container, ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Image } from "../types/image";

export const Home: React.FC = () => {
  const { data } = useQuery(
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
              id: record.id,
              title: record.title,
              image: record.primaryimageurl,
              year: record.yearmade,
              artist,
            };
          });
          return data
            .filter((record: Image) => record.image !== null)
            .slice(0, 5);
        }),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log("data", data);
  return (
    <Container>
      <ImageList
        sx={{
          width: "100%",
          height: "40vh",
          marginTop: "30vh",
          marginBottom: "auto",
        }}
        cols={5}
        gap={6}
      >
        {data?.map((image: Image) => (
          <ImageListItem key={image.id}>
            <img src={image.image} width="100%" height="100%" />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};
