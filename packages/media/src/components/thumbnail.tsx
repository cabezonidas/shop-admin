import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, Button } from "@cabezonidas/shop-ui";
import { AwsPhoto, useDeletePictureMutation } from "@cabezonidas/shop-admin-graphql";

export const Thumbnail = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> & AwsPhoto & { onDeleted: (photoUrl: string) => void }
>((props, ref) => {
  const { name, photoUrl, photoKey, onDeleted, ...boxProps } = props;
  const { t } = useTranslation();

  const [remove, { loading, error }] = useDeletePictureMutation({ variables: { photoKey } });

  return (
    <Box {...boxProps} ref={ref} display="flex" flexDirection="column" alignContent="middle">
      <Box textAlign="center">{name}</Box>
      <img src={photoUrl} width="100px" height="100px" alt={name} />
      <Button
        onClick={async () => {
          if (!loading) {
            const { data } = await remove();
            if (data && data.deletePicture) {
              onDeleted(photoUrl);
            }
          }
        }}
        style={{ cursor: loading ? "wait" : "auto" }}
      >
        {t("media.thumbnail.delete")}
      </Button>
      {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e}</Box>)}
    </Box>
  );
});
