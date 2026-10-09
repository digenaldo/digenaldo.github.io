import { htmlLang, pick } from "@/lib/i18n";

export const site = {
  name: "Digenaldo Neto",
  shortName: "Digenaldo.",
  url: "https://digenaldo.com",
  title: "Digenaldo Neto | Cybersecurity Engineer",
  description: pick(
    "Cybersecurity Engineer e Software Engineer. Escrevo sobre AI security, hacking, segurança de aplicações e sistemas distribuídos.",
    "Cybersecurity Engineer and Software Engineer. I write about AI security, hacking, application security, and distributed systems.",
  ),
  locale: htmlLang,
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
  { href: "/artigos/", label: pick("Artigos", "Articles") },
  { href: "/projetos/", label: pick("Projetos", "Projects") },
  { href: "/pesquisa/", label: pick("Pesquisa", "Research") },
  { href: "/ensino/", label: pick("Ensino", "Teaching") },
  { href: "/sobre/", label: pick("Sobre", "About") },
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
    text: pick(
      "Como atacar e proteger modelos e agentes quando a IA entra em produção.",
      "How to attack and protect models and agents once AI runs in production.",
    ),
  },
  {
    name: "Application Security",
    text: pick(
      "Como aplicações reais falham e o que dá para evitar ainda no código e na revisão.",
      "How real applications fail, and what you can stop early, in the code and the review.",
    ),
  },
  {
    name: "Security Architecture",
    text: pick(
      "Decisões de desenho que continuam valendo quando o sistema cresce e se distribui.",
      "Design choices that still hold when the system grows and spreads out.",
    ),
  },
  {
    name: "Distributed Systems",
    text: pick(
      "O que acontece quando partes do sistema discordam, falham ou demoram a responder.",
      "What happens when parts of the system disagree, fail, or answer late.",
    ),
  },
  {
    name: "Software Engineering",
    text: pick(
      "Software que dá para manter, com interfaces claras e responsabilidades bem definidas.",
      "Software you can maintain, with clear interfaces and well-defined responsibilities.",
    ),
  },
  {
    name: "Security Research",
    text: pick(
      "Investigar ataques com hipótese e evidência, principalmente onde segurança e machine learning se cruzam.",
      "Studying attacks with a hypothesis and evidence, mostly where security and machine learning meet.",
    ),
  },
] as const;

export const projects = [
  {
    name: "h4kfi",
    description: pick(
      "Framework de pentest wireless feito para agentes de IA. Scan, captura de handshake e PMKID, ataques WPS e cracking ficam expostos via MCP, e o agente conduz o teste autorizado a partir de um pedido em linguagem natural.",
      "Wireless pentest framework built for AI agents. Scanning, handshake and PMKID capture, WPS attacks, and cracking are exposed over MCP, so the agent runs the authorized test from a plain-language request.",
    ),
    stack: ["Python", "MCP", "AI Agents", "aircrack-ng"],
    href: "https://github.com/digenaldo/h4kfi",
  },
  {
    name: "ArgusScan",
    description: pick(
      "CLI em Python para reconhecimento em pentests éticos, usando a API do Shodan e gerando relatórios em formatos úteis no dia a dia.",
      "Python CLI for recon in ethical pentests. It uses the Shodan API and generates reports in formats that are useful day to day.",
    ),
    stack: ["Python", "Shodan", "CLI"],
    href: "https://github.com/digenaldo/argusscan",
  },
  {
    name: "DDoS Detection Simulator",
    description: pick(
      "Simulador de detecção de DDoS com machine learning, ligado à linha de pesquisa do mestrado na camada de aplicação.",
      "DDoS detection simulator with machine learning, tied to my master's research on the application layer.",
    ),
    stack: ["Python", "Machine Learning"],
    href: "https://github.com/digenaldo/ddos-detection-simulator",
  },
  {
    name: "Malicious Traffic Detection",
    description: pick(
      "Sistema de detecção de tráfego malicioso com aprendizado de máquina, desenvolvido como parte da pesquisa de mestrado.",
      "Malicious traffic detection system with machine learning, built as part of my master's research.",
    ),
    stack: ["Python", "Machine Learning", "Research"],
    href: "https://github.com/digenaldo/malicious-traffic-detection-ml",
  },
  {
    name: "Monitoring Lab",
    description: pick(
      "Laboratório de observabilidade: as mesmas operações em Go e Spring Boot, com métricas no Prometheus e dashboards no Grafana.",
      "Observability lab: the same operations in Go and Spring Boot, with metrics in Prometheus and dashboards in Grafana.",
    ),
    stack: ["Go", "Spring Boot", "Prometheus", "Grafana"],
    href: "https://github.com/digenaldo/monitoring-lab",
  },
] as const;

export const courses = [
  {
    title: "Inteligência Artificial na Prática",
    description: pick(
      "Curso público em slides: fundamentos, prompts, limites e prática.",
      "Public slide course (in Portuguese): fundamentals, prompts, limits, and practice.",
    ),
    href: "/cursos/ia-na-pratica.html",
  },
] as const;

export const articleTopics = [
  "Security",
  "AI Security",
  "Software",
] as const;

export type ArticleTopic = (typeof articleTopics)[number];
