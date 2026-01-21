import React from 'react';

export function TopSummary() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Large Card */}
            <div className="col-span-12 lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-lg text-gray-300 mb-2">Monday</h2>
                        <div className="text-[5rem] md:text-[6rem] leading-none font-bold text-white tracking-tighter">12</div>
                        <div className="mt-4 flex items-center gap-2 text-rose-500 bg-rose-500/10 px-3 py-1 rounded-lg w-fit">
                            <span className="w-1 h-8 bg-rose-500 rounded-full"></span>
                            <span className="text-sm font-medium leading-tight">Please check your<br />failed subscriptions.</span>
                        </div>
                    </div>

                    {/* Dribbble Card inside */}
                    <div className="bg-[#1a1b3aff]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 w-full md:w-72">
                        <div className="flex justify-between items-center mb-4">
                            <span className="bg-[#4ade80]/20 text-[#4ade80] px-3 py-1 rounded-full text-xs font-semibold">Upcoming Bills</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                                {/* Dribbble Icon */}
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-1.07 3.97-2.9 5.07z" /></svg>
                            </div>
                            <div>
                                <div className="font-bold text-sm">Dribbble Pro</div>
                                <div className="text-[10px] text-gray-400">Last charge: 16 Nov 2021</div>
                            </div>
                            <div className="ml-auto border border-white/20 rounded-lg px-2 py-1 text-xs">$60</div>
                        </div>
                        <div className="mt-4 flex justify-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        </div>
                    </div>
                </div>

                {/* Right side form area (Visual only) */}
                <div className="absolute top-0 right-0 w-1/3 h-full border-l border-white/5 p-6 hidden xl:block">
                    <h3 className="text-gray-400 mb-4 text-sm">Which recurring payment plan do you want to add?</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                            <span className="text-sm">Personal Bills</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 cursor-pointer border border-white/5">
                            <div className="w-4 h-4 rounded-full border-4 border-white bg-transparent"></div>
                            <span className="font-bold text-sm">Subscriptions</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                            <span className="text-sm">Other</span>
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <button className="bg-white text-[#050511] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:scale-105 transition">
                            <span>+</span> Add new
                        </button>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Edit settings</span>
                    </div>
                </div>
            </div>

            {/* Calendar Widget */}
            <div className="col-span-12 lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 h-full min-h-[300px]">
                <div className="flex justify-between items-center mb-6">
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm text-gray-300">2022</span>
                    <h2 className="text-2xl font-bold">December</h2>
                </div>
                <div className="grid grid-cols-7 text-center text-xs md:text-sm text-gray-500 gap-y-6">
                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>

                    {/* Calendar Days - Simplified logic for visual match */}
                    <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                    <span>5</span><span>6</span><span>7</span><span>8</span><span className="bg-[#4ade80] text-[#050511] rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-lg shadow-green-500/20 font-bold">9</span><span>10</span><span>11</span>
                    <span>12</span><span>13</span><span>14</span><span className="bg-[#4ade80]/20 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto">15</span><span>16</span><span>17</span><span>18</span>
                    <span>19</span><span className="bg-[#4ade80]/20 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto">20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                    <span>26</span><span>27</span><span className="bg-[#4ade80] text-[#050511] rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-lg shadow-green-500/20 font-bold">28</span><span>29</span><span>30</span><span>31</span>
                </div>
            </div>
        </div>
    )
}
