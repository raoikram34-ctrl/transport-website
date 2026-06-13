import { Truck, Shuffle, Snowflake, Box, Zap, Users } from "lucide-react";

export interface ServiceDetailType {
  id: string;
  title: string;
  shortDesc: string;
  iconName: "Truck" | "Shuffle" | "Snowflake" | "Box" | "Zap" | "Users";
  specs: { label: string; value: string }[];
  features: string[];
  // Expanded Content for Individual Detail Pages (referencing Tranzit Corp)
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
    id: "dry-van",
    title: "Dry Van (Full Truckload)",
    shortDesc: "High-security national point-to-point freight transit for standard non-perishable palletized goods utilizing modern air-ride 53ft trailers.",
    iconName: "Truck",
    specs: [
      { label: "Max Trailer Payload", value: "45,000 lbs" },
      { label: "Trailer Dimensions", value: "53' x 102\" x 110\"" },
      { label: "Transit Priority", value: "Dedicated Dispatch" }
    ],
    features: [
      "Custom Geofenced Routing",
      "Air-ride Suspension Systems",
      "TSA-vetted Solo & Team Drivers",
      "Integrated Electronic Seals"
    ],
    longDesc: "Skyhaul Transit LLC's fleet of premium Class 8 tractors and late-model 53' dry van trailers represents the ultimate standard in national cargo distribution. We coordinate secure, high-capacity dry cargo movements across major interstate corridors. By avoiding intermediate cross-dock touches, we minimize cargo handling, virtually eliminating standard damage and shifting risks.",
    cargoCapacity: "Up to 45,000 lbs gross payload depending on regional highway weight restrictions. Maximum double-stack capacity for up to 26 single-stacked or 52 double-stacked standard pallets.",
    equipmentStandard: "Aero-equipped DuraPlate trailers with logistics tracks spaced every 12 inches, equipped with interior cargo strap ratchets, secure heavy-duty aluminum ramp options, and integrated ELD tracking interfaces.",
    insuranceCoverage: "Standard Cargo Liability coverage up to $1,000,000 USD gross, with options for supplementary commodity waivers for highly sensitive electronics or dangerous hazmat material classes.",
    transitAdvantage: "Direct door-to-door transit lanes, omitting multi-terminal transfers to hit a proven 99.8% on-time logistics score.",
    typicalCommodities: ["Retail and Consumer Goods", "Paper Products", "Electronics & Appliances", "Building & Construction Materials", "Packaged Foodstuffs"],
    faq: [
      {
        q: "What security measures are implemented during transit?",
        a: "All dry van doors are secured with high-tensile steel security locks and serialized electronic seals. Drivers follow real-time route plans monitored by our central Chicago routing HQ."
      },
      {
        q: "Do you offer drop-and-hook trailer programs?",
        a: "Yes. For volume enterprise shippers, Skyhaul Transit LLC provisions trailer pools at shipping and receiving ports to maximize driver efficiency and eliminate dock delay fees."
      }
    ]
  },
  {
    id: "refrigerated",
    title: "Refrigerated / Cold Chain",
    shortDesc: "Strict temperature-guaranteed transit of frozen food, perishables, life-science pharmaceuticals, and organic chemical compounds.",
    iconName: "Snowflake",
    specs: [
      { label: "Controlled Temp Range", value: "-20°F to 78°F" },
      { label: "Reefer Telematics", value: "Continuous Smart Probe" },
      { label: "Standard Certification", value: "FDA Compliant" }
    ],
    features: [
      "Remote Setpoint Monitoring",
      "Pre-Cooling Sanitization",
      "Dual-Zone Temp Controls",
      "Pre-Trip Diagnostics"
    ],
    longDesc: "When transporting food, beverage, or bio-pharma assets, temperature deviation is not an option. Our climate-managed fleet relies on late-model Thermo King and Carrier refrigeration units with active satellite telemetry trackers. Dispatchers continuously survey ambient cargo environment indexes, ensuring temperature consistency from initial warehouse dock loading to receiver sign-off.",
    cargoCapacity: "Strictly limited to a maximize load of 42,500 lbs to compensate for the heavier on-board diesel-fueled refrigeration engines.",
    equipmentStandard: "Thermo King Precedent multi-temp systems, pristine insulated trailer walls, heavy-duty duct-distribution floors, and active interior sensor matrices.",
    insuranceCoverage: "Includes dedicated $1,000,000 cold-chain breakdown coverage, protecting shippers against mechanical compressor failure or thermal damage.",
    transitAdvantage: "Direct satellite warning systems integrated with driver warning lights to trigger rapid maintenance alerts.",
    typicalCommodities: ["Perishable Grocery and Meats", "Deep Frozen Foods", "Biopharmaceuticals & Vaccines", "Confectioneries", "Adhesives and Industrial Chemicals"],
    faq: [
      {
        q: "Can you provide temperature logs post-delivery?",
        a: "Absolutely. Active telematics continuously record internal trailer temperature scores every five minutes, presenting shippers with verified temperature histories upon delivery."
      },
      {
        q: "Are the trailers sanitized between load routes?",
        a: "We execute certified high-pressure hot water washouts and FDA-compliant chemical sanitization after every single refrigeration haul to avoid cross-contamination."
      }
    ]
  },
  {
    id: "flatbed",
    title: "Flatbed & Heavy Specialized",
    shortDesc: "Over-dimensional and heavy-machinery logistics involving step-decks, flatbeds, and RGN trailers managed by certified load-tie engineers.",
    iconName: "Box",
    specs: [
      { label: "Heavy Cargo Limit", value: "Up to 80,000+ lbs" },
      { label: "Trailer Variants", value: "Step-Deck, Flatbed, RGN" },
      { label: "Operations Permitting", value: "Full State Escort" }
    ],
    features: [
      "Rigid Tie-down Certifications",
      "Custom Tarping Services",
      "Oversize Load Escorts",
      "Heavy Ramping Gears"
    ],
    longDesc: "Heavy industrial freights require strategic infrastructure and deep specialized engineering. Skyhaul Transit LLC coordinate state permits, pilot vehicles, and structural loading paths for heavy machinery, steel pipes, raw construction beams, and aerospace assemblies. Drivers are highly qualified flatbed operators trained in advanced chain-and-binder tension physics and DOT securement rules.",
    cargoCapacity: "Depends strictly on trailer setup. Standard flatbeds handle up to 48,000 lbs. Multi-axle lowboys and Removable Gooseneck (RGN) setups handle heavy specialized cargos exceeding 80,000 lbs.",
    equipmentStandard: "Constructed of high-strength structural steel, utilizing air-ride step decks, sliding axles, outriggers for wide loads, heavy-duty chains, custom straps, and climate tarps.",
    insuranceCoverage: "Specialized load liability policies up to $2,500,000 USD to secure heavy manufacturing machinery and high-cost capital infrastructure pieces.",
    transitAdvantage: "Pre-cleared DOT state-level routes avoiding weight-restricted corridors, overhead clearance hazards, and construction zones.",
    typicalCommodities: ["Industrial Machinery and Turbines", "Steel Coils and Slabs", "Construction Excavators", "Wind Turbine Segments", "Pre-cast Concrete Pillars"],
    faq: [
      {
        q: "Is tarping included in flatbed freight quotes?",
        a: "We offer both basic standard strapping and premium full weather tarping options (choice of 4-foot or 8-foot lumber tarps) to preserve asset surfaces from rain and road salt."
      },
      {
        q: "Do you coordinate pilot cars and police escorts?",
        a: "Yes. Our heavy-haul logistics division manages permit acquisition, lane-restriction filings, pilot car booking, and municipal police escort logistics directly."
      }
    ]
  },
  {
    id: "logistics-brokerage",
    title: "Brokerage & Third-Party Logistics",
    shortDesc: "Scalable third-party logistics (3PL) solutions, utilizing a certified carrier network to absorb seasonal surge requirements easily.",
    iconName: "Shuffle",
    specs: [
      { label: "Partner Fleet Power", value: "5,000+ Vetted Carriers" },
      { label: "Safety Score Standard", value: "FMCSA 'Satisfactory'" },
      { label: "Quoting Speed", value: "Under 15 Minutes" }
    ],
    features: [
      "Rigid Quality Screening",
      "Electronic Status Milestones",
      "Spot & Contract Rates",
      "Dedicated Sourcing Staff"
    ],
    longDesc: "Sustain supply chain continuity when regional capacity tightens. Skyhaul Transit LLC's corporate brokerage office leverages an extensive database of 5,000+ rigorously vetted freight carriers across North America. We assume administrative overhead, confirm CDL records, examine insurance certifications, and manage transit milestones so your shipping team receives seamless logistics service.",
    cargoCapacity: "Fully custom. We source specialized equipment on-demand, including reefer tankers, hot shots, flatbed roll-offs, and multi-mode rail transport.",
    equipmentStandard: "Access to dry vans, climate-managed trailers, double-drop decks, straight trucks, and sprinters.",
    insuranceCoverage: "Skyhaul Transit LLC maintains absolute $100,000 contingent cargo insurance paired with broad carrier requirements matching $1M auto liability.",
    transitAdvantage: "Saves hours in dispatch, matching lane demands with regional backhaul carriers to secure rate savings for shippers.",
    typicalCommodities: ["FMCG Goods", "Seasonal Agriculture", "Automotive Parts", "Packaging Products", "E-commerce Inventories"],
    faq: [
      {
        q: "How do you screen third-party carriers?",
        a: "Only top-rated carriers pass our strict vetting process. We check Carrier411 reports, active DOT safety records, CSA score marks, and verify insurance limits directly."
      },
      {
        q: "How are shipping milestones tracked in brokerage?",
        a: "We synchronize load status using modern GPS check-in portals like Macropoint or Project44, maintaining status visibility for our shippers."
      }
    ]
  },
  {
    id: "dedicated-fleets",
    title: "Dedicated Fleet Outsourcing",
    shortDesc: "Establish reliable contract-locked capacity with dedicated tractor configurations and assigned drivers dedicated strictly to your shipping lanes.",
    iconName: "Users",
    specs: [
      { label: "Contract Basis", value: "1 - 3 Year SLAS" },
      { label: "Lanes Coverage", value: "Fixed Intrastate/Interstate" },
      { label: "Service Score Target", value: "99.9% Uptime SLA" }
    ],
    features: [
      "Custom Branded Equipment",
      "Assigned driver roster",
      "Fixed rate budgeting",
      "Lane volume prioritization"
    ],
    longDesc: "Corporate logistics requires absolute asset predictability. Outsourcing your fleet requirements to Skyhaul Transit LLC eliminates corporate capital liabilities, driver recruitment stresses, maintenance overheads, and regulatory compliance risks. We provision dedicated, late-model Class 8 assets dressed in your custom brand logos if requested, coupled with professional assigned driver teams.",
    cargoCapacity: "Fully dedicated trailer pool and custom specs. Equipment matches your specific warehouse dock heights, loading patterns, and heavy weight constraints.",
    equipmentStandard: "Custom branded, late-model trucks, with automatic lane-departure warnings, premium collision-braking, and smart telematics dashboards.",
    insuranceCoverage: "Fully integrated commercial fleet liability and structured umbrella protection matching standard Fortune 500 corporate frameworks.",
    transitAdvantage: "Fixed rate lane lockouts. Eliminate seasonal spot market pricing surges, guaranteeing budget predictability all year long.",
    typicalCommodities: ["High-Volume Retail Shipments", "Just-In-Time Automotive Coils", "Regional Industrial Shipments", "Enterprise Distribution Sweeps", "Inter-facility Goods"],
    faq: [
      {
        q: "Can we have our company logos printed on the trailers?",
        a: "Yes. For mutli-year corporate agreements, we wraps tractors and trailers with your enterprise brand style to serve as moving billboards."
      },
      {
        q: "What happens if a dedicated truck suffers a breakdown?",
        a: "Our contract guarantees backup truck allocation from our regional hubs within four hours, ensuring zero impact on your customer service scores."
      }
    ]
  },
  {
    id: "warehousing-distribution",
    title: "Warehousing & Cross-Docking",
    shortDesc: "Secure storage, physical product consolidation, transloading, and strategic cross-dock staging inside secure logistics hubs.",
    iconName: "Zap",
    specs: [
      { label: "Security Level", value: "24/7 CCTV & Geofencing" },
      { label: "Storage Options", value: "Rack, Floor, Ambient" },
      { label: "Transit Integration", value: "Direct Fleet Link" }
    ],
    features: [
      "Real-time Inventory Systems",
      "Rapid Cross-docking Staging",
      "Transloading Freight Goods",
      "LTL Cargo Consolidation"
    ],
    longDesc: "Support supply chain efficiency with secure, tech-enabled warehousing and physical cross-dock terminals. Strategically located within proximity of heavy interstate interchanges, our transfer points facilitate freight consolidation, transloading, and temporary holding. We move commodities off arriving trailers, reorganize inventory classes, and reload outgoing transport trucks cleanly within hours.",
    cargoCapacity: "Generous climate-safe pallet storing racks, heavy duty container loading yard access, and multi-bay door configurations.",
    equipmentStandard: "Forklift fleets with electronic scan guides, heavy overhead cranes, hydraulic leveling docks, and certified fire preservation systems.",
    insuranceCoverage: "Warehouseman’s Legal Liability coverage protecting stored freight goods against loss, structural damage, water, or smoke events.",
    transitAdvantage: "Combines warehousing with direct fleet haulage, letting logistics managers request rapid dispatch in minutes.",
    typicalCommodities: ["Stored E-commerce Goods", "Import/Export Transloads", "Staged Raw Materials", "Consolidated LTL Shipments", "Overflow Retail Overstocks"],
    faq: [
      {
        q: "What is your typical cross-dock processing speed?",
        a: "Most transload or cross-dock requests are completed in under 120 minutes. Incoming cargo gets sorted and loaded onto outbound fleets instantly."
      },
      {
        q: "Do you integrate with third-party WMS inventory systems?",
        a: "Yes. Our cloud-hosted inventory platform supports real-time EDI syncing and standard API data handshakes to maintain perfect logistics visibility."
      }
    ]
  }
];
