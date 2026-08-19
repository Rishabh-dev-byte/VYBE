import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black px-6 py-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                <p className="text-sm text-gray-500">
                    © 2026 VYBE. All rights reserved.
                </p>

                <div className="flex gap-6 text-sm">
                    <Link
                        to="/about"
                        className="text-gray-400 transition hover:text-white"
                    >
                        About
                    </Link>

                    <Link
                        to="/privacy"
                        className="text-gray-400 transition hover:text-white"
                    >
                        Privacy
                    </Link>

                    <Link
                        to="/terms"
                        className="text-gray-400 transition hover:text-white"
                    >
                        Terms
                    </Link>
                </div>

            </div>
        </footer>
    );
};

export default Footer;