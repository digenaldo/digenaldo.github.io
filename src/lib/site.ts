export const site = {
  name: "Digenaldo Neto",
  shortName: "Digenaldo.",
  url: "https://digenaldo.com",
  title: "Digenaldo Neto | Cybersecurity Engineer",
  description:
    "Cybersecurity Engineer e Software Engineer. Escrevo sobre AI security, hacking, segurança de aplicações e sistemas distribuídos.",
  locale: "pt-BR",
  location: "João Pessoa, Brasil",
  email: "digenaldo.rangel@gmail.com",
  role: "Cybersecurity Engineer & Software Engineer",
  exploring: "AI Security",
  social: {
    github: "https://github.com/digenaldo",
    linkedin: "https://www.linkedin.com/in/digenaldo",
    instagram: "https://www.instagram.com/digenaldo.neto",
    youtube: "https://youtube.com/@digenaldoneto",
  },
};

export const shellUser = "digenaldo@sec";

export const nav = [
  { href: "/artigos/", label: "Artigos" },
  { href: "/projetos/", label: "Projetos" },
  { href: "/pesquisa/", label: "Pesquisa" },
  { href: "/ensino/", label: "Ensino" },
  { href: "/sobre/", label: "Sobre" },
] as const;

export const terminalBlocks = [
  {
    cmd: "whoami",
    out: ["digenaldo neto — cybersecurity engineer & software engineer"],
  },
  {
    cmd: "cat ~/focus.txt",
    out: [
      "application security · ai security · security architecture",
      "distributed systems · software engineering",
    ],
  },
  {
    cmd: "ls ~/research",
    out: ["ddos-detection/  malicious-traffic-ml/  llm-security/"],
  },
  {
    cmd: "echo $STATUS",
    out: ["exploring: AI Security"],
  },
];

export const interests = [
  {
    name: "AI Security",
    text: "Como atacar e proteger modelos e agentes quando a IA entra em produção.",
  },
  {
    name: "Application Security",
    text: "Como aplicações reais falham e o que dá para evitar ainda no código e na revisão.",
  },
  {
    name: "Security Architecture",
    text: "Decisões de desenho que continuam valendo quando o sistema cresce e se distribui.",
  },
  {
    name: "Distributed Systems",
    text: "O que acontece quando partes do sistema discordam, falham ou demoram a responder.",
  },
  {
    name: "Software Engineering",
    text: "Software que dá para manter, com interfaces claras e responsabilidades bem definidas.",
  },
  {
    name: "Security Research",
    text: "Investigar ataques com hipótese e evidência, principalmente onde segurança e machine learning se cruzam.",
  },
] as const;

export const projects = [
  {
    name: "h4kfi",
    description:
      "Framework de pentest wireless feito para agentes de IA. Scan, captura de handshake e PMKID, ataques WPS e cracking ficam expostos via MCP, e o agente conduz o teste autorizado a partir de um pedido em linguagem natural.",
    stack: ["Python", "MCP", "AI Agents", "aircrack-ng"],
    href: "https://github.com/digenaldo/h4kfi",
  },
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
