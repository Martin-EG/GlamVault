import Text from "@/GlamUI/components/Text";
import Image from "next/image";

interface AuthCardProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

const AuthCard = ({ title, children }: AuthCardProps) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
    <Image src="/glamvault-complete.svg" alt="GlamVault" width={320} height={200} />
    <div className="flex flex-col items-center w-full max-w-sm">
      <Text variant="heading" size="xxl" weight="bold" as="h1" align='center'>{title}</Text>
      {children}
    </div>
  </div>
);

export default AuthCard;
