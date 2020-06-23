import * as React from "react";

export const usePostTags = (initialTags?: string[] | null) => {
  const [tags, setTags] = React.useState<string[]>([]);

  React.useEffect(() => {
    setTags(ts =>
      [...ts, ...(initialTags ?? [])].filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [initialTags]);

  const [lastTouchedTag, setLastTouchedTag] = React.useState<string>();

  return [tags, setTags, lastTouchedTag, setLastTouchedTag] as [
    typeof tags,
    typeof setTags,
    typeof lastTouchedTag,
    typeof setLastTouchedTag
  ];
};
