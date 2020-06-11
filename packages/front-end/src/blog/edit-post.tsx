import * as React from "react";
import { usePost } from "./post-context";
import {
  Box,
  useTranslation,
  Form,
  Label,
  Input,
  Alert,
  TextArea,
  Button,
  useToast,
  H3,
  H2,
} from "@cabezonidas/shop-ui";
import { useSavePostMutation } from "@cabezonidas/shop-admin-graphql";

const enUsEdit = {
  language: "Language",
  cantChangeLanguage: "Language cannot be changed",
  title: "Title",
  description: "Description",
  body: "Body",
  save: "Save",
  saving: "Guardando...",
  titleRequired: "Title is required",
  bodyRequired: "Body is required",
  postSaved: "Post saved",
  postSavedFailed: "Failed to save post",
  warning: "Warning",
  modify: "Modify",
  save_warning: "This is a published post. Any updates made will become public.",
  cancel: "Cancel",
};

const esArEdit = {
  language: "Idioma",
  cantChangeLanguage: "El idioma no se puede modificar",
  title: "Título",
  description: "Descripción",
  body: "Cuerpo",
  save: "Guardar",
  saving: "Guardando...",
  titleRequired: "Título es requerido",
  bodyRequired: "Cuerpo es requerido",
  postSaved: "Entrada guardada",
  postSavedFailed: "No se pudieron guardar los cambios",
  warning: "Atención",
  modify: "Modificar",
  save_warning: "Esta es una entrada publicada. Todo cambio será visible públicamente.",
  cancel: "Cancelar",
};

export const EditPost: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { nameByLocaleId, post } = usePost();
  i18n.addResourceBundle("en-US", "translation", { post: { edit: enUsEdit } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: { edit: esArEdit } }, true, true);
  const { notify } = useToast();

  const [savePost, { loading: saving, data: dataSaved }] = useSavePostMutation();
  const [errors, setErrors] = React.useState<{ title?: string; body?: string }>({});

  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (dataSaved?.savePost) {
      setEditMode(false);
    }
  }, [dataSaved]);

  if (!post) {
    return <></>;
  }

  const getVariables = (e: React.FormEvent<HTMLFormElement>) => ({
    _id: post._id,
    language: post.language ?? "",
    title: e.currentTarget["post-title"]?.value ?? "",
    description: e.currentTarget["post-description"]?.value ?? "",
    body: e.currentTarget["post-body"]?.value ?? "",
  });

  const showForm = editMode;

  return showForm ? (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        if (saving) {
          return;
        }
        const vars = getVariables(e);
        setErrors({});
        let hasErrors = false;
        if (!vars.title) {
          hasErrors = true;
          setErrors(err => ({ ...err, title: t("post.edit.titleRequired") }));
        }
        if (!vars.body) {
          hasErrors = true;
          setErrors(err => ({ ...err, body: t("post.edit.bodyRequired") }));
        }
        if (hasErrors) {
          return;
        }
        const res = await savePost({ variables: vars });
        if (res.data?.savePost) {
          notify(t("post.edit.postSaved"));
        }
        if (res.errors) {
          notify(t("post.edit.postSavedFailed"), { variant: "danger" });
        }
      }}
    >
      {post.published && (
        <Box>
          <H3>{t("post.edit.warning")}</H3>
          <Alert variant="warning">{t("post.edit.save_warning")}</Alert>
        </Box>
      )}
      <Box>
        <Label htmlFor="post-language">{t("post.edit.language")}</Label>
        <Input id="post-language" defaultValue={nameByLocaleId(post.language)} disabled={true} />
        <Alert variant="info">{t("post.edit.cantChangeLanguage")}</Alert>
      </Box>
      <Box>
        <Label htmlFor="post-title">{t("post.edit.title")}</Label>
        <Input id="post-title" defaultValue={post.title || ""} />
        {errors.title && <Alert variant="danger">{errors.title}</Alert>}
      </Box>
      <Box>
        <Label htmlFor="post-description">{t("post.edit.description")}</Label>
        <Input id="post-description" defaultValue={post.description || ""} />
      </Box>
      <Box>
        <Label htmlFor="post-body">{t("post.edit.body")}</Label>
        <TextArea id="post-body" defaultValue={post.body || ""} />
        {errors.body && <Alert variant="danger">{errors.body}</Alert>}
      </Box>

      <Box ml="auto" width="max-content" display="flex">
        {editMode && (
          <Button mr="2" onClick={() => setEditMode(false)}>
            {t("post.edit.cancel")}
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? t("post.edit.saving") : t("post.edit.save")}
        </Button>
      </Box>
    </Form>
  ) : (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <H2 mb="2">{post.title ?? ""}</H2>
        <Button variant="transparent" onClick={() => setEditMode(true)}>
          {t("post.edit.modify")}
        </Button>
      </Box>
      <Box>{post.description ?? ""}</Box>
      <Box>{post.body ?? ""}</Box>
    </>
  );
};
