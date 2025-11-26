import Github from "./icons/github";


export default function Footer() {



    
    return (
        <footer className="w-full border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-mono text-sm text-white/60 flex gap-2">
                        Built by{" "}
                        <a
                            href="https://twitter.com/iBuild"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-white/80 transition-colors duration-200"
                        >
                            void.
                        </a>
                        {" "} Source Code on <a href="https://github.com/2xBuild/games" target="_blank"><Github/></a>
                    </p>
                    <p className="font-mono text-xs text-white/40">
                        © {new Date().getFullYear()}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}