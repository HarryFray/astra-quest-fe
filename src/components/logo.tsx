import Link from "next/link";

interface IFullScreenLoadingProps {
  linkToHome?: boolean;
}

const Logo = ({ linkToHome = false }: IFullScreenLoadingProps) => {
  return linkToHome ? (
    <Link
      href="/home"
      className="text-4xl font-bold text-white hover:line-through"
    >
      AstroQuest
    </Link>
  ) : (
    <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
  );
};

export default Logo;
