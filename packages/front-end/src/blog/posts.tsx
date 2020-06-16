import * as React from "react";
import { useGetPostsQuery, useDeletePostMutation } from "@cabezonidas/shop-admin-graphql";
import {
  Loading,
  Box,
  H1,
  useTranslation,
  useToast,
  Button,
  Dialog,
  Form,
  H2,
  Anchor,
  H3,
} from "@cabezonidas/shop-ui";
import { NavLink as NavLinkRouter } from "react-router-dom";
import { DateTime } from "luxon";

const enUsPosts = {
  posts: "Posts",
  edit: "Edit",
  delete: "Delete",
  published: "Published",
  postDeleted: "Post deleted",
  postDeletedFail: "Failed to delete post",
  confirmDelete: "Confirm delete post",
  confirmDeleteWarning:
    "You are about to delete {{title}}. By confirming, this entry will no longer be accessible including its translations.",
  not_published: "Not published",
  draft: "Draft",
  no_title: "No title",
};
const esArPosts = {
  posts: "Entradas",
  edit: "Editar",
  delete: "Eliminar",
  published: "Publicado",
  postDeleted: "La entrada fue eliminada",
  postDeletedFail: "Hubo un error al eliminar la entrada",
  confirmDelete: "Confirmar eliminar entrada",
  confirmDeleteWarning:
    "Estas a punto de eliminar {{title}}. Al confirmar, esta entrada no será más accessible, incluida sus traducciones.",
  not_published: "Sin publicar",
  draft: "Borrador",
  no_title: "Sin título",
};

export const Posts = () => {
  const { data, loading } = useGetPostsQuery({ fetchPolicy: "cache-and-network" });
  const { t, i18n, languages } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { posts: { content: enUsPosts } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { posts: { content: esArPosts } }, true, true);
  const [deleted, setDeleted] = React.useState<string[]>([]);

  const posts = React.useMemo(
    () => (data?.allPosts ?? []).reverse().filter(p => !deleted.includes(p._id)),
    [data, deleted]
  );

  const postDataState = React.useCallback(
    ({ created, published }: { created?: number | null; published?: number | null }) =>
      !created
        ? t("posts.content.draft")
        : published
        ? `${t("posts.content.published", {
            published: DateTime.fromMillis(published).toLocaleString(DateTime.DATETIME_SHORT),
            interpolation: { escapeValue: false },
          })} ${DateTime.fromMillis(published).toLocaleString(DateTime.DATETIME_SHORT)}`
        : t("posts.content.not_published"),
    [t]
  );

  return (
    <>
      <H1 my="4">{t("posts.content.posts")}</H1>
      {loading ? (
        <Loading />
      ) : (
        <Box display="grid" gridGap="6">
          {posts.map((p, index) => (
            <Box key={p._id} display="grid" gridTemplateColumns="auto 1fr auto" gridGap="2">
              <Box>{posts.length - index}</Box>
              <Box display="grid" gridGap="1">
                <H3 fontStyle={!p.title ? "italic" : undefined}>
                  <Link to={`/posts/${p._id}`}>
                    {`${p.title ?? t("posts.content.no_title")} - ${languages.find(
                      l => l.localeId === p.language
                    )?.name ?? p.language}`}
                  </Link>
                </H3>
                <Box>{p.description}</Box>
                <Box>{postDataState(p)}</Box>
                {p.translations.map((tr, i) => (
                  <React.Fragment key={i}>
                    <Box my="3" borderBottom="1px solid" width="80%" />
                    <Box fontStyle={!tr.title ? "italic" : undefined}>{`${tr.title ??
                      t("posts.content.no_title")} - ${languages.find(
                      l => l.localeId === tr.language
                    )?.name ?? tr.language}`}</Box>
                    <Box>{tr.description}</Box>
                    <Box>{postDataState(tr)}</Box>
                  </React.Fragment>
                ))}
              </Box>
              <Box>
                <Link to={`/posts/${p._id}`}>{t("posts.content.edit")}</Link>
                <DeletePost
                  _id={p._id}
                  title={p.title!}
                  onDeleted={() => setDeleted(d => [...d, p._id])}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

const DeletePost = ({
  _id,
  onDeleted,
  title,
}: {
  _id: string;
  onDeleted: () => void;
  title: string;
}) => {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [deleteEntry, { data: dataDeleted, loading: deleting }] = useDeletePostMutation();
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  React.useEffect(() => {
    if (dataDeleted?.deletePost) {
      onDeleted();
    }
  }, [dataDeleted, onDeleted]);

  return (
    <>
      <Button variant="transparent" onClick={() => setConfirmDialog(true)}>
        {t("posts.content.delete")}
      </Button>

      <Dialog
        aria-label={t("posts.content.confirmDelete")}
        isOpen={confirmDialog}
        onDismiss={() => setConfirmDialog(false)}
        header={<H2>{t("posts.content.confirmDelete")}</H2>}
        footer={
          <Form
            onSubmit={async e => {
              e.preventDefault();
              if (!deleting) {
                const { data, errors } = await deleteEntry({ variables: { _id } });
                if (data?.deletePost) {
                  notify(t("posts.content.postDeleted"));
                  setConfirmDialog(false);
                }
                if (errors) {
                  notify(t("posts.content.postDeletedFail"), { variant: "danger" });
                }
              }
            }}
            width="max-content"
          >
            <Button variant="danger" type="submit">
              {t("posts.content.delete")}
            </Button>
          </Form>
        }
      >
        {t("posts.content.confirmDeleteWarning", { title })}
      </Dialog>
    </>
  );
};

const Link = Anchor.withComponent(NavLinkRouter);
