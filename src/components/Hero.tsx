"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

const states = [
  {
    id: "research",
    label: "Pesquisa.",
    description:
      "Investigo a interseção entre cibersegurança, inteligência artificial e sistemas distribuídos, transformando problemas reais em questões que merecem ser estudadas.",
  },
  {
    id: "engineering",
    label: "Engenharia.",
    description:
      "Projeto, construo e protejo sistemas em produção, conectando segurança, software e arquitetura para resolver problemas reais.",
  },
  {
    id: "teaching",
    label: "Ensino.",
    description:
      "Levo a experiência da engenharia para a sala de aula, transformando temas complexos em aprendizado prático, claro e aplicável.",
  },
] as const;

function Chars({ text }: { text: string }) {
  return (
    <span className={styles.clip}>
      <span className={styles.chars}>
        {text.split("").map((char, index) => (
          <span key={`${char}-${index}`} className={styles.ch} data-ch="">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compact = window.matchMedia("(max-width: 640px)").matches;
    const words = Array.from(
      node.querySelectorAll<HTMLElement>("[data-word]"),
    );
    const copies = Array.from(
      node.querySelectorAll<HTMLElement>("[data-copy-item]"),
    );
    const marker = node.querySelector<HTMLElement>("[data-marker]");
    const stage = node.querySelector<HTMLElement>("[data-stage]");
    const film = node.querySelector<HTMLVideoElement>("[data-film]");
    const fine = window.matchMedia("(pointer: fine)").matches;
    let active = -1;
    let swap: gsap.core.Timeline | null = null;

    const moveMarker = (index: number, duration: number) => {
      if (!marker) return;
      const target = words[index];
      if (!target) return;
      const vars = {
        y: target.offsetTop,
        height: target.offsetHeight,
        duration,
        ease: "sine.inOut",
      };
      if (duration === 0) gsap.set(marker, vars);
      else gsap.to(marker, vars);
    };

    const paintWords = (index: number) => {
      words.forEach((word, wordIndex) => {
        const on = wordIndex === index;
        word.classList.toggle(styles.on, on);
        if (on) word.setAttribute("aria-current", "true");
        else word.removeAttribute("aria-current");
      });
    };

    const paintCopy = (index: number, duration: number) => {
      const incoming = copies[index];
      if (!incoming || active === index) return;

      copies.forEach((item, itemIndex) => {
        item.setAttribute(
          "aria-hidden",
          itemIndex === index ? "false" : "true",
        );
      });

      swap?.kill();

      if (duration === 0) {
        copies.forEach((item, itemIndex) => {
          gsap.set(item, {
            opacity: itemIndex === index ? 1 : 0,
            y: 0,
            clipPath:
              itemIndex === index ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          });
        });
        return;
      }

      const outgoing = active >= 0 ? copies[active] : null;
      const outY = compact ? -5 : -8;
      const inY = compact ? 8 : 10;
      const outDur = duration * 0.62;
      const inDur = duration * 0.88;

      swap = gsap.timeline();

      if (outgoing && outgoing !== incoming) {
        swap.to(
          outgoing,
          {
            y: outY,
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
            duration: outDur,
            ease: "sine.in",
          },
          0,
        );
      }

      swap.fromTo(
        incoming,
        {
          y: inY,
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: inDur,
          ease: "sine.out",
        },
        outgoing ? duration * 0.28 : 0,
      );
    };

    const paint = (index: number, duration = 0.9) => {
      moveMarker(index, duration);
      paintWords(index);
      paintCopy(index, duration);
      active = index;
    };

    if (reduce) {
      film?.pause();
      paint(0, 0);
      const onResize = () => moveMarker(0, 0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    void film?.play().catch(() => undefined);

    const ctx = gsap.context(() => {
      gsap.set("[data-ch]", { yPercent: 110 });
      gsap.set("[data-line]", { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set("[data-lede]", { y: 16, opacity: 0 });
      gsap.set("[data-media]", { opacity: 0 });
      gsap.set("[data-top] > *", { y: 10, opacity: 0 });
      gsap.set("[data-copy-item]", {
        opacity: 0,
        y: inStart(compact),
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set(marker, {
        y: 0,
        height: words[0]?.offsetHeight ?? 0,
      });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to("[data-top] > *", {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
        })
        .to("[data-line]", { scaleX: 1, duration: 0.9 }, 0.16)
        .to("[data-ch]", { yPercent: 0, duration: 0.9, stagger: 0.022 }, 0.22)
        .add(() => paint(0, 0.8), 0.85)
        .to("[data-lede]", { y: 0, opacity: 1, duration: 0.7 }, 1.15)
        .to("[data-media]", { opacity: 1, duration: 1 }, 0.45);
    }, node);

    const cycle = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.8,
      delay: 4.6,
    });
    [1, 2, 0].forEach((index, step) => {
      cycle.add(() => paint(index, 0.9), step * 3.6);
    });

    const pause = () => cycle.pause();
    const resume = () => cycle.resume();
    stage?.addEventListener("mouseenter", pause);
    stage?.addEventListener("mouseleave", resume);

    const onEnter = (index: number) => () => paint(index, 0.55);
    if (fine) {
      words.forEach((word, index) => {
        word.addEventListener("pointerenter", onEnter(index));
      });
    }

    const onResize = () => {
      if (active < 0) return;
      moveMarker(active, 0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      swap?.kill();
      cycle.kill();
      film?.pause();
      gsap.killTweensOf([marker, ...copies, ...words]);
      window.removeEventListener("resize", onResize);
      stage?.removeEventListener("mouseenter", pause);
      stage?.removeEventListener("mouseleave", resume);
      words.forEach((word, index) => {
        word.removeEventListener("pointerenter", onEnter(index));
      });
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="nome">
      <div className={styles.top} data-top="">
        <p className={styles.index}>01 — Introdução</p>
        <h1 id="nome" className={styles.srOnly}>
          Digenaldo Neto
        </h1>
      </div>

      <div className={styles.line} data-line="" aria-hidden="true" />

      <div className={styles.stage} data-stage="">
        <span className={styles.marker} data-marker="" aria-hidden="true" />
        <ul className={styles.triad} aria-label="Eixos de trabalho">
          {states.map((state) => (
            <li key={state.id} className={styles.word} data-word="">
              <Chars text={state.label} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.footer} data-lede="">
        <p className={styles.role}>
          Professor · Arquiteto de Soluções
        </p>
        <p className={styles.srOnly}>
          Eu estudo problemas. Eu construo soluções. Eu compartilho
          conhecimento.
        </p>
        <div className={styles.copy}>
          {states.map((state, index) => (
            <p
              key={state.id}
              className={styles.copyItem}
              data-copy-item=""
              aria-hidden={index === 0 ? "false" : "true"}
            >
              {state.description}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.media} data-media="" aria-hidden="true">
        <video
          className={styles.film}
          data-film=""
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/video/minimalist-editorial-motion.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}

function inStart(compact: boolean) {
  return compact ? 8 : 12;
}
