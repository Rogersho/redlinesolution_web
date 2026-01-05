import { Shield, Bell, Camera, GraduationCap, Wrench, FileCheck } from "lucide-react";

export const servicesData = [
    {
        id: "fire-fighting",
        title: "Fire Fighting Systems",
        icon: Shield,
        shortDescription: "Complete fire suppression solutions including hydrants, sprinklers, extinguishers, FM200, and aerosol systems.",
        fullDescription: "Our Fire Fighting Systems are designed to provide maximum protection for your property. We offer a comprehensive range of solutions including automatic sprinkler systems, fire hydrants, hose reels, and specialized gas suppression systems like FM200 and Aerosol. Our team ensures all installations meet international safety standards.",
        features: ["Automatic Sprinklers", "Fire Hydrants", "Gas Suppression (FM200)", "Fire Extinguishers", "24/7 Support"]
    },
    {
        id: "fire-alarm",
        title: "Fire Alarm & Detection",
        icon: Bell,
        shortDescription: "Advanced detection systems with motion sensors, smoke/heat detection, and centralized control panels.",
        fullDescription: "Early detection is key to preventing fire disasters. We install state-of-the-art fire alarm systems that include intelligent smoke detectors, heat sensors, and manual call points. Our addressable and conventional control panels provide precise location data for quick response.",
        features: ["Smoke Detection", "Heat Sensors", "Addressable Panels", "Remote Monitoring", "Integration with Security"]
    },
    {
        id: "security-systems",
        title: "Security Systems",
        icon: Camera,
        shortDescription: "Comprehensive security with CCTV, access control, intruder alarms, and cold room protection.",
        fullDescription: "Secure your premises with our integrated security solutions. From high-definition CCTV surveillance with remote viewing to strict access control systems and intruder alarms, we provide layers of security to protect your assets and personnel.",
        features: ["HD CCTV Cameras", "Biometric Access Control", "Intruder Alarms", "Perimeter Protection", "Mobile App Monitoring"]
    },
    {
        id: "safety-training",
        title: "Safety Training",
        icon: GraduationCap,
        shortDescription: "Professional training including fire drills, safety assessments, and compliance consultancy.",
        fullDescription: "Empower your team with the knowledge to handle emergencies. We provide certified training on fire safety awareness, first aid, and evacuation drills. Our consultancy services help you navigate local regulations and ensure full compliance.",
        features: ["Fire Audits", "Evacuation Drills", "First Aid Training", "Safety Certifications", "Risk Assessment"]
    },
    {
        id: "maintenance",
        title: "Maintenance Services",
        icon: Wrench,
        shortDescription: "Regular maintenance and servicing of all your fire and security equipment.",
        fullDescription: "Ensure your systems work when you need them most. We offer annual maintenance contracts (AMC) for fire alarms, extinguishers, and security systems. Our technicians perform rigorous testing and reporting to keep your equipment in peak condition.",
        features: ["Annual Maintenance Contracts", "Emergency Repairs", "System Testing", "Compliance Reporting", "Spare Parts Replacement"]
    },
    {
        id: "consultancy",
        title: "Consultancy & Compliance",
        icon: FileCheck,
        shortDescription: "Expert advice on building codes, safety standards, and risk management.",
        fullDescription: "Get expert advice on designing safe buildings. We work with architects and developers to design fire safety strategies that comply with Rwanda's building codes and international standards like NFPA and BS.",
        features: ["Building Code Compliance", "Fire Strategy Design", "Plan Approvals", "Safety Inspections", "Gap Analysis"]
    }
];
