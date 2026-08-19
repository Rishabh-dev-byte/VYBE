import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import logo from "../../assets/logo.svg";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center"
                >
                    <img
                        src={logo}
                        alt="VYBE"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex items-center gap-2">

                        <li>
                            <Link
                                to="/"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/tweets"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                Tweets
                            </Link>
                        </li>

                    </ul>
                </nav>

                {/* Search */}
                <div className="hidden md:flex">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                            type="text"
                            placeholder="Search VYBE..."
                            className="w-64 rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>
                </div>

                {/* Authentication */}
                <div className="flex items-center gap-2">

                    <Link
                        to="/login"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:scale-105 hover:shadow-purple-500/40"
                    >
                        Sign Up
                    </Link>

                    {/* Profile */}
                    <Link
                        to="/profile"
                        className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                        <User size={18} />
                    </Link>

                </div>

            </div>
        </header>
    );
};

export default Header;