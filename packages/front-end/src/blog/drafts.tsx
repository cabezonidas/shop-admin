import * as React from "react";
import { useGetDraftPostsQuery, useDeletePostMutation } from "@cabezonidas/shop-admin-graphql";
import { Loading, Box, H1, Anchor, useTranslation, Button, useToast } from "@cabezonidas/shop-ui";
import { NavLink as NavLinkRouter } from "react-router-dom";

const enUsDraft = {
  drafts: "Drafts",
  noTitle: "No title",
  edit: "Edit",
  delete: "Delete",
  empty: "Empty",
  draftDeleted: "Draft was deleted",
  draftDeletedFail: "Draft was deleted",
  thereAreNoDrafts: "There are no drafts",
};

const esArDraft = {
  drafts: "Borradores",
  noTitle: "Sin título",
  edit: "Editar",
  delete: "Eliminar",
  empty: "Sin contenido",
  draftDeleted: "El borrador fue eliminado",
  draftDeletedFail: "Hubo un error al eliminar el borrador",
  thereAreNoDrafts: "No hay borradores",
};

export const Drafts = () => {
  const { data, loading } = useGetDraftPostsQuery({ fetchPolicy: "cache-and-network" });
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { posts: { drafts: enUsDraft } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { posts: { drafts: esArDraft } }, true, true);

  const [deleted, setDeleted] = React.useState<string[]>([]);
  const drafts = React.useMemo(
    () => (data?.allPostDrafts ?? []).reverse().filter(d => !deleted.includes(d._id)),
    [data, deleted]
  );

  return (
    <>
      <H1 my="4">{t("posts.drafts.drafts")}</H1>
      {loading ? (
        <Loading />
      ) : (
        <Box display="grid" gridGap="4">
          {drafts.map((p, index) => (
            <Box key={p._id} display="grid" gridTemplateColumns="auto 1fr auto" gridGap="2">
              <Box>{drafts.length - index}</Box>
              <Box display="grid" gridGap="1">
                <Box fontStyle={!p.title ? "italic" : undefined}>
                  {p.title || t("posts.drafts.noTitle")}
                </Box>
                <Box>{p.description}</Box>
                <Box>{p.language}</Box>
              </Box>
              <Box>
                <Link to={`/posts/drafts/${p._id}`}>{t("posts.drafts.edit")}</Link>
                <DeleteEntry _id={p._id} onDeleted={() => setDeleted(d => [...d, p._id])} />
              </Box>
            </Box>
          ))}
          {drafts.length === 0 && t("posts.drafts.thereAreNoDrafts")}
        </Box>
      )}
    </>
  );
};

const DeleteEntry = ({ _id, onDeleted }: { _id: string; onDeleted: () => void }) => {
  const { t } = useTranslation();
  const { notify } = useToast();
  const [deleteEntry, { data: dataDeleted, loading: deleting }] = useDeletePostMutation();
  React.useEffect(() => {
    if (dataDeleted?.deletePost) {
      onDeleted();
    }
  }, [dataDeleted, onDeleted]);

  return (
    <Button
      variant="transparent"
      onClick={async () => {
        if (!deleting) {
          const { data, errors } = await deleteEntry({ variables: { _id } });
          if (data?.deletePost) {
            notify(t("posts.drafts.draftDeleted"));
          }
          if (errors) {
            notify(t("posts.drafts.draftDeletedFail"), { variant: "danger" });
          }
        }
      }}
    >
      {t("posts.drafts.delete")}
    </Button>
  );
};

const Link = Anchor.withComponent(NavLinkRouter);
