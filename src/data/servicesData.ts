import { Truck, Shuffle, Box, Layers, Zap, ShieldAlert } from "lucide-react";

export interface ServiceDetailType {
  id: string;
  title: string;
  shortDesc: string;
  iconName: "Truck" | "Shuffle" | "Box" | "Layers" | "Zap" | "ShieldAlert";
  specs: { label: string; value: string }[];
  features: string[];
  // Expanded Content for Individual Detail Pages
  longDesc: string;
  cargoCapacity: string;
  equipmentStandard: string;
  insuranceCoverage: string;
  transitAdvantage: string;
  typicalCommodities: string[];
  faq: { q: string; a: string }[];
}

export const SERVICES_DATA: ServiceDetailType[] = [
  {
    id: "full-truck-load-ftl",
    title: "Full Truckload (FTL)",
    shortDesc: "Optimize your supply chain with our dedicated full truckload services. Direct door-to-door transit utilizing a network of premium carriers.",
    iconName: "Truck",
    specs: [
      { label: "Max Payload", value: "45,000 lbs" },
      { label: "Equipment Type", value: "Dry Van, Flatbed, Reefer" },
      { label: "Transit Priority", value: "Dedicated Routing" }
    ],
    features: [
      "Dedicated Single-Sourced Capacity",
      "Real-Time GPS Tracking",
      "No Intermediate Handling",
      "Flexible Spot & Contract Rates"
    ],
    longDesc: "Optimize your logistics with our dedicated Full Truckload (FTL) services. We manage high-volume freight movements across major interstate corridors. By partnering with top-performing carriers, we guarantee reliable capacity, direct routing, and damage-free delivery for all major industries, avoiding cross-dock touches to minimize cargo shifting risks.",
    cargoCapacity: "Up to 45,000 lbs depending on equipment type and regional highway weight regulations. Supports up to 26 single-stacked or 52 double-stacked standard pallets.",
    equipmentStandard: "Late-model 53' dry vans, climate-controlled trailers, step decks, flatbeds, or RGN trailers equipped with advanced telematics.",
    insuranceCoverage: "Standard Cargo Liability up to $1,000,000 USD gross coverage, with options for supplementary high-value commodity waivers.",
    transitAdvantage: "Direct door-to-door transit lanes, omitting multi-terminal transfers to hit a proven 99.8% on-time logistics score.",
    typicalCommodities: ["Consumer Packaged Goods", "Retail Goods", "Electronics & Appliances", "Building Materials", "Automotive Parts"],
    faq: [
      {
        q: "What is the quoting turnaround time for FTL?",
        a: "We provide competitive spot and contract FTL rate quotes in under 15 minutes."
      },
      {
        q: "How is security maintained for high-value loads?",
        a: "All loads are secured with high-tensile steel security locks, sealed at origin, and tracked continuously using GPS telematics."
      }
    ]
  },
  {
    id: "less-than-truck-load-ltl",
    title: "Less Than Truckload (LTL)",
    shortDesc: "Cost-effective shipping for smaller freight shipments. Maximize shipping efficiency by consolidating your cargo into optimized routing channels.",
    iconName: "Shuffle",
    specs: [
      { label: "Pricing Basis", value: "NMFC Class & Weight" },
      { label: "Service Model", value: "Hub-and-Spoke Network" },
      { label: "Transit Focus", value: "Cost Optimization" }
    ],
    features: [
      "Consolidated Rate Savings",
      "Accessorial Services (Liftgate)",
      "Electronic NMFC Class Guidance",
      "Cross-dock Staging Integration"
    ],
    longDesc: "Our Less-Than-Truckload (LTL) services are designed to maximize shipping efficiency for smaller freight classes. We consolidate shipments from multiple shippers into optimized carrier lanes, significantly lowering individual transport costs while maintaining reliable transit schedules across North America.",
    cargoCapacity: "Typically designed for shipments ranging from 150 lbs up to 15,000 lbs, or occupying up to 6 standard pallets.",
    equipmentStandard: "Standard enclosed trailers equipped with hydraulic liftgates, pallet jacks, logistics tracks, and heavy-duty cargo straps.",
    insuranceCoverage: "Carried under standard carrier liability based on NMFC class definitions, with simple supplementary insurance options.",
    transitAdvantage: "Access to regional and national LTL carriers, ensuring reliable coverage even in tight capacity markets.",
    typicalCommodities: ["Retail Stock Shipments", "Small Industrial Machinery", "Packaged Goods", "E-commerce Logistics Inventory"],
    faq: [
      {
        q: "How is LTL freight class determined?",
        a: "Freight class is based on density, stowability, handling ease, and liability value according to NMFC standards."
      },
      {
        q: "Do you provide liftgate services for pickups?",
        a: "Yes, liftgate services can be requested for pickups and deliveries at facilities without a standard loading dock."
      }
    ]
  },
  {
    id: "dry-van",
    title: "Dry Van Shipping",
    shortDesc: "High-security national point-to-point freight transit for standard non-perishable palletized goods utilizing modern 53ft trailers.",
    iconName: "Box",
    specs: [
      { label: "Trailer Dimensions", value: "53' x 102\" x 110\"" },
      { label: "Door Style", value: "Swing or Roll-up Doors" },
      { label: "Max Volume", value: "Up to 26 Standard Pallets" }
    ],
    features: [
      "Weatherproof Enclosure",
      "Air-ride Suspension Systems",
      "Drop-and-Hook Trailer Pools",
      "Versatile Loading Formats"
    ],
    longDesc: "Dry Van shipping is the backbone of highway freight. We coordinate secure, high-capacity dry cargo movements using late-model 53ft trailers. Ideal for retail, commercial, and industrial goods needing protection from the elements, our dry van services provide high reliability at competitive market rates.",
    cargoCapacity: "Gross payload capacity up to 45,000 lbs depending on trailer configuration and highway weight restrictions.",
    equipmentStandard: "Aero-equipped DuraPlate dry vans with clean wood floors, logistics tracks spaced every 12 inches, and durable locking rods.",
    insuranceCoverage: "Standard Cargo Liability up to $1,000,000 USD gross coverage.",
    transitAdvantage: "Direct point-to-point lanes to hit a proven on-time logistics score.",
    typicalCommodities: ["Retail and Consumer Goods", "Paper Products", "Electronics & Appliances", "Building Materials", "Packaged Foodstuffs"],
    faq: [
      {
        q: "What is drop-and-hook dry van service?",
        a: "We leave empty trailers at your facility for loading at your convenience, allowing drivers to quickly swap loaded trailers and avoid dock delays."
      },
      {
        q: "Are your trailers dry and clean?",
        a: "Yes, all trailers are inspected for leaks, holes, and debris prior to dispatch."
      }
    ]
  },
  {
    id: "drayage",
    title: "Port & Rail Drayage",
    shortDesc: "Efficient short-distance shipping connecting ports, rail ramps, and local distribution warehouses with TWIC-certified drivers.",
    iconName: "Layers",
    specs: [
      { label: "Service Focus", value: "Intermodal Container Transfer" },
      { label: "Turnaround Speed", value: "Sameday / Nextday Delivery" },
      { label: "Coverage", value: "All Major Ports & Ramps" }
    ],
    features: [
      "Chassis Options (Tri-axle)",
      "Demurrage Avoidance Scheduling",
      "TWIC-certified Drivers",
      "Overweight Permit Services"
    ],
    longDesc: "Navigate intermodal shipping with our specialized drayage services. We bridge the gap between ocean ports, inland rail terminals, and regional distribution centers. Our TWIC-compliant carrier network ensures rapid container pickup, minimizing costly port demurrage and detention fees.",
    cargoCapacity: "Standard 20ft, 40ft, and 45ft intermodal container payloads up to maximum highway weight limits.",
    equipmentStandard: "Standard and specialized container chassis, including tri-axle chassis for heavy intermodal loads.",
    insuranceCoverage: "Intermodal liability coverage including UIIA compliant bonds and container damage insurance.",
    transitAdvantage: "Real-time container tracking and port terminal status updates to coordinate swift transport schedules.",
    typicalCommodities: ["Import/Export Cargo", "Industrial Machinery", "Bulk Retail Goods", "Agricultural Produce"],
    faq: [
      {
        q: "What is demurrage?",
        a: "Demurrage is a fee charged by port terminals when a container remains on-site past the allowed free time. We schedule prompt pickups to avoid this fee."
      },
      {
        q: "Do your drivers have TWIC cards?",
        a: "Yes, our drayage drivers hold Transportation Worker Identification Credentials (TWIC) for secure port access."
      }
    ]
  },
  {
    id: "step-deck",
    title: "Step Deck & Flatbed",
    shortDesc: "Specialized flatbed transport for over-dimensional cargo, construction materials, and heavy industrial machinery.",
    iconName: "Zap",
    specs: [
      { label: "Trailer Types", value: "Flatbed, Step Deck, RGN" },
      { label: "Permitting Scope", value: "State & County Permits" },
      { label: "Max Weight Class", value: "Up to 80,000+ lbs" }
    ],
    features: [
      "Over-Dimensional Load Permitting",
      "Pilot Car & Escort Coordination",
      "Heavy Tarping & Securing",
      "Lowboy & RGN Loading Options"
    ],
    longDesc: "Transporting heavy industrial equipment requires specialized machinery and permitting. Our Step Deck and Flatbed services are managed by logistics engineers who plan routes, secure permits, and arrange escorts. We ensure your oversized turbines, tractors, or raw materials are securely tied and safely transported.",
    cargoCapacity: "Standard flatbed capacity up to 48,000 lbs. Step decks and multi-axle Removable Gooseneck (RGN) setups can support loads exceeding 80,000 lbs.",
    equipmentStandard: "High-tensile steel flatbeds, step decks, outriggers, heavy-duty chains, custom straps, and weather-resistant lumber tarps.",
    insuranceCoverage: "Enhanced cargo liability up to $2,500,000 USD to cover high-value capital assets.",
    transitAdvantage: "Pre-cleared routing that avoids restricted state highways, low bridges, and construction hazards.",
    typicalCommodities: ["Construction Machinery", "Steel Pipes", "Wind Turbine Blades", "Industrial Generators"],
    faq: [
      {
        q: "What is the height limit for step deck trailers?",
        a: "Step deck trailers sit lower than standard flatbeds, allowing transport of cargo up to 10 feet 2 inches tall without requiring special permits."
      },
      {
        q: "Do you provide tarps for flatbed loads?",
        a: "Yes, we offer standard strapping as well as full Lumber or Steel weather-tarping to protect your cargo."
      }
    ]
  },
  {
    id: "hazmat",
    title: "Hazmat Shipping",
    shortDesc: "Certified and fully compliant shipping of hazardous materials, regulated chemical compounds, and sensitive materials.",
    iconName: "ShieldAlert",
    specs: [
      { label: "Regulations Info", value: "PHMSA & DOT Compliant" },
      { label: "Safety Standards", value: "Carrier Vetting Required" },
      { label: "Emergency Protocol", value: "24/7 Monitoring" }
    ],
    features: [
      "Certified Hazmat Carriers",
      "Strict Category Validation",
      "Continuous Route Verification",
      "Hazardous Placard Inspections"
    ],
    longDesc: "Safety and compliance are paramount when shipping hazardous materials. Our Hazmat logistics services ensure full compliance with DOT and PHMSA regulations. We connect you with certified carriers trained to handle dangerous goods, chemical substances, and flammable or corrosive cargo safely.",
    cargoCapacity: "Varies based on chemical class and containment guidelines, up to maximum vehicle gross weight.",
    equipmentStandard: "Hazmat placard-ready trailers, specialized spill containment kits, and continuous telematics monitoring.",
    insuranceCoverage: "Hazmat-specific liability coverage, including environmental cleanup and pollution liability.",
    transitAdvantage: "Vetted routes that bypass restricted urban areas and waterways, ensuring safe and legally compliant transit.",
    typicalCommodities: ["Industrial Chemicals", "Adhesives & Coatings", "Batteries & Cells", "Flammable Liquids", "Agricultural Fertilizers"],
    faq: [
      {
        q: "What classes of hazmat do you transport?",
        a: "We coordinate shipping for classes 2, 3, 4, 5, 6, 8, and 9. We do not transport class 1 (explosives) or class 7 (radioactive)."
      },
      {
        q: "What documentation is needed for Hazmat?",
        a: "Shippers must provide a complete Safety Data Sheet (SDS) and accurate shipping papers detailing placard requirements."
      }
    ]
  }
];
