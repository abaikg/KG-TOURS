import React from 'react';

export function TransactionsList() {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] p-2 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="text-gray-400 text-xs border-b border-white/5">
                        <th className="p-4 font-normal">Company</th>
                        <th className="p-4 font-normal"><span className="bg-white/10 px-2 py-1 rounded">Billing ^</span></th>
                        <th className="p-4 font-normal">Amount</th>
                        <th className="p-4 font-normal">Paying for</th>
                        <th className="p-4 font-normal">Plan</th>
                        <th className="p-4 font-normal">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr className="hover:bg-white/5 transition border-b border-white/5 last:border-0">
                        <td className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-red-600 font-bold text-lg">N</div>
                            <span className="font-bold text-base">Netflix</span>
                        </td>
                        <td className="p-4 text-gray-300">Today</td>
                        <td className="p-4 font-bold text-lg">$19.99</td>
                        <td className="p-4 text-gray-400">1 year</td>
                        <td className="p-4 text-gray-300">Premium</td>
                        <td className="p-4"><span className="bg-[#4ade80]/20 text-[#4ade80] px-3 py-1 rounded-full text-xs font-bold">Completed</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 transition border-b border-white/5 last:border-0">
                        <td className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-1.07 3.97-2.9 5.07z" /></svg>
                            </div>
                            <span className="font-bold text-base">Dribbble</span>
                        </td>
                        <td className="p-4 text-gray-300">Wednesday</td>
                        <td className="p-4 font-bold text-lg">$12.00</td>
                        <td className="p-4 text-gray-400">3 months</td>
                        <td className="p-4 text-gray-300">Pro/Monthly</td>
                        <td className="p-4"><span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold">Processing</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 transition">
                        <td className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                                F
                            </div>
                            <span className="font-bold text-base">Figma</span>
                        </td>
                        <td className="p-4 text-gray-300">Friday</td>
                        <td className="p-4 font-bold text-lg">$15.00</td>
                        <td className="p-4 text-gray-400">1 month</td>
                        <td className="p-4 text-gray-300">Professional</td>
                        <td className="p-4"><span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">Pending</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
