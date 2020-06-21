import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, Button, transform } from "@cabezonidas/shop-ui";
import { AwsPhoto, useDeletePictureMutation } from "@cabezonidas/shop-admin-graphql";

export const Thumbnail = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> &
    AwsPhoto & { onDeleted: (photoUrl: string) => void; onImageSelect?: (url: string) => void }
>((props, ref) => {
  const { name, photoUrl, photoKey, onDeleted, onImageSelect, ...boxProps } = props;
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
        style={{ cursor: loading ? "wait" : "pointer" }}
        variant="transparent"
        alignSelf="center"
      >
        {t("media.thumbnail.delete")}
      </Button>
      {onImageSelect && (
        <Button my="2" variant="default" onClick={() => onImageSelect(photoUrl)}>
          {t("media.thumbnail.select")}
        </Button>
      )}
      {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e}</Box>)}
    </Box>
  );
});
