import * as React from "react";
import {
  Box,
  useTranslation,
  Button,
  Form,
  Label,
  Input,
  ProfileCard,
  DateStandard,
  H2,
  useToast,
  Dialog,
  H1,
} from "@cabezonidas/shop-ui";
import {
  useLogoutMutation,
  useGraphqlClient,
  MeQuery,
  useUpdateProfileMutation,
} from "@cabezonidas/shop-admin-graphql";
import { MediaUploaderButton } from "@cabezonidas/shop-admin-media";
import { DateTime } from "luxon";

const enUsProfile = {
  profile: {
    choose_language: "Choose your language",
    language: "Language",
    loggedInAs: "Logged in as {{email}}",
    logout: "Logout",
    details: "Details",
    imageUrl: "Image URL",
    name: "Name",
    dob: "Date of birth",
    github: "Github",
    twitter: "Twitter",
    linkedin: "Linkedin",
    whatsapp: "Whatsapp",
    instagram: "Instagram",
    facebook: "Facebook",
    messenger: "Messenger",
    email: "Email",
    description: "Description - {{language}}",
    preview: "Preview",
    save: "Save",
    profileSaved: "Profile saved",
    profileSavedFailed: "Failed to save profile",
    imageUpload: "Upload",
    imageClear: "Clear",
    noRolesWarning: "No roles",
    noRolesDialog:
      "The administration team hasn't assigned you any roles yet. In the meantime, you can update your profile.",
  },
};
const esArProfile = {
  profile: {
    choose_language: "Elige tu idioma",
    language: "Idioma",
    loggedInAs: "Conectado como {{email}}",
    logout: "Salir",
    details: "Detalles",
    imageUrl: "URL de imagen",
    name: "Nombre",
    dob: "Fecha de nacimiento",
    github: "Github",
    twitter: "Twitter",
    linkedin: "Linkedin",
    whatsapp: "Whatsapp",
    instagram: "Instagram",
    facebook: "Facebook",
    messenger: "Messenger",
    email: "Email",
    description: "Descripción - {{language}}",
    preview: "Vista previa",
    save: "Guardar",
    profileSaved: "Perfil guardado",
    profileSavedFailed: "Hubo un error al guardar el perfil",
    imageUpload: "Subir",
    imageClear: "Limpiar",
    noRolesWarning: "Sin roles",
    noRolesDialog:
      "Los administradores aún no te han asignado un rol. Mientras tanto, puedes actualizar tu perfil.",
  },
};

interface IProfile extends React.ComponentProps<typeof Box> {
  meQuery: MeQuery;
}

interface IAuthorProfile {
  _id: string;
  name?: string | null;
  dob?: number | null;
  email?: string | null;
  imageUrl?: string | null;
  linkedin?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  messenger?: string | null;
  github?: string | null;
  twitter?: string | null;
  roles?: string[] | null;
  description?: Array<{ localeId: string; text: string }> | null;
}

interface IProfileForm extends React.ComponentProps<typeof Box> {
  profile: IAuthorProfile;
}

const ProfileForm: React.FC<IProfileForm> = props => {
  const { profile, ...formProps } = props;
  const { t, languages } = useTranslation();

  const [name, setname] = React.useState(profile.name ?? "");
  const [dob, setdob] = React.useState(profile.dob ? DateTime.fromMillis(profile.dob) : undefined);
  const [email, setemail] = React.useState(profile.email ?? "");
  const [imageUrl, setimageUrl] = React.useState(profile.imageUrl ?? "");
  const [linkedin, setlinkedin] = React.useState(profile.linkedin ?? "");
  const [whatsapp, setwhatsapp] = React.useState(profile.whatsapp ?? "");
  const [instagram, setinstagram] = React.useState(profile.instagram ?? "");
  const [facebook, setfacebook] = React.useState(profile.facebook ?? "");
  const [messenger, setmessenger] = React.useState(profile.messenger ?? "");
  const [github, setgithub] = React.useState(profile.github ?? "");
  const [twitter, settwitter] = React.useState(profile.twitter ?? "");
  const [description, setdescription] = React.useState(
    profile.description?.map(({ localeId, text }) => ({ localeId, text })) ?? []
  );

  const author = React.useMemo(
    () => ({
      _id: profile._id,
      name,
      dob: dob?.toMillis(),
      email,
      imageUrl,
      linkedin,
      whatsapp,
      instagram,
      facebook,
      messenger,
      github,
      twitter,
      description,
    }),
    [
      profile._id,
      name,
      dob,
      email,
      imageUrl,
      linkedin,
      whatsapp,
      instagram,
      facebook,
      messenger,
      github,
      twitter,
      description,
    ]
  );

  const { email: unusedEmail, ...input } = author;

  const [update, { loading }] = useUpdateProfileMutation({ variables: { input } });
  const { notify } = useToast();
  const onSubmit = async () => {
    if (!loading) {
      const res = await update();
      if (res.data?.updateProfile) {
        notify(t("login.profile.profileSaved"));
      }
      if (res.errors) {
        notify(t("login.profile.profileSavedFailed"), { variant: "danger" });
      }
    }
  };

  const [showNoRolesWarning, setShowNoRolesWarning] = React.useState(!profile.roles?.length);

  return (
    <>
      {showNoRolesWarning && (
        <Dialog
          isOpen={true}
          onDismiss={() => setShowNoRolesWarning(false)}
          aria-label={t("login.profile.noRolesWarning")}
          header={<H1>{t("login.profile.noRolesWarning")}</H1>}
        >
          {t("login.profile.noRolesDialog")}
        </Dialog>
      )}
      <Box gridGap="4" {...formProps}>
        <H2>{t("login.profile.details")}</H2>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
          width="100%"
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
            gridGap="2"
          >
            <Box>
              <Box display="grid" gridTemplateColumns="1fr auto">
                <Label htmlFor="imageUrl">{t("login.profile.imageUrl")}</Label>
                {!imageUrl ? (
                  <MediaUploaderButton alignSelf="center" onImageSelected={i => setimageUrl(i)}>
                    {t("login.profile.imageUpload")}
                  </MediaUploaderButton>
                ) : (
                  <Button variant="transparent" alignSelf="center" onClick={() => setimageUrl("")}>
                    {t("login.profile.imageClear")}
                  </Button>
                )}
              </Box>
              <Input
                id="imageUrl"
                value={imageUrl ?? ""}
                onChange={e => setimageUrl(e.target.value)}
              />
            </Box>
            <Box>
              <Label htmlFor="name">{t("login.profile.name")}</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setname(e.target.value)}
                placeholder={String("Sebastian Cabeza")}
              />
            </Box>
            <Box>
              <Label htmlFor="dob">{t("login.profile.dob")}</Label>
              <DateStandard id="dob" type="date" value={dob} onChange={v => setdob(v)} />
            </Box>
            <Box>
              <Label htmlFor="github">{t("login.profile.github")}</Label>
              <Input
                id="github"
                value={github ?? ""}
                onChange={e => setgithub(e.target.value)}
                placeholder={String("cabezonidas")}
              />
            </Box>
            <Box>
              <Label htmlFor="twitter">{t("login.profile.twitter")}</Label>
              <Input
                id="twitter"
                value={twitter ?? ""}
                onChange={e => settwitter(e.target.value)}
                placeholder={String("cabezonidas")}
              />
            </Box>
            <Box>
              <Label htmlFor="linkedin">{t("login.profile.linkedin")}</Label>
              <Input
                id="linkedin"
                value={linkedin ?? ""}
                onChange={e => setlinkedin(e.target.value)}
                placeholder={String("sebastian-cabeza-637b4731")}
              />
            </Box>
            <Box>
              <Label htmlFor="whatsapp">{t("login.profile.whatsapp")}</Label>
              <Input
                id="whatsapp"
                value={whatsapp ?? ""}
                onChange={e => setwhatsapp(e.target.value)}
                placeholder={String("642102790126")}
              />
            </Box>
            <Box>
              <Label htmlFor="instagram">{t("login.profile.instagram")}</Label>
              <Input
                id="instagram"
                value={instagram ?? ""}
                onChange={e => setinstagram(e.target.value)}
                placeholder={String("cabezonidas")}
              />
            </Box>
            <Box>
              <Label htmlFor="facebook">{t("login.profile.facebook")}</Label>
              <Input
                id="facebook"
                value={facebook ?? ""}
                onChange={e => setfacebook(e.target.value)}
                placeholder={String("sebastian.scd")}
              />
            </Box>
            <Box>
              <Label htmlFor="messenger">{t("login.profile.messenger")}</Label>
              <Input
                id="messenger"
                value={messenger ?? ""}
                onChange={e => setmessenger(e.target.value)}
                placeholder={String("sebastian.scd")}
              />
            </Box>
            <Box>
              <Label htmlFor="email">{t("login.profile.email")}</Label>
              <Input
                id="email"
                value={email ?? ""}
                onChange={e => setemail(e.target.value)}
                placeholder={String("sebastian.scd@gmail.com")}
                disabled={true}
              />
            </Box>
            {languages.map(l => (
              <Box key={l.localeId}>
                <Label
                  htmlFor={`description-${l.localeId}`}
                  overflow="hidden"
                  maxWidth="100%"
                  style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                >
                  {t("login.profile.description", { language: l.name })}
                </Label>
                <Input
                  id={`description-${l.localeId}`}
                  value={description?.find(d => d.localeId === l.localeId)?.text ?? ""}
                  onChange={({ target: { value } }) =>
                    setdescription(d => [
                      ...(d ?? []).filter(prev => prev.localeId !== l.localeId),
                      { localeId: l.localeId, text: value },
                    ])
                  }
                />
              </Box>
            ))}
          </Box>
          <Button ml="auto" variant="primary" type="submit">
            {t("login.profile.save")}
          </Button>
        </Form>

        <H2 mt="6" mb="2">
          {t("login.profile.preview")}
        </H2>
        <ProfileCard author={author} p="4" borderRadius={4} border={"1px solid"} />
      </Box>
    </>
  );
};

export const Profile = React.forwardRef<HTMLDivElement, IProfile>((props, ref) => {
  const { meQuery, ...boxProps } = props;
  const { i18n, t } = useTranslation();
  const [logout, { client }] = useLogoutMutation();
  const { setAccessToken } = useGraphqlClient();
  i18n.addResourceBundle("en-US", "translation", { login: enUsProfile }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { login: esArProfile }, true, true);

  return (
    <Box {...boxProps} ref={ref}>
      {meQuery.me && (
        <Box display="grid" mt="2" gridGap="1" mx="auto">
          <Box my="2">{t("login.profile.loggedInAs", { email: meQuery.me.email })}</Box>
          <ProfileForm profile={meQuery.me} />
          <Button
            mb="1"
            mt="6"
            width="min-content"
            mx="auto"
            onClick={async () => {
              await logout();
              setAccessToken("");
              if (client) {
                await client.resetStore();
              }
            }}
          >
            {t("login.profile.logout")}
          </Button>
        </Box>
      )}
    </Box>
  );
});
