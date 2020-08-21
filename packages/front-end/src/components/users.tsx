import * as React from "react";
import { forwardRef } from "react";
import { Box, useTranslation, H1, Checkbox, useTheme, Tooltip } from "@cabezonidas/shop-ui";
import {
  useUsersQuery,
  useRolesQuery,
  useSetUserRoleMutation,
  UsersQuery,
  UsersDocument,
} from "@cabezonidas/shop-admin-graphql";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";

const enUsUsers = {
  users: {
    loading: "Loading users...",
    users: "Users",
    no_name: "No name saved",
  },
};
const esArUsers = {
  users: {
    loading: "Cargando usuarios...",
    users: "Usuarios",
    no_name: "Sin nombre",
  },
};

export const Users = forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>((props, ref) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsUsers }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArUsers }, true, true);

  const { mode, colors } = useTheme();

  const { data, loading } = useUsersQuery();

  const { data: rolesData } = useRolesQuery();

  const roles = rolesData?.roles ?? [];
  const editableRoles = roles.filter(r => r.id !== "admin");

  let result = <></>;

  if (loading || !data) {
    result = t("main.users.loading");
  }

  const evenBg = (i: number) =>
    i % 2 === 0 ? `${mode === "dark" ? colors.neutral.dark : colors.neutral.light}50` : undefined;

  if (data) {
    result = (
      <Table display="grid" gridTemplateColumns={`1fr auto`} maxWidth="100%" overflow="hidden">
        <Box>
          <Box>{t("main.users.users")}</Box>
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={`repeat(${editableRoles.length}, 1fr)`}
          justifyItems="center"
        >
          {editableRoles.map(({ name }, i) => (
            <Box key={i} children={name} />
          ))}
        </Box>
        {data.users.map((u, i) => (
          <React.Fragment key={u._id}>
            <Box
              bg={evenBg(i)}
              overflow="hidden"
              maxWidth="100%"
              style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              <Tooltip content={<>{u.email}</>}>
                <Box>
                  <Box fontStyle={!u.name ? "italic" : undefined}>
                    {!!u.roles?.includes("admin") && <>{"⭐ "}</>}
                    {u.name ?? t("main.users.no_name")}
                  </Box>
                  <Box>{u.email}</Box>
                </Box>
              </Tooltip>
            </Box>
            <Box
              bg={evenBg(i)}
              display={"grid"}
              gridTemplateColumns={`repeat(${editableRoles.length}, 1fr)`}
              justifyItems="center"
              alignItems="center"
            >
              {editableRoles.map(({ id, name }, key) => (
                <CheckboxRole
                  key={key}
                  {...{ roleId: id, roleName: name, userId: u._id }}
                  checked={!!u.roles?.includes(id)}
                />
              ))}
            </Box>
          </React.Fragment>
        ))}
      </Table>
    );
  }

  return (
    <Box {...props} ref={ref}>
      <H1>{t("main.users.users")}</H1>
      <Box pt="4">{result}</Box>
    </Box>
  );
});

const Table = styled(Box)(() => ({
  div: {
    padding: 4,
  },
}));

const CheckboxRole = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Checkbox> & { userId: string; roleId: string; roleName: string }
>(({ userId, roleId, roleName, ...props }, ref) => {
  const [set, { loading }] = useSetUserRoleMutation();
  return (
    <Checkbox
      aria-label={roleName}
      disabled={loading}
      ref={ref}
      {...props}
      onChange={() => {
        set({
          variables: { _id: userId, roleId, add: !props.checked },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            const usersDataCache = store.readQuery<UsersQuery>({ query: UsersDocument });
            if (usersDataCache) {
              usersDataCache.users = usersDataCache.users.map(u =>
                u._id === userId ? data.setUserRole : u
              );
              store.writeQuery<UsersQuery>({
                query: UsersDocument,
                data: usersDataCache,
              });
            }
          },
        });
      }}
    />
  );
});
