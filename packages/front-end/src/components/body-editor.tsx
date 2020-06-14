/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useTranslation, Box, Label, TextArea, Markdown } from "@cabezonidas/shop-ui";

const enUs = {
  label: "Markdown",
  preview: "Preview",
};

const esAr = {
  label: "Fuente",
  preview: "Vista preliminar",
};

interface ISandpit {
  control?: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
}

export const BodyEditor: React.FC<ISandpit> = ({ control }) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { sandpit: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { sandpit: esAr }, true, true);

  const [value, setValue] = React.useState(control ? control.value : "");
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const previewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const bindScroll: any = (e: React.UIEvent<HTMLTextAreaElement>) => {
      const scrollVal = e.currentTarget.scrollTop / e.currentTarget.scrollHeight;
      if (previewRef.current) {
        previewRef.current.scrollTo({ top: scrollVal * previewRef.current.scrollHeight });
      }
    };
    const textRefCurrent = textRef.current;
    textRefCurrent?.addEventListener("scroll", bindScroll);
    return () => textRefCurrent?.addEventListener("scroll", bindScroll);
  }, [textRef, previewRef]);

  return (
    <Box p="4" height="100%" maxHeight="500px">
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="2" height="100%" overflow="hidden">
        <Box display="grid" gridTemplateRows="auto 1fr">
          <Label htmlFor="markdown">{t("sandpit.label")}</Label>
          <TextArea
            ref={textRef}
            id="markdown"
            minHeight="300px !important"
            height="100% !important"
            maxLength={9999}
            onChange={e => {
              const newValue = e.target.value;
              setValue(newValue);
              if (control?.onChange) {
                control.onChange(e);
              }
            }}
            value={value}
          />
        </Box>
        <Box display="grid" gridTemplateRows="auto 1fr" overflow="hidden">
          <Box>{t("sandpit.preview")}</Box>
          <Markdown ref={previewRef} overflow="auto" body={value} />
        </Box>
      </Box>
    </Box>
  );
};

export default BodyEditor;
