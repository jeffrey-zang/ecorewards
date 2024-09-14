import React from "react";
import { Home, Users, Camera, Wallet, CircleUserRound} from "lucide-react";
import { Link, useLocation } from '@remix-run/react';
import { ClientOnly } from "remix-utils/client-only";

function Footer() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <footer className="relative bg-white border-t border-gray-200">
            <div className="flex justify-around items-end px-4 py-4">
                <button className="flex flex-col items-center">
                    <Home className={`h-6 w-6 ${currentPath === '/' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className="text-xs mt-1 text-gray-500 sr-only">Home</span>
                </button>
                <button className="flex flex-col items-center">
                    <Users className={`h-6 w-6 ${currentPath === '/social' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className="text-xs mt-1 text-gray-500 sr-only">Social</span>
                </button>
                {/* place holder */}
                <span className="w-16" />
                <button className="flex flex-col items-center">
                    <Wallet className={`h-6 w-6 ${currentPath === '/history' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className="text-xs mt-1 text-gray-500 sr-only">History</span>
                </button>
                <button className="flex flex-col items-center">
                    <CircleUserRound className={`h-6 w-6 ${currentPath === '/profile' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className="text-xs mt-1 text-gray-500 sr-only">Profile</span>
                </button>
                {/* <ClientOnly> */}
                    <button onClick={() => alert("test")} className="absolute left-1/2 -translate-x-1/2 -top-3 p-1 bg-white rounded-full shadow-[0_-3px_3px_-3px_rgba(0,0,0,0.25)]">
                        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white" />
                        </div>
                    </button>
                {/* </ClientOnly> */}
            </div>
        </footer>
    );
}

export default Footer;

