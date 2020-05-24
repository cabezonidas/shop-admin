import * as React from "react";
import {
  Box,
  useTranslation,
  Loading,
  Alert,
  H2,
  Close,
  Button,
  useToast,
} from "@cabezonidas/shop-ui";
import { useViewAlbumQuery, AwsPhoto } from "@cabezonidas/shop-admin-graphql";
import { Thumbnail } from "./thumbnail";
import { DeleteAlbum } from "./delete-album";
import { UploadImageForm } from "./upload-image-form";

export const AlbumImageCollection = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Box> & { album: string; onDeleted: () => void; onClose: () => void }
>((props, ref) => {
  const { album, onDeleted, onClose, ...boxProps } = props;
  const { data, error, loading } = useViewAlbumQuery({
    variables: { albumName: album },
    fetchPolicy: "cache-and-network",
  });

  const [deleted, setDeleted] = React.useState<string[]>([]);
  const [created, setCreated] = React.useState<AwsPhoto[]>([]);
  const { notify } = useToast();

  const photos = React.useMemo(
    () =>
      [
        ...(data?.viewAlbum ?? []).filter(a => !created.find(c => c.name === a.name)),
        ...created,
      ].filter(ph => !deleted.includes(ph.photoUrl)),
    [data, deleted, created]
  );

  React.useEffect(() => {
    setDeleted([]);
    setCreated([]);
  }, [album]);

  const { t } = useTranslation();

  const [uploading, setUploading] = React.useState(false);

  const res = (children: React.ReactNode) => (
    <Box {...boxProps} ref={ref}>
      <Box
        position="sticky"
        mb="4"
        borderBottom="1px solid"
        display="grid"
        gridTemplateColumns="1fr auto"
      >
        <H2>{album}</H2>
        <Button
          variant="transparent"
          onClick={() => onClose()}
          aria-label={t("media.close")}
          gridGap="2"
        >
          <Close width="10" height="10" {...({} as any)} />
        </Button>
      </Box>
      {children}
    </Box>
  );

  if (loading) {
    return res(<Loading />);
  }
  if (error) {
    return res(
      <Box display="grid" gridGap={2}>
        {error.graphQLErrors.map((e, i) => (
          <Box key={i}>{e}</Box>
        ))}
      </Box>
    );
  }

  let body = <></>;
  if (data) {
    body = (
      <>
        {data && data.viewAlbum.length === 0 && (
          <Alert my="4" variant="info">
            {t("media.albumCollection.empty_album")}
          </Alert>
        )}
        <UploadImageForm
          album={album}
          onUploaded={pu => {
            setCreated(u => [...u, pu]);
            notify(t("media.uploadImage.photoUploaded", { name: pu.name }));
          }}
          setUploading={setUploading}
        />
        <Box display="grid" gridTemplateRows="1fr auto" gridGap="5" mt="4">
          <Box
            display="grid"
            gridGap={2}
            gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
          >
            {photos.map((photo, index) => (
              <Thumbnail
                key={index}
                onDeleted={p => setDeleted(ds => [...ds, p])}
                {...photo}
                pt={1}
              />
            ))}
            {uploading && (
              <Box alignSelf="center" mx="auto">
                {t("media.uploadImage.uploading")}
              </Box>
            )}
          </Box>
          <DeleteAlbum justifyContent="center" album={album} onDeleted={onDeleted} />
        </Box>
      </>
    );
  }
  return res(body);
});
