FleetTrack AI - Transport Fleet Logistics and OCR Efficiency System
This project solves a real-world logistics problem: auditing fuel expenses in transport fleets. Instead of forcing administrators to manually check hundreds of paper receipts, this platform uses an AI-driven OCR pipeline to extract invoice data, run automated mathematical validation checks, and instantly surface anomalies on a real-time dashboard.

This repository hosts the React and TypeScript frontend, designed for type-safety, fluid user experience, and real-time data streaming.

Tech Stack
Frontend: React 18, TypeScript, Tailwind CSS

State Management and Data Fetching: Zustand / TanStack Query (React Query)

Charts: Recharts (optimized for responsive rendering)

Backend (For reference): Node.js/NestJS or Python/FastAPI + PostgreSQL

Architecture and How It Works
The application handles a decoupled, asynchronous flow to keep the user experience seamless:

The Upload: A driver takes a picture of a gas station receipt from their phone. The TypeScript frontend validates the file type/size and uploads it.

Background Processing: To avoid locking up the UI, the backend offloads the image processing to a task queue. The frontend shifts into a processing state without freezing.

AI/OCR Extraction: The AI model parses the image to extract Date, Liters, Total Cost, and Vendor Name.

The Validation Engine: The core business logic kicks in. The system calculates vehicle efficiency (km/liter) and runs an automated math audit.

Real-Time Sync: Once processed, the data is pushed to the Admin Dashboard, dynamically updating the charts.

Engineering Challenges and Solved Problems
When building a project like this, the real world throws edge cases at you. Here is how I tackled them:

1. The Hallucinating OCR Problem (Validation Engine)
OCR engines are not perfect. They can misread numbers or misplace decimal points. To catch this, I implemented a strict mathematical cross-check algorithm.

The system checks if Liters multiplied by Cost per Liter equals the Total Cost, allowing for minor rounding tolerances. It also cross-checks if the extracted liters exceed the truck's maximum tank capacity.

If the math does not add up, the record is not rejected; instead, TypeScript types map it to a strict AuditStatus.Discrepancy state, flagging it on the admin panel for manual review.

2. Strict Type Safety for Unpredictable AI Payloads
AI and OCR responses can sometimes return partial or malformed data. Using TypeScript, I built rigid interfaces and type guards to handle every possible state (Pending, Approved, Discrepancy) without causing the UI to crash with undefined errors.

Database Schema Design (Relational SQL)
To understand how the data interacts, here is the relational model supporting the frontend:

Vehicles: id, plate_number, model, tank_capacity_liters, current_odometer_km.

Drivers: id, name, national_id, assigned_vehicle_id.

FuelLogs: id, vehicle_id, driver_id, date, liters_loaded, total_cost, odometer_at_registration_km, receipt_image_url, audit_status (Approved / Discrepancy / Pending).
