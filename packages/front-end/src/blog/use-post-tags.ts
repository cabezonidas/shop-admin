import * as React from "react";
import { useAllTagsLazyQuery, useAddTagMutation } from "@cabezonidas/shop-admin-graphql";

export const usePostTags = ({
  localeId,
  initialTags,
}: {
  localeId?: string | null;
  initialTags?: string[] | null;
}) => {
  const [tags, setTags] = React.useState<string[]>([]);

  const [getTags, { data }] = useAllTagsLazyQuery({ fetchPolicy: "cache-and-network" });
  React.useEffect(() => {
    if (localeId) {
      getTags({ variables: { localeId } });
    }
  }, [localeId, getTags]);

  const [addTagMutation, { data: mutationData }] = useAddTagMutation();
  const collection = mutationData?.addTag.map(t => t.tag) ?? data?.allTags.map(t => t.tag) ?? [];

  React.useEffect(() => {
    setTags(ts =>
      [...ts, ...(initialTags ?? [])].filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [initialTags]);

  const selectTag = React.useCallback(
    (selectedTag: string) => {
      setTags(ts => [...ts.filter(tag => tag !== selectedTag), selectedTag]);
      if (localeId) {
        addTagMutation({ variables: { localeId, tag: selectedTag } });
      }
    },
    [localeId, addTagMutation]
  );

  const clearTag = React.useCallback((selectedTag: string) => {
    setTags(ts => ts.filter(tag => tag !== selectedTag));
  }, []);

  const [lastTouchedTag, setLastTouchedTag] = React.useState<string>();

  return { collection, tags, selectTag, clearTag, lastTouchedTag, setLastTouchedTag };
};
