import { projects } from "@/lib/site";
import styles from "./ProjectList.module.css";

type Props = {
  limit?: number;
};

export function ProjectList({ limit }: Props) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <ul className={styles.list}>
      {items.map((project) => (
        <li key={project.name} className={styles.item}>
          <div>
            <h3 className={styles.name}>
              <a href={project.href} rel="noopener noreferrer">
                {project.name}
              </a>
            </h3>
            <p className={styles.desc}>{project.description}</p>
            <p className={styles.stack}>{project.stack.join(" · ")}</p>
          </div>
          <a className={styles.repo} href={project.href} rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      ))}
    </ul>
  );
}
