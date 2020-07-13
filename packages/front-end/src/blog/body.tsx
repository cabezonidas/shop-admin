import * as React from "react";
import { TextArea, Dialog, useTranslation, H1 } from "@cabezonidas/shop-ui";
import Sandpit from "../components/body-editor";
import useForkedRef from "../hooks/use-forked-ref";

const enUs = {
  title: "Body editor",
};

const esAr = {
  title: "Editor de cuerpo",
};

interface IBody extends React.ComponentProps<typeof TextArea> {
  showEditor?: boolean;
  onClose?: () => void;
}
export const Body = React.forwardRef<HTMLTextAreaElement, IBody>((props, forwardedRef) => {
  const { showEditor, onClose, ...textAreaProps } = props;

  const { defaultValue, value, onChange, ...noValueProps } = textAreaProps;
  const [localValue, setLocalValue] = React.useState<string>(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  React.useEffect(() => {
    if (typeof value === "string") {
      setLocalValue(value);
    }
  }, [value]);

  const localRef = React.useRef<HTMLTextAreaElement>(null);
  const ref = useForkedRef(forwardedRef, localRef);
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { postBody: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { postBody: esAr }, true, true);
  const localOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <TextArea
        ref={ref}
        value={localValue}
        onChange={localOnChange}
        minHeight={"200px !important"}
        {...noValueProps}
        maxLength={9999}
      />
      {showEditor && (
        <Dialog
          isOpen={showEditor}
          aria-label="asdf"
          onDismiss={() => onClose && onClose()}
          header={<H1>{t("postBody.title")}</H1>}
        >
          <Sandpit control={{ value: localRef.current?.value || "", onChange: localOnChange }} />
        </Dialog>
      )}
    </>
  );
});
