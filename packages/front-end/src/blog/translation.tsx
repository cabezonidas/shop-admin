import * as React from "react";
import { usePost } from "./post-context";
import {
  Box,
  useTranslation,
  Form,
  Label,
  Input,
  Alert,
  Button,
  useToast,
  H3,
  H2,
  Markdown,
  InputSelect,
  PillsBox,
} from "@cabezonidas/shop-ui";
import { useDebounce } from "use-debounce/lib";
import {
  SaveTranslationDraftMutationVariables,
  SaveTranslationPostMutationVariables,
  useSaveTranslationDraftMutation,
  useSaveTranslationPostMutation,
} from "@cabezonidas/shop-admin-graphql";
import { Body } from "./body";
import { usePostTags } from "./use-post-tags";

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
  openEditor: "Open editor",
  tags: "Tags",
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
  openEditor: "Abrir editor",
  tags: "Etiquetas",
};

export const Translation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { nameByLocaleId, post, currentLanguage } = usePost();
  i18n.addResourceBundle("en-US", "translation", { post: { translations: enUsTrans } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: { translations: esArTrans } }, true, true);
  const { notify } = useToast();
  const [showEditor, setShowEditor] = React.useState(false);

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

  const { tags, selectTag, clearTag, lastTouchedTag, setLastTouchedTag, collection } = usePostTags({
    initialTags: translation?.tags ?? post?.tags,
    localeId: translation?.language,
  });

  if (!translation || !post) {
    return <></>;
  }

  const getVariables = (e: React.FormEvent<HTMLFormElement>) => ({
    _id: post._id,
    language: currentLanguage ?? "",
    title: e.currentTarget["post-title"]?.value ?? "",
    description: e.currentTarget["post-description"]?.value ?? "",
    body: e.currentTarget["post-body"]?.value ?? "",
    tags,
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
        console.log({ vars });
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
        <Label htmlFor="post-tags">{t("post.translations.tags")}</Label>
        <InputSelect
          id="post-tags"
          onOptionSelected={o => {
            selectTag(o);
            setLastTouchedTag(o);
          }}
          options={collection}
        />
        {tags.length > 0 && (
          <PillsBox
            mt="2"
            tags={tags}
            selectedTag={lastTouchedTag}
            onTagSelected={tag => setLastTouchedTag(tag)}
            onTagClosed={tag => clearTag(tag)}
          />
        )}
      </Box>
      <Box>
        <Label htmlFor="post-description">{t("post.translations.description")}</Label>
        <Input
          id="post-description"
          defaultValue={translation.description || post.description || ""}
        />
      </Box>
      <Box>
        <Box display="grid" gridTemplateColumns="1fr auto">
          <Label htmlFor="post-body">{t("post.translations.body")}</Label>
          <Button variant="transparent" onClick={() => setShowEditor(true)} alignSelf="center">
            {t("post.translations.openEditor")}
          </Button>
        </Box>
        <Body
          id="post-body"
          defaultValue={translation.body || post.body || ""}
          showEditor={showEditor}
          onClose={() => setShowEditor(false)}
        />
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
      {translation.tags && <PillsBox my="1" tags={translation.tags} />}
      <Box>{translation.description ?? ""}</Box>
      <Markdown body={translation.body ?? ""} />
    </>
  );
};
