import { RecyclerLayout } from "@/components/layout/recycler-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RecyclerLayout>{children}</RecyclerLayout>;
}
