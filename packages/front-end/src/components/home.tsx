import React, { ComponentProps } from "react";
import { forwardRef } from "react";
import { Box, useTranslation, Label, Select, Option } from "@cabezonidas/shop-ui";

const enUsHome = {
  home: {
    welcome: "Welcome to this wonderful app!",
    choose_language: "Choose your language",
    language: "Language",
  },
};
const esArHome = {
  home: {
    welcome: "Hola! Gracias por visitarnos",
    choose_language: "Elige tu idioma",
    language: "Idioma",
  },
};

export const Home = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t, i18n, languages } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsHome }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArHome }, true, true);

  return (
    <Box {...props} ref={ref}>
      {t("main.home.welcome")}
      <Box pt={3}>
        <Label htmlFor="language">{t("main.home.language")}</Label>
        <Select
          id="language"
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
        >
          {languages.map(l => (
            <Option key={l.localeId} value={l.localeId}>
              {l.name}
            </Option>
          ))}
        </Select>
      </Box>
    </Box>
  );
});
