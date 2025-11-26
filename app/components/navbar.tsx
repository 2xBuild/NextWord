"use client"

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="w-full bg-black border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-2xl">
                            🔠
                        </div>
                        <span className="font-mono font-bold text-white text-xl">
                            NextWord
                        </span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                       <Link href="/" className="p-2 text-white hover:text-white/80 transition-colors duration-200 font-mono">Home</Link>
                        <a
                            href="https://twitter.com/iBuild"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white hover:text-white/80 transition-colors duration-200"
                            aria-label="Twitter"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}