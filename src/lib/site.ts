export const site = {
  name: "Digenaldo Neto",
  url: "https://digenaldo.com",
  title: "Digenaldo Neto — pesquisa, engenharia, ensino",
  description:
    "Professor, security engineer e software engineer. Pesquisa, engenharia e ensino em cibersegurança, software e inteligência artificial.",
  locale: "pt-BR",
  social: {
    github: "https://github.com/digenaldo",
    linkedin: "https://www.linkedin.com/in/digenaldo",
    instagram: "https://www.instagram.com/digenaldo.neto",
    youtube: "https://youtube.com/@digenaldoneto",
  },
};

export const nav = [
  { n: "01", href: "/", label: "Início" },
  { n: "02", href: "/artigos/", label: "Artigos" },
  { n: "03", href: "/ensino/", label: "Ensino" },
  { n: "04", href: "/pesquisa/", label: "Pesquisa" },
  { n: "05", href: "/sobre/", label: "Sobre" },
] as const;
