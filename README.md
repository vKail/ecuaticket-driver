# 🚗 EcuaTicket Driver

Application for drivers in the EcuaTicket ecosystem. Allows managing routes, validating passenger tickets, and tracking trips.

## 📋 Description

Mobile App designed specifically for interprovincial transport drivers. Facilitates ticket validation via QR scanning, management of assigned routes, and registration of boarded passengers developed as a PWA.

**Features:**

-   Ticket validation via QR
    
-   Assigned route management
    
-   Passenger registration
    
-   Real-time GPS tracking
    
-   Trip income summary
    
-   Assignment notifications
    

## 🛠️ Technologies

-   TypeScript
    
-   React Native
    
-   Zustand (state management)
    
-   TanStack Query
    
-   React Native Maps
    
-   QR Code Scanner
    

## 🚀 Installation

```
# Clone the repository
git clone [https://github.com/vKail/ecuaticket-driver.git](https://github.com/vKail/ecuaticket-driver.git)
cd ecuaticket-driver

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start server
npm run dev

```

## 📂 Project Structure

```
src/
├── core/
├── features/
│   ├── scanner/
│   │   ├── presentation/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── interfaces/
│   ├── routes/
│   └── tracking/
└── shared/

```

## 👥 Contributors

-   **Adrian Jurado** - [@vKail](https://github.com/vKail "null")
-   **Emilia Galarza** - [@Emi1213](https://github.com/Emi1213 "null")
-   **Sebastian Camino** - [@scaminom](https://github.com/scaminom "null")
