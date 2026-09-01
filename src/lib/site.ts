export const site = {
  name: "Digenaldo Neto",
  shortName: "Digenaldo.",
  url: "https://digenaldo.com",
  title: "Digenaldo Neto | Cybersecurity Engineer",
  description:
    "Cybersecurity Engineer e Software Engineer. Escrevo sobre segurança de aplicações, inteligência artificial, arquitetura e sistemas distribuídos.",
  locale: "pt-BR",
  location: "João Pessoa, Brasil",
  role: "Cybersecurity Engineer & Software Engineer",
  exploring: "AI Security",
  social: {
    github: "https://github.com/digenaldo",
    linkedin: "https://www.linkedin.com/in/digenaldo",
    instagram: "https://www.instagram.com/digenaldo.neto",
    youtube: "https://youtube.com/@digenaldoneto",
  },
};

export const nav = [
  { href: "/artigos/", label: "Artigos" },
  { href: "/projetos/", label: "Projetos" },
  { href: "/pesquisa/", label: "Pesquisa" },
  { href: "/sobre/", label: "Sobre" },
] as const;

export const interests = [
  {
    name: "Application Security",
    text: "Como aplicações reais falham, e o que dá para prevenir no código, na revisão e na arquitetura.",
  },
  {
    name: "AI Security",
    text: "Modelos, agentes e as novas superfícies de confiança quando a inteligência artificial entra em produção.",
  },
  {
    name: "Security Architecture",
    text: "Decisões de desenho que permanecem quando o sistema cresce, se distribui e precisa ser operado.",
  },
  {
    name: "Distributed Systems",
    text: "Consistência, falha, latência e o que acontece quando várias partes do sistema discordam.",
  },
  {
    name: "Software Engineering",
    text: "Construir software que dá para manter: clareza, limites e responsabilidade nas interfaces.",
  },
  {
    name: "Security Research",
    text: "Investigar ataques, hipóteses e evidências, em especial no cruzamento entre segurança e aprendizado de máquina.",
  },
] as const;

export const projects = [
  {
    name: "ArgusScan",
    description:
      "CLI em Python para reconhecimento em pentests éticos, usando a API do Shodan e gerando relatórios em formatos úteis no dia a dia.",
    stack: ["Python", "Shodan", "CLI"],
    href: "https://github.com/digenaldo/argusscan",
  },
  {
    name: "DDoS Detection Simulator",
    description:
      "Simulador de detecção de DDoS com machine learning, ligado à linha de pesquisa do mestrado na camada de aplicação.",
    stack: ["Python", "Machine Learning"],
    href: "https://github.com/digenaldo/ddos-detection-simulator",
  },
  {
    name: "Malicious Traffic Detection",
    description:
      "Sistema de detecção de tráfego malicioso com aprendizado de máquina, desenvolvido como parte da pesquisa de mestrado.",
    stack: ["Python", "Machine Learning", "Research"],
    href: "https://github.com/digenaldo/malicious-traffic-detection-ml",
  },
  {
    name: "Monitoring Lab",
    description:
      "Laboratório de observabilidade: as mesmas operações em Go e Spring Boot, com métricas no Prometheus e dashboards no Grafana.",
    stack: ["Go", "Spring Boot", "Prometheus", "Grafana"],
    href: "https://github.com/digenaldo/monitoring-lab",
  },
] as const;

export const courses = [
  {
    title: "Inteligência Artificial na Prática",
    description: "Curso público em slides: fundamentos, prompts, limites e prática.",
    href: "/cursos/ia-na-pratica.html",
  },
] as const;

export const articleTopics = [
  "Security",
  "AI Security",
  "Software",
] as const;

export type ArticleTopic = (typeof articleTopics)[number];
