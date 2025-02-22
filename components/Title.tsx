import { cn } from "@/lib/utlis";
interface Props {
  className?: string;
  children: React.ReactNode;
}

const Title = ({ className, children }: Props) => {
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
};

export default Title;
