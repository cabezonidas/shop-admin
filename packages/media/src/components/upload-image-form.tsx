import * as React from "react";
import { Box, useTranslation, Form, Label, File, Button, DropArea } from "@cabezonidas/shop-ui";
import { useAddPictureMutation, AwsPhoto } from "@cabezonidas/shop-admin-graphql";

export const UploadImageForm = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof Box> & {
      album: string;
      onUploaded: (photo: AwsPhoto) => void;
      setUploading: (uploading: boolean) => void;
    }
  >((props, ref) => {
    const { album: albumName, onUploaded, setUploading, ...formProps } = props;
    const { t } = useTranslation();
    const [filesToUpload, setFilesToUpload] = React.useState<FileList | null>(null);
    const [droppedToUpload, setDroppedToUpload] = React.useState<FileList | null>(null);
    const [upload] = useAddPictureMutation();

    const validFormats = React.useMemo(() => ["png", "jpeg", "jpg"], []);

    const multiUpload = React.useCallback(
      async (fileList: FileList, alive: boolean) => {
        const uploadingKeys = Object.keys(fileList);
        return Promise.all(
          uploadingKeys.map(async key => {
            const file = fileList.item(Number(key));
            if (file && validFormats.find(f => file.name.endsWith(`.${f}`))) {
              const { data } = await upload({ variables: { picture: file, albumName } });
              if (alive && data) {
                onUploaded(data.addPicture);
              }
            }
          })
        );
      },
      [upload, albumName, onUploaded, validFormats]
    );

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      let alive = true;
      if (filesToUpload) {
        multiUpload(filesToUpload, alive).then(() => {
          if (alive) {
            setFilesToUpload(null);
          }
        });
      }
      return () => {
        alive = false;
      };
    }, [filesToUpload, multiUpload, inputRef]);

    React.useEffect(() => {
      let alive = true;
      if (droppedToUpload) {
        multiUpload(droppedToUpload, alive).then(() => {
          if (alive) {
            setDroppedToUpload(null);
          }
        });
      }
      return () => {
        alive = false;
      };
    }, [droppedToUpload, multiUpload, inputRef]);

    React.useEffect(() => {
      if (droppedToUpload || filesToUpload) {
        setUploading(true);
      }
      if (!droppedToUpload && !filesToUpload) {
        setUploading(false);
      }
    }, [droppedToUpload, filesToUpload, setUploading]);

    return (
      <Box {...formProps} ref={ref}>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" gridGap="2">
          <Box display="grid" gridTemplateRows="auto 1fr" gridGap="2">
            <Box display="flex" justifyContent="space-between">
              <Label htmlFor="dropArea">{t("media.uploadImage.dropImages")}</Label>
            </Box>
            <DropArea
              id="dropArea"
              onFilesAdded={e => setDroppedToUpload(e.dataTransfer.files)}
              width="100%"
              minHeight="100px"
              height="100%"
            />
          </Box>
          <Form
            onSubmit={e => {
              e.preventDefault();
              if (filesToUpload) {
                return;
              }
              const fileInput = (e.currentTarget.images as unknown) as HTMLInputElement;
              setFilesToUpload(fileInput.files);
            }}
            height="max-content"
          >
            <Label htmlFor="images">{t("media.uploadImage.label")}</Label>
            <File
              type="file"
              pt="1"
              id="images"
              accept={validFormats.map(f => `image/${f}`).join(", ")}
              multiple={true}
              ref={inputRef}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                style={{ cursor: filesToUpload ? "wait" : "auto" }}
                type="submit"
                variant="primary"
              >
                {t("media.uploadImage.submit")}
              </Button>
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }),
  (prevProps, nextProps) => prevProps.album === nextProps.album
);
