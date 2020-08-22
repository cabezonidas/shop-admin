import * as React from "react";
import { forwardRef } from "react";
import {
  Box,
  useTranslation,
  H1,
  Checkbox,
  useTheme,
  Tooltip,
  Button,
  Dialog,
  Form,
  Label,
  Input,
  Alert,
  useToast,
  Anchor,
} from "@cabezonidas/shop-ui";
import {
  useUsersQuery,
  useRolesQuery,
  useSetUserRoleMutation,
  UsersQuery,
  UsersDocument,
  useCreateUserMutation,
} from "@cabezonidas/shop-admin-graphql";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { NavLink } from "react-router-dom";

const Link = Anchor.withComponent(NavLink);

const enUsUsers = {
  users: {
    loading: "Loading users...",
    users: "Users",
    no_name: "No name saved",
    create: "Add",
    name: "Name",
    email: "Email",
    roles: "Roles",
    email_required: "Email is required",
    name_required: "Name is required",
    email_invalid: "Email is invalid",
  },
};
const esArUsers = {
  users: {
    loading: "Cargando usuarios...",
    users: "Usuarios",
    no_name: "Sin nombre",
    create: "Crear",
    name: "Nombre",
    email: "Email",
    roles: "Roles",
    email_required: "Email es obligatorio",
    name_required: "Nombre es obligatorio",
    email_invalid: "Email inválido",
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
              <Box>
                <Link fontStyle={!u.name ? "italic" : undefined} to={`/users/${u._id}`}>
                  {!!u.roles?.includes("admin") && <>{"⭐ "}</>}
                  {u.name ?? t("main.users.no_name")}
                </Link>
                <Tooltip content={<>{u.email}</>}>
                  <Link to={`/users/${u._id}`}>
                    <Box>{u.email}</Box>
                  </Link>
                </Tooltip>
              </Box>
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
      <Box display="grid" gridTemplateColumns="1fr auto" alignContent="flex-end">
        <H1>{t("main.users.users")}</H1>
        <CreateButton
          variant="primary"
          height="max-content"
          alignSelf="flex-end"
          children={t("main.users.create")}
        />
      </Box>
      <Box pt="4" overflow="auto">
        {result}
      </Box>
    </Box>
  );
});

const Table = styled(Box)(() => ({
  div: {
    padding: 4,
  },
}));

const CreateButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  (props, ref) => {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const [createModal, setCreateModal] = React.useState(false);
    const [create, { data: createData, loading }] = useCreateUserMutation();
    const { notify } = useToast();
    const { t } = useTranslation();

    const { data: rolesData, loading: loadingRoles } = useRolesQuery();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [roles, setRoles] = React.useState<string[]>([]);

    const filteredRoles = rolesData?.roles.filter(r => r.id !== "admin") ?? [];

    const hasRequiredFields = Boolean(name && email && emailRegex.test(email));

    React.useEffect(() => {
      if (createData?.createUser) {
        setCreateModal(false);
      }
    }, [createData]);

    return (
      <>
        <Dialog
          isOpen={createModal}
          onDismiss={() => setCreateModal(false)}
          aria-label={t("main.users.create")}
        >
          <Form
            onSubmit={async e => {
              e.preventDefault();
              if (!hasRequiredFields) {
                return;
              }
              const res = await create({
                variables: { input: { name, email, roles } },
                update: (store, { data }) => {
                  if (!data) {
                    return null;
                  }

                  const usersDataCache = store.readQuery<UsersQuery>({ query: UsersDocument });
                  if (usersDataCache) {
                    store.writeQuery<UsersQuery>({
                      query: UsersDocument,
                      data: { users: [data.createUser, ...usersDataCache.users] },
                    });
                  }
                },
              });
              res.errors?.forEach(err => notify(err.message, { variant: "danger" }));
            }}
          >
            <Box>
              <Label htmlFor="name" children={t("main.users.name")} />
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />

              <Alert variant={name ? "info" : "danger"} children={t("main.users.name_required")} />
            </Box>
            <Box>
              <Label htmlFor="email" children={t("main.users.email")} />
              <Input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value.trim())}
                disabled={loading}
              />
              <Alert
                variant={emailRegex.test(email) ? "info" : "danger"}
                children={
                  !email
                    ? t("main.users.email_required")
                    : emailRegex.test(email)
                    ? t("main.users.email_required")
                    : t("main.users.email_invalid")
                }
              />
            </Box>
            <Box>
              <Box children={t("main.users.roles")} />
              <Box display="grid" gridTemplateColumns={`repeat(auto-fill, minmax(120px, auto))`}>
                {filteredRoles.map(r => (
                  <Box key={r.id}>
                    <Label htmlFor={r.id} children={r.name} />
                    <Checkbox
                      id={r.id}
                      checked={roles.includes(r.id)}
                      onChange={() =>
                        setRoles(rs =>
                          rs.includes(r.id) ? rs.filter(role => role !== r.id) : [...rs, r.id]
                        )
                      }
                      disabled={loading}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <Button
              ml="auto"
              width="min-content"
              variant="primary"
              type="submit"
              disabled={loading || loadingRoles || !hasRequiredFields}
              children={t("main.users.create")}
            />
          </Form>
        </Dialog>
        <Button ref={ref} onClick={() => setCreateModal(true)} {...props} />
      </>
    );
  }
);

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
