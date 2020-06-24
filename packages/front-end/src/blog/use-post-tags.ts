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
  const collection = React.useMemo(
    () => mutationData?.addTag.map(t => t.tag) ?? data?.allTags.map(t => t.tag) ?? [],
    [mutationData, data]
  );

  React.useEffect(() => {
    setTags(ts =>
      [...ts, ...(initialTags ?? [])].filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [initialTags]);

  const selectTag = React.useCallback(
    (selectedTag: string) => {
      if (localeId && !collection.includes(selectedTag)) {
        addTagMutation({ variables: { localeId, tag: selectedTag } });
      }
      setTags(ts => [...ts.filter(tag => tag !== selectedTag), selectedTag]);
    },
    [localeId, addTagMutation, collection]
  );

  const clearTag = React.useCallback((selectedTag: string) => {
    setTags(ts => ts.filter(tag => tag !== selectedTag));
  }, []);

  const [lastTouchedTag, setLastTouchedTag] = React.useState<string>();

  return { collection, tags, selectTag, clearTag, lastTouchedTag, setLastTouchedTag };
};
