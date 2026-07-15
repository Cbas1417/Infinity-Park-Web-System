# Infinity Park Airport Parking and Concierge Platform

Infinity Park is an enterprise-grade software ecosystem designed to streamline and scale valet airport parking and luxury concierge operations. Initially optimized for Amsterdam Airport Schiphol (AMS), the platform's modular architecture is built for rapid deployment and multi-tenant expansion across major European airports. The entire ecosystem utilizes a single, centralized API that orchestrates three interconnected products tailored for clients, administrators, and field operators.

The project is structured around a central API that serves a public web application, an administrative dashboard, and a specialized mobile application for field operators. This centralized backend architecture ensures data consistency, real-time synchronization, and high availability across all operational touchpoints.

## Public Web Application

The public web application is an SEO-optimized, highly responsive web portal designed to maximize conversion rates and deliver an effortless booking experience for the end consumer. It features a dynamic multi-step checkout flow that supports service packages such as Basic, Travel Clean, VIP Return, and Love Arrival, along with flight selection and add-on scheduling.

The application is built with Progressive Web App (PWA) capabilities, making it fully installable on mobile devices with offline-ready landing pages. It includes native multi-language support for English, Dutch, and Spanish, with an easily extensible localization framework. For payments, it integrates securely with Mollie to support European payment standards, including iDEAL, credit/debit cards, and mobile wallets. Customers also have access to a secure personal dashboard where they can manage vehicle profiles, view booking history, and download automated VAT invoices.

## Administrative Dashboard

The administrative dashboard serves as the operational brain of Infinity Park, enabling real-time command and control over daily airport logistics and business administration. It features a comprehensive booking and dispatch control interface where operators can manually or automatically assign reservations to available drivers based on workload and location.

The dashboard includes a no-code catalog management tool that allows administrators to update pricing tiers, service options, terminal configurations, and seasonal rates instantly without modifying code. Real-time flight tracking is integrated directly into the system, allowing the operational team to monitor delays and automatically adjust valet pickup and drop-off times. Additionally, the admin panel handles automated transactional flows, generating PDF invoices instantly upon booking completion, and provides business intelligence metrics to track revenue, average order value, and parking bay occupancy rates.

## Operator Mobile Application

The operator mobile application is a rugged, offline-first mobile app designed specifically for valets, drivers, and detailing personnel working on the ground. It provides each operator with a personalized daily task sheet updated in real-time based on dispatcher assignments.

To ensure quality control and liability protection, the app features a digital vehicle inspection checklist that guides drivers through intake and release protocols. This includes capturing time-stamped, multi-angle photos of the vehicle to document its condition, as well as logging key telemetry data such as mileage, fuel levels, and specific parking bay coordinates. To withstand airport environments with limited connectivity, the application uses local database storage, enabling full offline functionality and automatic data synchronization once a network connection is re-established.

## Third-Party Integrations

The platform relies on a best-of-breed integration architecture to automate notifications, tracking, and compliance. Payments are processed through the Mollie API to ensure secure, multi-currency transactions across Europe. Real-time flight status and terminal schedules are synchronized using the AeroDataBox API.

Automated client communications, such as booking confirmations and driver arrival alerts, are dispatched via the WhatsApp Business API. High-resolution vehicle inspection photos are stored securely using cloud-based object storage services like AWS S3 or Cloudflare R2. Transactional emails, including automated PDF invoice delivery and system notifications, are handled by Resend or Postmark.

## Getting Started

To set up the project locally, ensure you have Node.js version 18 or higher, Docker, and PostgreSQL version 15 or higher installed on your system.

First, clone the repository to your local machine and navigate into the project directory. Run the package manager installation command to retrieve all necessary dependencies. Next, copy the example environment file to create your own configuration file, and populate it with your specific API keys for Mollie, AeroDataBox, and your chosen cloud storage provider. Finally, execute the development database migrations and start the local development server to run the API and client applications.

## License

This project is licensed under the MIT License. Please refer to the LICENSE file in the repository root for more details.
