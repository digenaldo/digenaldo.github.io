import Link from "next/link";
import { PageMast } from "@/components/PageMast";

export default function NotFound() {
  return (
    <div className="shell">
      <PageMast
        command="cd ./esta-pagina"
        title="404"
        lede={
          <>
            <span className="font-mono text-alert">No such file or directory.</span>{" "}
            Volte ao{" "}
            <Link href="/" className="text-signal underline underline-offset-4">
              início
            </Link>{" "}
            ou aos{" "}
            <Link href="/artigos/" className="text-signal underline underline-offset-4">
              artigos
            </Link>
            .
          </>
        }
      />
    </div>
  );
}
