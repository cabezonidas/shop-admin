import * as React from "react";
import { useDeleteTranslationPostMutation } from "@cabezonidas/shop-admin-graphql";
import { useTranslation, useToast, Button, Dialog, Form, H2 } from "@cabezonidas/shop-ui";
import { usePost } from "./post-context";

const enUsDelete = {
  delete: "Delete",
  postDeleted: "Post deleted",
  postDeletedFail: "Failed to delete post",
  deleting: "Deleting...",
  confirmDelete: "Delete translation",
  confirmDeleteWarning:
    "Are you sure you want to delete permanently this translation to {{language}}?",
};
const esArDelete = {
  delete: "Eliminar",
  postDeleted: "La entrada fue eliminada",
  postDeletedFail: "Hubo un error al eliminar la entrada",
  deleting: "Eliminando...",
  confirmDelete: "Eliminar traducción",
  confirmDeleteWarning: "¿Deseas confirmar la eliminación de la traducción al {{language}}?",
};

export const DeletePostButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { language: string }
>(({ language, ...props }, ref) => {
  const { t, i18n } = useTranslation();
  const { post, nameByLocaleId } = usePost();
  i18n.addResourceBundle("en-US", "translation", { post: { delete: enUsDelete } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: { delete: esArDelete } }, true, true);
  const { notify } = useToast();
  const [deleteTranslation, { loading: deleting }] = useDeleteTranslationPostMutation();
  const [confirmDialog, setConfirmDialog] = React.useState(false);

  if (!post?._id) {
    return <></>;
  }

  const { _id } = post;

  return (
    <>
      <Button
        width="max-content"
        variant="transparent"
        {...props}
        ref={ref}
        onClick={() => setConfirmDialog(true)}
      >
        {deleting ? t("post.delete.deleting") : t("post.delete.delete")}
      </Button>
      <Dialog
        aria-label={t("post.delete.confirmDelete")}
        isOpen={confirmDialog}
        onDismiss={() => setConfirmDialog(false)}
        header={<H2>{t("post.delete.confirmDelete")}</H2>}
        footer={
          <Form
            onSubmit={async e => {
              e.preventDefault();
              if (!deleting) {
                const { data, errors } = await deleteTranslation({ variables: { _id, language } });
                if (data?.deleteTranslation) {
                  notify(t("post.delete.postDeleted"));
                  setConfirmDialog(false);
                }
                if (errors) {
                  notify(t("post.delete.postDeletedFail"), { variant: "danger" });
                }
              }
            }}
            width="max-content"
          >
            <Button variant="danger" type="submit">
              {t("post.delete.delete")}
            </Button>
          </Form>
        }
      >
        {t("post.delete.confirmDeleteWarning", { language: nameByLocaleId(language) })}
      </Dialog>
    </>
  );
});
