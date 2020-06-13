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
  Markdown,
} from "@cabezonidas/shop-ui";
import { useDebounce } from "use-debounce/lib";
import {
  SaveTranslationDraftMutationVariables,
  SaveTranslationPostMutationVariables,
  useSaveTranslationDraftMutation,
  useSaveTranslationPostMutation,
} from "@cabezonidas/shop-admin-graphql";

const enUsTrans = {
  language: "Language",
  cantChangeLanguage: "Language cannot be changed",
  title: "Title",
  description: "Description",
  body: "Body",
  save: "Save",
  savingDraft: "Saving draft...",
  creating: "Saving...",
  titleRequired: "Title is required",
  bodyRequired: "Body is required",
  postSaved: "Translation created",
  postSavedFailed: "Failed to create translation",
  warning: "Warning",
  modify: "Modify",
  save_warning: "This is a published translation. Any updates made will become public.",
  cancel: "Cancel",
};

const esArTrans = {
  language: "Idioma",
  cantChangeLanguage: "El idioma no se puede modificar",
  title: "Título",
  description: "Descripción",
  body: "Cuerpo",
  save: "Guardar",
  savingDraft: "Guardando borrador...",
  creating: "Guardando...",
  titleRequired: "Título es requerido",
  bodyRequired: "Cuerpo es requerido",
  postSaved: "Traducción creada",
  postSavedFailed: "No se pudo crear la traducción",
  warning: "Atención",
  modify: "Modificar",
  save_warning: "Esta es una traducción publicada. Todo cambio será visible públicamente.",
  cancel: "Cancelar",
};

export const Translation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { nameByLocaleId, post, currentLanguage } = usePost();
  i18n.addResourceBundle("en-US", "translation", { post: { translations: enUsTrans } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: { translations: esArTrans } }, true, true);
  const { notify } = useToast();

  const [variables, setVariables] = React.useState<
    SaveTranslationDraftMutationVariables | SaveTranslationPostMutationVariables
  >();
  const [debouncedVariables] = useDebounce(variables, 1000);
  const [saveTranslationDraft, { loading: savingDraft }] = useSaveTranslationDraftMutation();
  const [
    saveTranslationPost,
    { loading: creating, data: dataSaved },
  ] = useSaveTranslationPostMutation();
  const [errors, setErrors] = React.useState<{ title?: string; body?: string }>({});

  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (debouncedVariables && !editMode && !creating && !dataSaved?.saveTranslationPost) {
      saveTranslationDraft({ variables: debouncedVariables });
    }
  }, [debouncedVariables, saveTranslationDraft, creating, dataSaved, editMode]);

  const translation = post?.translations?.find(tr => tr.language === currentLanguage);
  if (!translation || !post) {
    return <></>;
  }

  const getVariables = (e: React.FormEvent<HTMLFormElement>) => ({
    _id: post._id,
    language: currentLanguage ?? "",
    title: e.currentTarget["post-title"]?.value ?? "",
    description: e.currentTarget["post-description"]?.value ?? "",
    body: e.currentTarget["post-body"]?.value ?? "",
  });

  const showForm = editMode || !translation.created;

  return showForm ? (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        if (creating) {
          return;
        }
        const vars = getVariables(e);
        setErrors({});
        let hasErrors = false;
        if (!vars.title) {
          hasErrors = true;
          setErrors(err => ({ ...err, title: t("post.translations.titleRequired") }));
        }
        if (!vars.body) {
          hasErrors = true;
          setErrors(err => ({ ...err, body: t("post.translations.bodyRequired") }));
        }
        if (hasErrors) {
          return;
        }
        const res = await saveTranslationPost({ variables: vars });
        if (res.data?.saveTranslationPost) {
          setEditMode(false);
          notify(t("post.translations.postSaved"));
        }
        if (res.errors) {
          notify(t("post.translations.postSavedFailed"), { variant: "danger" });
        }
      }}
      onKeyUp={e => setVariables(getVariables(e))}
    >
      {editMode && translation.published && (
        <Box>
          <H3>{t("post.translations.warning")}</H3>
          <Alert variant="warning">{t("post.translations.save_warning")}</Alert>
        </Box>
      )}
      <Box>
        <Label htmlFor="post-language">{t("post.translations.language")}</Label>
        <Input id="post-language" defaultValue={nameByLocaleId(currentLanguage)} disabled={true} />
        <Alert variant="info">{t("post.translations.cantChangeLanguage")}</Alert>
      </Box>
      <Box>
        <Label htmlFor="post-title">{t("post.translations.title")}</Label>
        <Input id="post-title" defaultValue={translation.title || post.title || ""} />
        {errors.title && <Alert variant="danger">{errors.title}</Alert>}
      </Box>
      <Box>
        <Label htmlFor="post-description">{t("post.translations.description")}</Label>
        <Input
          id="post-description"
          defaultValue={translation.description || post.description || ""}
        />
      </Box>
      <Box>
        <Label htmlFor="post-body">{t("post.translations.body")}</Label>
        <TextArea id="post-body" defaultValue={translation.body || post.body || ""} />
        {errors.body && <Alert variant="danger">{errors.body}</Alert>}
      </Box>

      <Box ml="auto" width="max-content" display="flex">
        {editMode && (
          <Button mr="2" onClick={() => setEditMode(false)}>
            {t("post.translations.cancel")}
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={savingDraft || creating}>
          {savingDraft
            ? t("post.translations.savingDraft")
            : creating
            ? t("post.translations.creating")
            : t("post.translations.save")}
        </Button>
      </Box>
    </Form>
  ) : (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <H2 mb="2">{translation.title}</H2>
        <Button variant="transparent" onClick={() => setEditMode(true)}>
          {t("post.translations.modify")}
        </Button>
      </Box>
      <Box>{translation.description ?? ""}</Box>
      <Markdown body={translation.body ?? ""} />
    </>
  );
};
