# Task Application System

A simple **Task Management Application** built with **Django** for the backend and **React (TypeScript)** for the frontend. This project allows users to create, read, update, and delete tasks, as well as view task statuses using a **status bar**.  

## Features

- **CRUD operations** for tasks (Create, Read, Update, Delete).  
- **Status bar** to show task completion progress.  
- **Django model testing** performed for backend reliability.  
- **Tailwind CSS** used for clean and responsive UI.  
- Designed to have **user accounts**, but due to limited development hours, this feature was not implemented.  

## Tech Stack

- Backend: **Django** (structured using [Lithium](https://github.com/lithium-dev) for better project organization)  
- Frontend: **React + TypeScript**  
- Styling: **Tailwind CSS**  
- API communication: **Axios**  

## Backend Setup

1. Make sure you have **Lithium installed** and **Python virtual environment** ready.  
2. Navigate to the backend folder:  
   ```bash
   cd backend
   uv sync
    uv run manage.py makemigrations
    uv run manage.py migrate
    uv run manage.py runserver


Frontend Setup

Navigate to the frontend folder:
    cd frontend 
    npm i
    npm run dev

The application was developed under limited hours, as I was pre occupied with something, so user accounts were not implemented.

The status bar is a custom feature showing task progress aside from the standard CRUD functionality.

Backend was structured using Lithium to maintain clean and organized Django apps.

Basic testing of Django models was performed to ensure data integrity.

I used corsheaders for security 