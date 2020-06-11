import * as React from "react";
import {
  useUnpublishPostMutation,
  useUnpublishTranslationPostMutation,
} from "@cabezonidas/shop-admin-graphql";
import { useTranslation, useToast, Button } from "@cabezonidas/shop-ui";
import { usePost } from "./post-context";

const enUsPublish = {
  unpublish: "Undo publish",
  postUnpublished: "Post unpublished",
  postUnpublishedFail: "Failed to unpublish post",
};
const esArPublish = {
  unpublish: "Retirar",
  postUnpublished: "La entrada fue retirada",
  postUnpublishedFail: "Hubo un error al retirar la entrada",
};

export const UnpublishPostButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { language?: string }
>(({ language, ...props }, ref) => {
  const { t, i18n } = useTranslation();
  const { post } = usePost();
  i18n.addResourceBundle("en-US", "translation", { post: { unpublish: enUsPublish } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: { unpublish: esArPublish } }, true, true);
  const { notify } = useToast();
  const [unpublishEntry, { loading: unpublishingEntry }] = useUnpublishPostMutation();
  const [
    unpublishTranslation,
    { loading: unpublishingTranslation },
  ] = useUnpublishTranslationPostMutation();

  const unpublishing = unpublishingEntry || unpublishingTranslation;

  if (!post?._id) {
    return <></>;
  }

  const { _id } = post;

  const canBeUnpublished = (() => {
    if (language) {
      const translation = post.translations?.find(tr => tr.language === language);
      return !!(translation && translation.created && translation.published);
    } else {
      return !!(post.created && post.published);
    }
  })();

  if (!canBeUnpublished) {
    return <></>;
  }

  return (
    <Button
      width="max-content"
      variant="transparent"
      {...props}
      ref={ref}
      onClick={async () => {
        if (!unpublishing) {
          let success = false;
          if (!language) {
            const res = await unpublishEntry({ variables: { _id } });
            success = !!res.data?.unpublishPost;
          } else {
            const res = await unpublishTranslation({ variables: { _id, language } });
            success = !!res.data?.unpublishTranslationPost;
          }
          if (success) {
            notify(t("post.unpublish.postUnpublished"));
          } else {
            notify(t("post.unpublish.postUnpublishedFail"), { variant: "danger" });
          }
        }
      }}
    >
      {t("post.unpublish.unpublish")}
    </Button>
  );
});
