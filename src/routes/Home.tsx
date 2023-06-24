import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Image } from "../types/image";
import { Link as RouterLink } from "react-router-dom";

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
            .slice(0, 6);
        }),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      <ImageList
        sx={{
          marginTop: "10vh",
        }}
        rowHeight={300}
        cols={3}
        gap={6}
      >
        {data?.map((image: Image) => (
          <Link
            component={RouterLink}
            to={`/detail/${image.id}`}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <ImageListItem
              key={image.id}
              sx={{ maxHeight: 280, maxWidth: "100%" }}
            >
              <img src={image.image} style={{ height: 170, width: "100%" }} />
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
        ))}
      </ImageList>
    </Container>
  );
};
