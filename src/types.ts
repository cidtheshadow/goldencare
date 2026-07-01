export type CareType = 
  | "In-home personal care"
  | "Nursing / skilled medical care"
  | "Companionship and social engagement"
  | "Physiotherapy / rehabilitation support"
  | "Medical escort"
  | "Adult day care"
  | "Post-operative care";

export interface Service {
  id: string;
  title: CareType;
  description: string;
  icon: any; // We will use lucide-react icons
}

export interface ConsultationRequest {
  id: string;
  patientName: string;
  contactName: string;
  phone: string;
  email: string;
  preferredDate: string;
  serviceNeeded: CareType | "Not sure yet";
  city: string;
  notes?: string;
  status: "pending" | "contacted" | "scheduled";
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  content: string;
  rating: number;
}
