import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, Button } from "@cabezonidas/shop-ui";
import { AwsPhoto, useDeletePictureMutation } from "@cabezonidas/shop-admin-graphql";
import { transform } from "../helpers";

export const Thumbnail = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> & AwsPhoto & { onDeleted: (photoUrl: string) => void }
>((props, ref) => {
  const { name, photoUrl, photoKey, onDeleted, ...boxProps } = props;
  const { t } = useTranslation();

  const [remove, { loading, error }] = useDeletePictureMutation({ variables: { photoKey } });

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      alignContent="middle"
      width="100px"
      {...boxProps}
    >
      <img
        src={transform(photoUrl, { height: "100px", width: "100px" })}
        style={{ borderRadius: 4 }}
        height="100px"
        alt={name}
      />
      <Button
        onClick={async () => {
          if (!loading) {
            const { data } = await remove();
            if (data && data.deletePicture) {
              onDeleted(photoUrl);
            }
          }
        }}
        mt="1"
        style={{ cursor: loading ? "wait" : "auto" }}
      >
        {t("media.thumbnail.delete")}
      </Button>
      {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e}</Box>)}
    </Box>
  );
});
