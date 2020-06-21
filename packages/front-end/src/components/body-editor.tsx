/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useTranslation, Box, Label, TextArea, Markdown } from "@cabezonidas/shop-ui";
import { MediaUploaderButton } from "@cabezonidas/shop-admin-media";

const enUs = {
  label: "Markdown",
  preview: "Preview",
  uploadImage: "Upload image",
};

const esAr = {
  label: "Fuente",
  preview: "Vista preliminar",
  uploadImage: "Subir imagen",
};

interface ISandpit {
  control?: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
}

const filenameFromPath = (path: string) =>
  decodeURI(
    path
      .split("/")
      .reverse()[0]
      ?.split(".")
      .slice(0, -1)
      .join(".") ?? ""
  );

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
      <Box
        p="1"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gridGap="2"
        height="100%"
        overflow="hidden"
      >
        <Box display="grid" gridTemplateRows="auto 1fr">
          <Box display="grid" gridTemplateColumns="1fr auto">
            <Label htmlFor="markdown">{t("sandpit.label")}</Label>
            <MediaUploaderButton
              onImageSelected={imgUrl => {
                const url = new URL(imgUrl);
                const embedImg = `![${filenameFromPath(url.pathname)}](${imgUrl})\n`;
                const newValue = `${embedImg}${control?.value ?? ""}`;
                setValue(newValue);
                if (textRef.current) {
                  textRef.current.value = newValue;
                }
                if (control?.onChange) {
                  control.onChange({ target: { value: newValue } } as any);
                }
              }}
              alignSelf="center"
            >
              {t("sandpit.uploadImage")}
            </MediaUploaderButton>
          </Box>

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
          <Box py="1">{t("sandpit.preview")}</Box>
          <Markdown ref={previewRef} overflow="auto" body={value} />
        </Box>
      </Box>
    </Box>
  );
};

export default BodyEditor;
