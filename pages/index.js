import React from "react";
import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4ODU1MSwiZXhwIjoxOTU4ODY0NTUxfQ.qqAQ4E4IKa9k0lk8IMMGxHjvCT4yrR8QCm8eD2PR96g";
const SUPABASE_URL = "https://ovfffxwwmrtxzwmhradb.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: white;
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

//function HomePage() {
//    return (
//    <>
//        <GlobalStyle />
//        <Titulo tag='h2'>Boas vindas de volta!</Titulo>
//        <h2>Discord - Alura Matrix</h2>
//    </>
//   )
// }

//export default HomePage

export default function PaginaInicial() {
  const [username, setUsername] = React.useState("");
  const login = {
    user: username,
  };
  const [photo, setPhoto] = React.useState("");
  const roteamento = useRouter();
  React.useEffect(() => {
    if (
      username == "vitucss" ||
      username == "euithalo" ||
      username == "maissonamorim" ||
      username == "jose_diogo" ||
      username == "alvslimagabriel" ||
      username == "naperolaa" ||
      username == "oguisonick" ||
      username == "oalessandroferrari"||
      username == "mateusomsm"||
      username == "joaovitorbispar"
    ){
      setPhoto(`images/${username}.jpg`);
    }else {
      setPhoto(
        "https://static.vecteezy.com/ti/vetor-gratis/p1/2387693-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg"
      );
    }
  }, [username]);
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              supabase
                .from("login")
                .insert([login])
                .then(({ data }) => {});
              roteamento.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              onChange={async (event) => {
                setUsername(event.target.value);
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`${photo}`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
              src={photo}
            >
              @{username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
