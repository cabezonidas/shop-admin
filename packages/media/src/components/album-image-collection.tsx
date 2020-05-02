import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation } from "@cabezonidas/shop-ui";
import { useViewAlbumQuery, AwsPhoto } from "@cabezonidas/shop-admin-graphql";
import { useState } from "react";
import { useEffect } from "react";
import { Thumbnail } from "./thumbnail";
import { DeleteAlbum } from "./delete-album";
import { UploadImageForm } from "./upload-image-form";

export const AlbumImageCollection = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> & { album: string; onDeleted: () => void }
>((props, ref) => {
  const { album, onDeleted, ...boxProps } = props;
  const { data, error, loading, refetch } = useViewAlbumQuery({
    variables: { albumName: album },
    fetchPolicy: "cache-and-network",
  });
  const [collection, setCollection] = useState<AwsPhoto[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setCollection(data.viewAlbum);
    }
  }, [data, setCollection]);

  const result = (children: JSX.Element | null) => (
    <Box {...boxProps} ref={ref}>
      {children}
      <UploadImageForm pt={4} album={album} onUploaded={() => refetch()} />
      <DeleteAlbum justifyContent="flex-end" pt={5} album={album} onDeleted={onDeleted} />
    </Box>
  );
  if (error) {
    return result(
      <Box display="grid" gridGap={2}>
        {error.graphQLErrors.map((e, i) => (
          <Box key={i}>{e}</Box>
        ))}
      </Box>
    );
  }
  if (loading) {
    return result(t("media.loading"));
  }
  const body = (
    <>
      <Box display="grid" gridGap={2} gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))">
        {collection.map(photo => (
          <Thumbnail
            key={photo.photoUrl}
            onDeleted={deletedUrl => setCollection(c => c.filter(p => p.photoUrl !== deletedUrl))}
            {...photo}
            pt={1}
          />
        ))}
      </Box>
      {!collection.length && <Box>{t("media.albumCollection.empty_album")}</Box>}
    </>
  );

  return result(body);
});
