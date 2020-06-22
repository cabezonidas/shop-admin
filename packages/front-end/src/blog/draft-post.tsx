import * as React from "react";
import {
  Box,
  H1,
  Form,
  Label,
  Input,
  Button,
  Select,
  Option,
  useTranslation,
  Loading,
  useToast,
  Alert,
  InputSelect,
  PillsBox,
} from "@cabezonidas/shop-ui";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetDraftPostQuery,
  useSavePostDraftMutation,
  SavePostDraftMutationVariables,
  SavePostMutationVariables,
  useSavePostMutation,
} from "@cabezonidas/shop-admin-graphql";
import { useDebounce } from "use-debounce";
import { Body } from "./body";

const enUs = {
  createPost: "Create post",
  titleRequired: "Title is required",
  bodyRequired: "Body is required",
  postCreated: "Post created",
  postCreatedFailed: "Failed to create post",
  language: "Language",
  title: "Title",
  tags: "Tags",
  description: "Description",
  body: "Body",
  save: "Save",
  savingDraft: "Saving draft...",
  openEditor: "Open editor",
};

const esAr = {
  createPost: "Crear post",
  titleRequired: "Título es requerido",
  bodyRequired: "Cuerpo es requerido",
  postCreated: "Entrada creada",
  postCreatedFailed: "No se pudo crear la entrada",
  language: "Lenguaje",
  title: "Título",
  tags: "Etiquetas",
  description: "Descripción",
  body: "Cuerpo",
  save: "Guardar",
  savingDraft: "Guardando borrador...",
  openEditor: "Abrir editor",
};

export const DraftPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t, i18n, languages } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { posts: { draft: enUs } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { posts: { draft: esAr } }, true, true);
  const { notify } = useToast();
  const [showEditor, setShowEditor] = React.useState(false);

  const _id = id ?? "";

  const { data, loading, error } = useGetDraftPostQuery({
    variables: { _id },
    fetchPolicy: "cache-and-network",
  });
  const [saveDraft, { loading: saving }] = useSavePostDraftMutation();
  const [createPost, { loading: creating, data: postCreated }] = useSavePostMutation();
  const [errors, setErrors] = React.useState<{ title?: string; body?: string }>({});
  const [tags, setTags] = React.useState<string[]>([]);
  const [lastTouchedTag, setLastTouchedTag] = React.useState<string>();

  const getVariables = (e: React.FormEvent<HTMLFormElement>) => ({
    _id,
    language: e.currentTarget["post-language"]?.value ?? "",
    title: e.currentTarget["post-title"]?.value ?? "",
    description: e.currentTarget["post-description"]?.value ?? "",
    body: e.currentTarget["post-body"]?.value ?? "",
  });

  const [variables, setVariables] = React.useState<
    SavePostDraftMutationVariables | SavePostMutationVariables
  >();
  const [debouncedVariables] = useDebounce(variables, 1000);

  React.useEffect(() => {
    if (debouncedVariables && !creating && !postCreated?.savePost) {
      saveDraft({ variables: debouncedVariables });
    }
  }, [debouncedVariables, saveDraft, postCreated, creating]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <Alert variant="danger">
        {error.graphQLErrors.map(e => (
          <Box key={e.message}>{e.message}</Box>
        ))}
      </Alert>
    );
  }
  if (data?.getDraft && !loading) {
    const postData = data.getDraft;
    return (
      <>
        <H1 my="4">{t("posts.draft.createPost")}</H1>
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
              setErrors(err => ({ ...err, title: t("posts.draft.titleRequired") }));
            }
            if (!vars.body) {
              hasErrors = true;
              setErrors(err => ({ ...err, body: t("posts.draft.bodyRequired") }));
            }
            if (hasErrors) {
              return;
            }
            const res = await createPost({ variables: vars });
            if (res.data?.savePost) {
              notify(t("posts.draft.postCreated"));
              history.push("/posts");
            }
            if (res.errors) {
              notify(t("posts.draft.postCreatedFailed"), { variant: "danger" });
            }
          }}
          onKeyUp={e => {
            setVariables(getVariables(e));
          }}
        >
          <Box>
            <Label htmlFor="post-language">{t("posts.draft.language")}</Label>
            <Select id="post-language" defaultValue={postData?.language ?? i18n.language}>
              {languages.map(l => (
                <Option key={l.localeId} value={l.localeId}>
                  {l.name}
                </Option>
              ))}
            </Select>
          </Box>
          <Box>
            <Label htmlFor="post-title">{t("posts.draft.title")}</Label>
            <Input id="post-title" defaultValue={postData.title ?? ""} />
            {errors.title && <Alert variant="danger">{errors.title}</Alert>}
          </Box>
          <Box>
            <Label htmlFor="post-tags">{t("posts.draft.tags")}</Label>
            <InputSelect
              id="post-tags"
              onOptionSelected={o => {
                setTags(ts => [...ts.filter(tag => tag !== o), o]);
                setLastTouchedTag(o);
              }}
            />
            {tags.length > 0 && (
              <PillsBox
                mt="2"
                tags={tags}
                selectedTag={lastTouchedTag}
                onTagSelected={tag => setLastTouchedTag(tag)}
                onTagClosed={tag => setTags(tags.filter(tg => tg !== tag))}
              />
            )}
          </Box>
          <Box>
            <Label htmlFor="post-description">{t("posts.draft.description")}</Label>
            <Input id="post-description" defaultValue={postData.description ?? ""} />
          </Box>
          <Box>
            <Box display="grid" gridTemplateColumns="1fr auto">
              <Label htmlFor="post-body">{t("posts.draft.body")}</Label>
              <Button variant="transparent" onClick={() => setShowEditor(true)} alignSelf="center">
                {t("posts.draft.openEditor")}
              </Button>
            </Box>

            <Body
              id="post-body"
              defaultValue={postData.body ?? ""}
              showEditor={showEditor}
              onClose={() => setShowEditor(false)}
            />
            {errors.body && <Alert variant="danger">{errors.body}</Alert>}
          </Box>
          <Button ml="auto" variant="primary" type="submit">
            {saving ? t("posts.draft.savingDraft") : creating ? <Loading /> : t("posts.draft.save")}
          </Button>
        </Form>
      </>
    );
  }

  return <></>;
};
