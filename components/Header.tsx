import Link from "next/link";

function Header() {
  return (
  <header>
      <div>
        <Link href="/">
            <img className="w-44 object-contain cursor-pointer" src="https://github.com/thejamesgore/typescript-medium/blob/development/images/mediumlogo.png" alt="" />
        </Link>
      </div>
      <div></div>

  </header>
  )
}

export default Header;
