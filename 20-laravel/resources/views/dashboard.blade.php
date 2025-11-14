 @extends('layouts.dashboard')
 @section('tittle','Dashboard ADMIN: Larapets 🐦‍')

 @section('content')

    <h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutra-50 mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor"
            viewBox="0 0 256 256">
            <path
                d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z">
            </path>
        </svg>
        Dashboard
    </h1>
    {{--Cards--}}
    <div class="flex flex-wrap gap-4 items-center justify-center">
        {{-- Module Users --}}
        <div class="card bg-[#0008] text-white w-96 shadow-sm">
            <figure>
                <img
                    src="images/modulo_user.png"
                    alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Modle Users</h2>
                {{-- Stats --}}
                <ul class="list bg-[#fff2] rounded-box shadow-md">
                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">statistics</li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
                                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Total Users</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::count()  }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
                                <path 
                                d="M160,40a32,32,0,1,0-32,32A32,32,0,0,0,160,40ZM128,56a16,16,0,1,1,16-16A16,16,0,0,1,128,56Zm90.34,78.05L173.17,82.83a32,32,0,0,0-24-10.83H106.83a32,32,0,0,0-24,10.83L37.66,134.05a20,20,0,0,0,28.13,28.43l16.3-13.08L65.55,212.28A20,20,0,0,0,102,228.8l26-44.87,26,44.87a20,20,0,0,0,36.41-16.52L173.91,149.4l16.3,13.08a20,20,0,0,0,28.13-28.43Zm-11.51,16.77a4,4,0,0,1-5.66,0c-.21-.2-.42-.4-.65-.58L165,121.76A8,8,0,0,0,152.26,130L175.14,217a7.72,7.72,0,0,0,.48,1.35,4,4,0,1,1-7.25,3.38,6.25,6.25,0,0,0-.33-.63L134.92,164a8,8,0,0,0-13.84,0L88,221.05a6.25,6.25,0,0,0-.33.63,4,4,0,0,1-2.26,2.07,4,4,0,0,1-5-5.45,7.72,7.72,0,0,0,.48-1.35L103.74,130A8,8,0,0,0,91,121.76L55.48,150.24c-.23.18-.44.38-.65.58a4,4,0,1,1-5.66-5.65c.12-.12.23-.24.34-.37L94.83,93.41a16,16,0,0,1,12-5.41h42.34a16,16,0,0,1,12,5.41l45.32,51.39c.11.13.22.25.34.37A4,4,0,0,1,206.83,150.82Z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Customers</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::where('role',"Customer")->count()  }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
                                <path d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,0,0,12.25,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.25-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm197.66,33.66-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L216,148.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Actives</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\User::where('active',1)->count()  }}
                        </button>
                    </li>
                </ul>
                <div class="card-actions justify-end">
                    <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-3" href="{{ url('users') }}">
                        Enter
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                            <path 
                                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm29.66-93.66a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32Z">
                            </path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        {{-- Module Pets --}}
        <div class="card bg-[#0008] text-white w-96 shadow-sm">
            <figure>
                <img
                    src="images/modulo_pets.png"
                    alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Module Pets</h2>
                {{-- Stats --}}
                <ul class="list bg-[#fff2] rounded-box shadow-md">
                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">statistics</li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z"></path></svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Total Pets</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\Pet::count()  }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.92,56h40.15L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z"></path></svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Dog</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\Pet::where('Kind',"Dog")->count()  }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M96,140a12,12,0,1,1-12-12A12,12,0,0,1,96,140Zm76-12a12,12,0,1,0,12,12A12,12,0,0,0,172,128Zm60-80v88c0,52.93-46.65,96-104,96S24,188.93,24,136V48A16,16,0,0,1,51.31,36.69c.14.14.26.27.38.41L69,57a111.22,111.22,0,0,1,118.1,0L204.31,37.1c.12-.14.24-.27.38-.41A16,16,0,0,1,232,48Zm-16,0-21.56,24.8A8,8,0,0,1,183.63,74,88.86,88.86,0,0,0,168,64.75V88a8,8,0,1,1-16,0V59.05a97.43,97.43,0,0,0-16-2.72V88a8,8,0,1,1-16,0V56.33a97.43,97.43,0,0,0-16,2.72V88a8,8,0,1,1-16,0V64.75A88.86,88.86,0,0,0,72.37,74a8,8,0,0,1-10.81-1.17L40,48v88c0,41.66,35.21,76,80,79.67V195.31l-13.66-13.66a8,8,0,0,1,11.32-11.31L128,180.68l10.34-10.34a8,8,0,0,1,11.32,11.31L136,195.31v20.36c44.79-3.69,80-38,80-79.67Z"></path></svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Cat</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\Pet::where('Kind',"Cat")->count()  }}
                        </button>
                    </li>
                </ul>
                <div class="card-actions justify-end">
                    <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-3" href="{{ url('users') }}">
                        Enter
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                            <path 
                                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm29.66-93.66a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32Z">
                            </path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        {{-- Module Adoptions --}}

            <div class="card bg-[#0008] text-white w-96 shadow-sm">
            <figure>
                <img
                    src="images/modulo_adoptions.png"
                    alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Module Adoptions</h2>
                {{-- Stats --}}
                <ul class="list bg-[#fff2] rounded-box shadow-md">
                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">statistics</li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path></svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Total Adoptions</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\Adoption::count()  }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z"></path></svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Dog Adopteds</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\Pet::where('status',1)->where('Kind',"Dog")->count()  }}
                        </button>
                    </li>
                    <li class="list-row">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z"></path></svg>
                        </div>
                        <div class="flex items-center">
                            <div class="text-xs uppercase font-semibold opacity-60">Cat Adopteds</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            {{ App\Models\Pet::where('status',1)->where('Kind',"Cat")->count()  }}
                        </button>
                    </li>
                </ul>
                <div class="card-actions justify-end">
                    <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-3" href="{{ url('users') }}">
                        Enter
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                            <path 
                                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm29.66-93.66a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32Z">
                            </path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
 @endsection