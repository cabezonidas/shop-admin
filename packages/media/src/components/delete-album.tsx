import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, Button, Label } from "@cabezonidas/shop-ui";
import { useDeleteAlbumMutation } from "@cabezonidas/shop-admin-graphql";

export const DeleteAlbum = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> & { album: string; onDeleted: () => void }
>((props, ref) => {
  const { album, onDeleted, ...boxProps } = props;
  const { t } = useTranslation();
  const [remove, { loading, error }] = useDeleteAlbumMutation({ variables: { albumName: album } });
  return (
    <Box display="flex" alignItems="center" {...boxProps} ref={ref}>
      <Box display="flex" flexDirection="column" textAlign="center">
        <Label htmlFor="delete_album">{t("media.albumCollection.warning")}</Label>
        <Button
          id="delete_album"
          onClick={async () => {
            const { data } = await remove();
            if (data && data.deleteAlbum) {
              onDeleted();
            }
          }}
          style={{ cursor: loading ? "wait" : "auto" }}
        >
          {t("media.albumCollection.delete_album")}
        </Button>
        {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e.message}</Box>)}
      </Box>
    </Box>
  );
});
