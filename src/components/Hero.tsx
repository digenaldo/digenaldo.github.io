import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="nome">
      <div className={styles.copy}>
        <p className={styles.status}>
          <span className={styles.pulse} aria-hidden="true" />
          currently exploring: {site.exploring}
        </p>
        <h1 id="nome" className={styles.name}>
          {site.name}
        </h1>
        <p className={styles.role}>{site.role}</p>
        <p className={styles.lede}>
          Trabalho com segurança de aplicações, arquitetura de software, sistemas
          distribuídos e inteligência artificial.
        </p>
        <p className={styles.lede}>
          Escrevo sobre segurança, engenharia e os problemas que aparecem quando
          sistemas reais chegam em produção.
        </p>
        <p className={styles.place}>{site.location}</p>
        <p className={styles.links}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </p>
      </div>
      <figure className={styles.portrait}>
        <Image
          src="/images/digenaldo-neto.png"
          alt="Digenaldo Neto, de braços cruzados, camiseta preta e óculos, sorrindo."
          width={1086}
          height={1448}
          priority
          unoptimized
        />
      </figure>
    </section>
  );
}
