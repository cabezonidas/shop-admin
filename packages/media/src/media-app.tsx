import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, ErrorBoundary, Select, Option, Label } from "@cabezonidas/shop-ui";
import { useAlbumsQuery } from "@cabezonidas/shop-admin-graphql";
import { useState } from "react";
import { useEffect } from "react";
import { AlbumImageCollection } from "./components/album-image-collection";
import { CreateAlbumForm } from "./components/create-album-form";

const enUsMedia = {
  welcome: "You're browsing the media app",
  selectAlbum: "Select album",
  clearSelection: "Clear selection",
  album: "Album",
  loading: "Loading",
  createAlbum: {
    title: "Create album",
    name: "Name",
    save: "Save",
    createAlbumSuccess: "Album {{album}} created.",
  },
  thumbnail: {
    delete: "Delete",
  },
  albumCollection: {
    empty_album: "This album is empty.",
    warning: "Warning",
    delete_album: "Delete album",
  },
  uploadImage: {
    title: "Upload an image to this album",
    label: "Image",
    submit: "Upload",
    uploading: "Uploading...",
  },
};
const esArMedia = {
  welcome: "Estás navegando la aplicación de multimedios",
  selectAlbum: "Elegir album",
  clearSelection: "Limpiar selección",
  album: "Album",
  loading: "Cargando",
  createAlbum: {
    title: "Crear album",
    name: "Nombre",
    save: "Guardar",
    createAlbumSuccess: "Álbum {{album}} creado.",
  },
  thumbnail: {
    delete: "Eliminar",
  },
  albumCollection: {
    empty_album: "Este álbum está vacío.",
    warning: "Cuidado",
    delete_album: "Eliminar álbum",
  },
  uploadImage: {
    title: "Sube una imagen al álbum",
    label: "Imagen",
    submit: "Subir",
    uploading: "Subiendo...",
  },
};

export const MediaApp = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { i18n, t } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { media: enUsMedia }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { media: esArMedia }, true, true);
  return (
    <ErrorBoundary {...{ i18n, t }}>
      <App {...props} ref={ref} />
    </ErrorBoundary>
  );
});

const App = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t } = useTranslation();
  const { data } = useAlbumsQuery({ fetchPolicy: "cache-and-network" });
  const [albumCollection, setAlbumCollection] = useState<string[]>([]);
  const [album, setAlbum] = useState("");

  useEffect(() => {
    if (data) {
      setAlbumCollection(data.getAlbums);
    }
  }, [data, setAlbumCollection]);

  return (
    <Box {...props} ref={ref}>
      {t("media.welcome")}
      <CreateAlbumForm
        onCreated={newAlbum => {
          setAlbumCollection(ac => [...ac, newAlbum]);
          setAlbum(newAlbum);
        }}
        pt={3}
      />
      <Box pt={3}>
        <Label>{t("media.album")}</Label>
        <Select id="album" value={album} onChange={e => setAlbum(e.target.value)}>
          <Option value="" disabled={!album}>
            {album ? t("media.clearSelection") : t("media.selectAlbum")}
          </Option>
          {albumCollection.map(o => (
            <Option key={o} value={o}>
              {o}
            </Option>
          ))}
        </Select>
      </Box>
      {album && (
        <AlbumImageCollection
          album={album}
          pt={3}
          onDeleted={() => {
            setAlbumCollection(ac => ac.filter(a => a !== album));
            setAlbum("");
          }}
        />
      )}
    </Box>
  );
});

export default MediaApp;
