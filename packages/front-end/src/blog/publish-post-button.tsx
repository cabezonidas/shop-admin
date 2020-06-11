import * as React from "react";
import {
  usePublishPostMutation,
  usePublishTranslationPostMutation,
} from "@cabezonidas/shop-admin-graphql";
import { useTranslation, useToast, Button } from "@cabezonidas/shop-ui";
import { usePost } from "./post-context";

const enUsPublish = {
  publish: "Publish now",
  postPublished: "Post published",
  postPublishedFail: "Failed to publish post",
};
const esArPublish = {
  publish: "Publicar ahora",
  postPublished: "La entrada fue publicada",
  postPublishedFail: "Hubo un error al publicar la entrada",
};

export const PublishPostButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { language?: string }
>(({ language, ...props }, ref) => {
  const { t, i18n } = useTranslation();
  const { post } = usePost();
  i18n.addResourceBundle("en-US", "translation", { post: { publish: enUsPublish } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: { publish: esArPublish } }, true, true);
  const { notify } = useToast();
  const [publishEntry, { loading: publishingEntry }] = usePublishPostMutation();
  const [
    publishTranslation,
    { loading: publishingTranslation },
  ] = usePublishTranslationPostMutation();

  const publishing = publishingEntry || publishingTranslation;

  if (!post?._id) {
    return <></>;
  }

  const { _id } = post;

  const canBePublished = (() => {
    if (language) {
      const translation = post.translations?.find(tr => tr.language === language);
      return translation && translation.created && !translation.published;
    } else {
      return post.created && !post.published;
    }
  })();

  if (!canBePublished) {
    return <></>;
  }

  return (
    <Button
      width="max-content"
      variant="transparent"
      {...props}
      ref={ref}
      onClick={async () => {
        if (!publishing) {
          let success = false;
          if (!language) {
            const res = await publishEntry({ variables: { _id } });
            success = !!res.data?.publishPost;
          } else {
            const res = await publishTranslation({ variables: { _id, language } });
            success = !!res.data?.publishTranslationPost;
          }
          if (success) {
            notify(t("post.publish.postPublished"));
          } else {
            notify(t("post.publish.postPublishedFail"), { variant: "danger" });
          }
        }
      }}
    >
      {t("post.publish.publish")}
    </Button>
  );
});
