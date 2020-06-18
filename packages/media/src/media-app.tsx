import * as React from "react";
import {
  Box,
  useTranslation,
  ErrorBoundary,
  Label,
  Checkbox,
  Loading,
  H2,
  H1,
} from "@cabezonidas/shop-ui";
import { useAlbumsQuery } from "@cabezonidas/shop-admin-graphql";
import { AlbumImageCollection } from "./components/album-image-collection";
import { CreateAlbumForm } from "./components/create-album-form";

const enUsMedia = {
  title: "Images management",
  selectAlbum: "Select album",
  clearSelection: "Clear selection",
  album: "Album",
  noAlbums: "There are no albums to display",
  close: "close",
  createAlbum: {
    title: "Create album",
    name: "Name",
    save: "Create",
    createAlbumSuccess: "Album {{album}} created.",
  },
  thumbnail: {
    delete: "Delete",
    select: "Select",
  },
  albumCollection: {
    empty_album: "This album is empty.",
    delete_album: "Delete album",
  },
  uploadImage: {
    dropImages: "Drop images here to upload",
    label: "Upload images from device",
    submit: "Upload",
    uploading: "Uploading...",
    photoUploaded: "{{name}} uploaded successfully",
  },
};
const esArMedia = {
  title: "Administración de imágenes",
  selectAlbum: "Elegir album",
  clearSelection: "Limpiar selección",
  album: "Album",
  noAlbums: "No hay álbumes para mostrar.",
  createAlbum: {
    title: "Crear album",
    name: "Nombre",
    save: "Create",
    createAlbumSuccess: "Álbum {{album}} creado.",
  },
  thumbnail: {
    delete: "Eliminar",
    select: "Seleccionar",
  },
  albumCollection: {
    empty_album: "Este álbum está vacío.",
    delete_album: "Eliminar álbum",
  },
  uploadImage: {
    title: "Suelta imágenes aquí",
    label: "Subir imágenes manualmente",
    submit: "Subir",
    uploading: "Subiendo...",
    photoUploaded: "{{name}} se ha subido correctamente",
  },
};

export const MediaApp = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const { i18n, t } = useTranslation();
    i18n.addResourceBundle("en-US", "translation", { media: enUsMedia }, true, true);
    i18n.addResourceBundle("es-AR", "translation", { media: esArMedia }, true, true);
    return (
      <ErrorBoundary {...{ i18n, t }}>
        <App {...props} ref={ref} />
      </ErrorBoundary>
    );
  }
);

interface IMediaApp extends React.ComponentProps<typeof Box> {
  onImageSelect?: (url: string) => void;
}

const App = React.forwardRef<HTMLDivElement, IMediaApp>(({ onImageSelect, ...props }, ref) => {
  const { t } = useTranslation();
  const { data, loading } = useAlbumsQuery({ fetchPolicy: "cache-and-network" });
  const [album, setAlbum] = React.useState("");
  const [deleted, setDeleted] = React.useState<string[]>([]);
  const [created, setCreated] = React.useState<string[]>([]);

  const albums = React.useMemo(
    () =>
      [...(data?.getAlbums.filter(a => !deleted.includes(a)) ?? []), ...created].sort((a, b) =>
        a.toLocaleUpperCase().localeCompare(b.toLocaleUpperCase())
      ),
    [data, deleted, created]
  );

  return (
    <Box {...props} ref={ref}>
      <H1 mb="6">{t("media.title")}</H1>
      <Box display="grid" gridTemplateColumns="auto 1fr" overflow="hidden" gridGap="6">
        <Box overflow="hidden">
          <Box overflow="auto" display="grid" gridGap="2" height="max-content">
            {data && (
              <>
                <Box position="sticky" mb="2" borderBottom="1px solid">
                  <H2>{t("media.selectAlbum")}</H2>
                </Box>
                {albums.map(a => (
                  <Box display="grid" key={a} gridTemplateColumns="auto 1fr" gridGap="1" p="1">
                    <Checkbox
                      checked={album === a}
                      onChange={() => setAlbum(al => (a === al ? "" : a))}
                      id={a}
                    />
                    <Label
                      htmlFor={a}
                      alignSelf="center"
                      maxWidth="120px"
                      overflow="hidden"
                      title={a}
                      style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                    >
                      {a}
                    </Label>
                  </Box>
                ))}
                {albums.length === 0 && <>{t("media.noAlbums")}</>}
              </>
            )}
            {!data && loading && <Loading />}
          </Box>
        </Box>
        {!loading &&
          (album ? (
            <AlbumImageCollection
              overflow="auto"
              album={album}
              onDeleted={() => {
                setDeleted(d => [...d, album]);
                setAlbum("");
              }}
              onClose={() => setAlbum("")}
              onImageSelect={onImageSelect}
            />
          ) : (
            <Box overflow="auto">
              <Box position="sticky" mb="4" borderBottom="1px solid">
                <H2>{t("media.createAlbum.title")}</H2>
              </Box>
              <CreateAlbumForm
                px="1"
                onCreated={newAlbum => {
                  setCreated(c => [...c, newAlbum]);
                  setAlbum(newAlbum);
                }}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
});

export default MediaApp;
