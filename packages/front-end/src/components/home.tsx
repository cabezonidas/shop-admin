import React, { ComponentProps } from "react";
import { forwardRef } from "react";
import { Box, useTranslation } from "@cabezonidas/shop-ui";

const enUsHome = {
  home: {
    welcome: "Welcome to this wonderful app!",
  },
};
const esArHome = {
  home: {
    welcome: "Hola! Gracias por visitarnos",
  },
};

export const Home = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsHome }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArHome }, true, true);

  return (
    <Box {...props} ref={ref}>
      {t("main.home.welcome")}
    </Box>
  );
});
