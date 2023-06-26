import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Image } from "../types/image";
import { Gallery } from "../components/Gallery";

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
  console.log("data", data);
  return (
    <Container>
      <Gallery images={data} />
    </Container>
  );
};
