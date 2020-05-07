import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, Form, Label, Input, Button } from "@cabezonidas/shop-ui";
import { useCreateAlbumMutation } from "@cabezonidas/shop-admin-graphql";

export const CreateAlbumForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onCreated: (name: string) => void }
>((props, ref) => {
  const { onCreated, ...formProps } = props;
  const { t } = useTranslation();
  const [create, { data, error, loading }] = useCreateAlbumMutation();

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        if (loading) {
          return;
        }
        const textInput = (e.currentTarget.name as unknown) as HTMLInputElement;
        const albumName = textInput.value;
        const { data: res } = await create({ variables: { albumName } });
        if (res) {
          onCreated(res.createAlbum);
          textInput.value = "";
        }
      }}
      {...formProps}
      ref={ref}
    >
      <Box>{t("media.createAlbum.title")}</Box>
      <Label htmlFor="name">{t("media.createAlbum.name")}</Label>
      <Input id="name" disabled={loading} />
      <Box display="flex" justifyContent="space-between">
        <Box>
          {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e.message}</Box>)}
          {data && (
            <Box>{t("media.createAlbum.createAlbumSuccess", { album: data.createAlbum })}</Box>
          )}
        </Box>
        <Button style={{ cursor: loading ? "wait" : "auto" }} type="submit">
          {t("media.createAlbum.save")}
        </Button>
      </Box>
    </Form>
  );
});
