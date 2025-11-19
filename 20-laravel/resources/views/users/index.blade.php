@extends('layouts.dashboard')

@section('tittle', 'Module Users: Larapets 🪿')

@section('content')
    <h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutra-50 mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path></svg>
        Module Users
    </h1>

    {{--  Options --}}
    <div class="join">
        <a class="btn btn-outline btn-success join-item bg-[#0006] hover:bg-[#00d390]" href="{{ url('users/create') }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z">
                </path>
            </svg>
            <span class="hidden md:inline">
                Add User
            </span> 
        </a>
        <a class="btn btn-outline bg-[#0006] text-white hover:bg-[#0009] hover:text-white join-item" href="{{ url('export/users/pdf') }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path></svg>
            <span class="hidden md:inline">
                Export
            </span>
        </a>
        <a class="btn btn-outline bg-[#0006] text-white hover:bg-[#0009] hover:text-white join-item" href="{{ url('export/users/excel') }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M200,24H72A16,16,0,0,0,56,40V64H40A16,16,0,0,0,24,80v96a16,16,0,0,0,16,16H56v24a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm-40,80h40v48H160Zm40-16H160V80a16,16,0,0,0-16-16V40h56ZM72,40h56V64H72ZM40,80H144v79.83c0,.06,0,.11,0,.17s0,.11,0,.17V176H40ZM72,192h56v24H72Zm72,24V192a16,16,0,0,0,16-16v-8h40v48ZM65.85,146.88,81.59,128,65.85,109.12a8,8,0,0,1,12.3-10.24L92,115.5l13.85-16.62a8,8,0,1,1,12.3,10.24L102.41,128l15.74,18.88a8,8,0,0,1-12.3,10.24L92,140.5,78.15,157.12a8,8,0,0,1-12.3-10.24Z"></path></svg>
            <span class="hidden md:inline">
                Export
            </span>
        </a>
        <a class="btn btn-outline bg-[#0006] text-white hover:bg-[#0009] hover:text-white join-item" href="{{ url('users/create') }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-42.34-77.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,148.69V88a8,8,0,0,1,16,0v60.69l18.34-18.35A8,8,0,0,1,165.66,130.34Z"></path></svg>
            <span class="hidden md:inline">
                Import
            </span>
        </a>
    </div>
    {{-- Buscar --}}
    <label class="input text-white bg-[#000000e8] outline-none mb-10">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
            >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>
        <input type="search" required placeholder="qsearch" />
    </label>



    <div class="overflow-x-auto rounded-box text-white bg-[#0009]">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class=" bg-black text-white">
                    <th class="hidden md:table-cell">Id</th>
                    <th>Photo</th>
                    <th class="hidden md:table-cell">Documento</th>
                    <th>Full Name</th>
                    <th class="hidden md:table-cell">Role</th>
                    <th class="hidden md:table-cell">Active</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                    <tr @if($user->id % 2 == 0) class="bg-[#0000007c]" @endif>
                        <th class="hidden md:table-cell">{{ $user->id }}</th>
                        <td>
                            <div class="avatar">
                                <div class="mask mask-squircle w-16">
                                    <img src="{{ $user->photo }}"/>
                                </div>
                            </div>
                        </td>
                        <td class="hidden md:table-cell">{{ $user->document }}</td>
                        <td>{{ $user->fullname }}</td>
                        <td class="hidden md:table-cell">
                            @if ($user->role == 'Administrator')
                                <div class="badge badge-outline badge-warning">Admin</div>
                            @else
                                <div class="badge badge-outline badge-default">Customer</div>
                            @endif
                        </td>
                        <td>
                            @if ($user->active == 1)
                                <div class="badge badge-outline badge-success">Active</div>
                            @else
                                <div class="badge badge-outline badge-error">Inactive</div>
                            @endif
                        <td>
                            <a class="btn btn-outline btn-xs" href="{{ url('users/'.$user->id) }}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                            </a>
                            <a class="btn btn-outline btn-xs" href="{{ url('users/'.$user->id.'/edit') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>
                            </a>
                            <a class="btn btn-outline btn-error btn-xs" href="javascript:;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                            </a>
                        </td>
                    </tr>
                @endforeach
                <tr class="bg-[#0009]">
                    <td colspan="7">{{ $users->links('layouts.pagination') }}</td>
                </tr>
            </tbody>
        </table>
    </div>


@endsection