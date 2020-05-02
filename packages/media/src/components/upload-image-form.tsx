import React, { ComponentProps, forwardRef, useState } from "react";
import { Box, useTranslation, Form, Label, Input, PrimaryButton } from "@cabezonidas/shop-ui";
import { useAddPictureMutation } from "@cabezonidas/shop-admin-graphql";
import { useEffect } from "react";
import { useRef } from "react";

export const UploadImageForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { album: string; onUploaded: () => void }
>((props, ref) => {
  const { album: albumName, onUploaded, ...formProps } = props;
  const { t } = useTranslation();
  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null);
  const [upload] = useAddPictureMutation();
  const formRef = useRef(0);

  useEffect(() => {
    let alive = true;
    if (filesToUpload) {
      const uploadingKeys = Object.keys(filesToUpload);
      Promise.all(
        uploadingKeys.map(async key => {
          const file = filesToUpload.item(Number(key));
          if (file) {
            await upload({ variables: { picture: file, albumName } });
          }
        })
      ).then(() => {
        if (alive) {
          onUploaded();
          setFilesToUpload(null);
          formRef.current++;
        }
      });
    }
    return () => {
      alive = false;
    };
  }, [filesToUpload, upload, albumName, onUploaded]);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (filesToUpload) {
          return;
        }
        const fileInput = (e.currentTarget.images as unknown) as HTMLInputElement;
        setFilesToUpload(fileInput.files);
      }}
      {...formProps}
      ref={ref}
      key={formRef.current}
    >
      <Box>{t("media.uploadImage.title")}</Box>
      <Label htmlFor="images">{t("media.uploadImage.label")}</Label>
      <Input
        id="images"
        type="file"
        accept="image/png, image/jpeg"
        multiple={true}
        onChange={e => console.log(e.target.files)}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          {filesToUpload && Object.keys(filesToUpload).length
            ? t("media.uploadImage.uploading")
            : ""}
        </Box>
        <PrimaryButton style={{ cursor: filesToUpload ? "wait" : "auto" }}>
          {t("media.uploadImage.submit")}
        </PrimaryButton>
      </Box>
    </Form>
  );
});
