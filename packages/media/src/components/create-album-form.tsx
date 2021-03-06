import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, Form, Label, Input, Button, useToast } from "@cabezonidas/shop-ui";
import { useCreateAlbumMutation } from "@cabezonidas/shop-admin-graphql";

export const CreateAlbumForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onCreated: (name: string) => void }
>((props, ref) => {
  const { onCreated, ...formProps } = props;
  const { t } = useTranslation();
  const [create, { error, loading }] = useCreateAlbumMutation();
  const { notify } = useToast();

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) {
          return;
        }
        const textInput = (e.currentTarget.name as unknown) as HTMLInputElement;
        const albumName = textInput.value;
        const { data: res } = await create({ variables: { albumName } });
        if (res) {
          onCreated(res.createAlbum);
          textInput.value = "";
          notify(t("media.createAlbum.createAlbumSuccess", { album: res.createAlbum }));
        }
      }}
      display="grid"
      gridGap="2"
      {...formProps}
      ref={ref}
    >
      <Box>
        <Label htmlFor="name">{t("media.createAlbum.name")}</Label>
        <Input id="name" disabled={loading} />
      </Box>
      <Box>{error && error.graphQLErrors.map((e, i) => <Box key={i}>{e.message}</Box>)}</Box>
      <Button
        style={{ cursor: loading ? "wait" : "auto" }}
        type="submit"
        variant="primary"
        ml="auto"
      >
        {t("media.createAlbum.save")}
      </Button>
    </Form>
  );
});
