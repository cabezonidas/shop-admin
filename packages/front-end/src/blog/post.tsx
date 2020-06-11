import * as React from "react";
import { Box, H1, Button, useTranslation, useToast, H2 } from "@cabezonidas/shop-ui";
import { useAddPostTranslationMutation } from "@cabezonidas/shop-admin-graphql";
import { usePost } from "./post-context";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { DateTime } from "luxon";
import { Translation } from "./translation";
import { PublishPostButton } from "./publish-post-button";
import { UnpublishPostButton } from "./unpublish-post-button";
import { DeletePostButton } from "./delete-post-button";
import { EditPost } from "./edit-post";

const enUs = {
  translate: "+ Add {{language}} translation",
  languages: "Languages",
  post: "Post",
  postTranslatedAddSuccess: "Translation added",
  postTranslatedAddFail: "Fail to add translation",
  draft: "Draft",
  published: "Published {{published}}",
  unpublished: "Not published",
  main: "Main",
};

const esAr = {
  translate: "+ Agregar traducción al {{language}}",
  languages: "Idiomas",
  post: "Entrada",
  postTranslatedAddSuccess: "Traducción agregada",
  postTranslatedAddFail: "Hubo un error al agregar la traducción",
  draft: "Borrador",
  published: "Publicado {{published}}",
  unpublished: "Sin publicar",
  main: "Principal",
};

export const Post: React.FC = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { posts: { post: enUs } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { posts: { post: esAr } }, true, true);
  const { post, untranslated, nameByLocaleId, setLanguage, currentLanguage } = usePost();

  const postState = React.useCallback(
    ({ created, published }: { created?: number | null; published?: number | null }) =>
      !created
        ? t("posts.post.draft")
        : published
        ? t("posts.post.published", {
            published: DateTime.fromMillis(published).toLocaleString(DateTime.DATETIME_SHORT),
            interpolation: { escapeValue: false },
          })
        : t("posts.post.unpublished"),
    [t]
  );

  if (post) {
    return (
      <Box display="grid" gridGap="3">
        <Box display="grid" gridTemplateColumns={"auto 1fr"} alignItems="flex-end">
          <H1 my="4" overflow="hidden" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {post.title ?? ""}
          </H1>
        </Box>
        <Box>
          <H2 mb="2">{t("posts.post.languages")}</H2>
          <Box display="grid" gridGap="2" gridTemplateColumns="1fr auto">
            <>
              <Box>
                <Box display="grid" gridGap="2" gridTemplateColumns="auto 1fr">
                  <Box width="max-content">
                    <LngButton
                      selected={currentLanguage === undefined || undefined}
                      onClick={() => setLanguage(undefined)}
                    >
                      {nameByLocaleId(post.language)}
                    </LngButton>
                    <Box>{postState(post)}</Box>
                    <PublishPostButton />
                    <UnpublishPostButton />
                  </Box>
                  <Box textAlign="center">{t("posts.post.main")}</Box>
                </Box>
              </Box>
              <Box>{post.author?.email ?? ""}</Box>
            </>
            {(post.translations ?? []).map((tr, i) => (
              <React.Fragment key={i}>
                <Box>
                  <LngButton
                    width="max-content"
                    onClick={() => setLanguage(tr.language ?? undefined)}
                    selected={tr.language === currentLanguage || undefined}
                  >
                    {nameByLocaleId(tr.language)}
                  </LngButton>
                  <Box>{postState(tr)}</Box>
                  <PublishPostButton language={tr.language ?? undefined} />
                  <UnpublishPostButton language={tr.language ?? undefined} />
                  {tr.language && <DeletePostButton language={tr.language} />}
                </Box>
                <Box>{tr.author?.email ?? ""}</Box>
              </React.Fragment>
            ))}
            {untranslated.map((tr, i) => (
              <Box key={i}>
                <AddTranslationButton language={tr.localeId}>
                  {t("posts.post.translate", { language: tr.name })}
                </AddTranslationButton>
              </Box>
            ))}
          </Box>
        </Box>
        <Box my="2" borderBottom="1px solid" />
        <Box mt="2">{!currentLanguage ? <EditPost /> : <Translation />}</Box>
      </Box>
    );
  }

  return <></>;
};

Post.displayName = "Post";

const LngButton = styled(Button)<{ selected?: true }>(({ selected }) => ({
  textDecoration: selected && "underline",
}));
LngButton.defaultProps = { variant: "transparent" };

const AddTranslationButton: React.FC<{ language: string }> = ({ language, children }) => {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [translateEntry, { loading: translating }] = useAddPostTranslationMutation();
  const { setLanguage, post } = usePost();

  if (post) {
    return (
      <Button
        variant="transparent"
        onClick={async () => {
          if (!translating) {
            const { data, errors } = await translateEntry({
              variables: { _id: post._id, language },
            });
            if (data?.addTranslation) {
              setLanguage(language);
              notify(t("posts.post.postTranslatedAddSuccess"));
            }
            if (errors) {
              notify(t("posts.post.postTranslatedAddFail"), { variant: "danger" });
            }
          }
        }}
      >
        {children}
      </Button>
    );
  } else {
    return <></>;
  }
};

AddTranslationButton.displayName = "AddTranslationButton";
