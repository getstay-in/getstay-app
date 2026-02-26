export interface CityFAQ {
  question: string;
  answer: string;
}

export const getBhopalFAQs = (): CityFAQ[] => [
  {
    question: "What is the average cost of a hostel in Bhopal?",
    answer: "Hostels in Bhopal typically range from ₹4,500 to ₹8,000 per month depending on the location, amenities, and sharing type. Single sharing rooms cost more (₹7,000-₹8,000), while 2-3 sharing options are more affordable (₹4,500-₹6,000). Most hostels include basic amenities like WiFi, food, and electricity in the rent."
  },
  {
    question: "Are there safe girls hostels in Bhopal?",
    answer: "Yes, Bhopal has many verified girls hostels with 24/7 security, CCTV surveillance, and female wardens. Popular areas for girls hostels include MP Nagar, Kolar Road, and areas near MANIT. All hostels listed on GetStay are verified for safety and security measures."
  },
  {
    question: "Which area is best for hostels in Bhopal?",
    answer: "MP Nagar, Kolar Road, and areas near MANIT are the most popular for hostels in Bhopal. MP Nagar offers excellent connectivity and commercial facilities, while areas near MANIT are preferred by engineering students. Kolar Road is known for affordable options with good transport links."
  },
  {
    question: "Do hostels in Bhopal provide food?",
    answer: "Most hostels in Bhopal offer meal plans with options for vegetarian and non-vegetarian food. Typically, hostels provide 2-3 meals per day (breakfast, lunch, and dinner). Some hostels also offer flexible meal plans where you can opt for specific meals. The food is usually homely and hygienic."
  },
  {
    question: "What amenities are included in Bhopal hostels?",
    answer: "Common amenities in Bhopal hostels include WiFi, food (2-3 meals), electricity backup, hot water (geyser), laundry facilities, common room/TV, and 24/7 security. Premium hostels may also offer AC rooms, gym facilities, study rooms, and recreational areas. All basic amenities are typically included in the monthly rent."
  },
  {
    question: "How do I book a hostel in Bhopal?",
    answer: "You can book a hostel in Bhopal through GetStay by browsing available options, checking amenities and prices, and contacting the hostel directly. We recommend scheduling a visit to see the hostel in person before making a final decision. Most hostels require a security deposit (usually 1-2 months rent) and advance payment for the first month."
  },
  {
    question: "Are there hostels near MANIT Bhopal?",
    answer: "Yes, there are several hostels located near MANIT (Maulana Azad National Institute of Technology) Bhopal. These hostels are popular among engineering students and offer easy access to the campus. The area has good connectivity and essential facilities like shops, restaurants, and medical stores."
  },
  {
    question: "Can I get a single room in a Bhopal hostel?",
    answer: "Yes, many hostels in Bhopal offer single occupancy rooms, though they cost more than shared accommodations. Single rooms typically range from ₹7,000 to ₹8,000 per month. If you prefer privacy and can afford the higher rent, single rooms are a good option with all amenities included."
  },
  {
    question: "What is the difference between a hostel and PG in Bhopal?",
    answer: "In Bhopal, hostels and PGs are quite similar. Both offer accommodation with food and basic amenities. However, hostels typically have more structured rules, fixed meal times, and common facilities. PGs may offer more flexibility in terms of timings and rules. The terms are often used interchangeably in Bhopal."
  },
  {
    question: "Are there AC hostels in Bhopal?",
    answer: "Yes, several hostels in Bhopal offer AC rooms, especially in premium locations like MP Nagar. AC rooms cost approximately ₹1,000-₹2,000 more per month than non-AC rooms. During Bhopal's hot summer months (April-June), AC rooms are highly preferred. Some hostels also offer the option to upgrade to AC rooms."
  },
  {
    question: "What documents are required to book a hostel in Bhopal?",
    answer: "To book a hostel in Bhopal, you typically need: Aadhar card, college/office ID proof, passport-size photographs, and a local guardian's contact details. Some hostels may also ask for a police verification form. It's advisable to keep photocopies of all documents ready when visiting hostels."
  },
  {
    question: "Is WiFi available in Bhopal hostels?",
    answer: "Yes, most modern hostels in Bhopal provide WiFi connectivity as a standard amenity. The internet speed is usually sufficient for online classes, browsing, and streaming. Some premium hostels offer high-speed WiFi with dedicated connections. WiFi is typically included in the monthly rent without additional charges."
  },
  {
    question: "Are there hostels near Bhopal Railway Station?",
    answer: "Yes, there are several hostels located near Bhopal Railway Station, offering convenient access for students and working professionals who travel frequently. These hostels are well-connected to other parts of the city via local transport. The area has good availability of essential services and facilities."
  },
  {
    question: "What is the notice period for leaving a hostel in Bhopal?",
    answer: "Most hostels in Bhopal require a notice period of 1 month before vacating. Some hostels may have a 15-day notice period. The security deposit is usually refunded after deducting any dues or damages. It's important to read the hostel agreement carefully to understand the notice period and refund policy."
  },
  {
    question: "Are there co-ed hostels in Bhopal?",
    answer: "While most hostels in Bhopal are gender-specific (boys or girls only), there are a few co-ed hostels available, particularly in areas like MP Nagar. Co-ed hostels have separate floors or wings for boys and girls with strict security measures. These are popular among working professionals and postgraduate students."
  }
];

export const getGenericCityFAQs = (cityName: string): CityFAQ[] => [
  {
    question: `What is the average cost of a hostel in ${cityName}?`,
    answer: `Hostels in ${cityName} typically range from ₹4,000 to ₹8,000 per month depending on the location, amenities, and sharing type. Prices vary based on factors like proximity to educational institutions, included amenities, and room type.`
  },
  {
    question: `Are there safe hostels for girls in ${cityName}?`,
    answer: `Yes, ${cityName} has verified hostels for girls with proper security measures including CCTV surveillance, security guards, and female wardens. All hostels listed on GetStay are verified for safety and security.`
  },
  {
    question: `Do hostels in ${cityName} provide food?`,
    answer: `Most hostels in ${cityName} offer meal plans with vegetarian and non-vegetarian options. Typically, hostels provide 2-3 meals per day. Some hostels also offer flexible meal plans.`
  },
  {
    question: `What amenities are included in ${cityName} hostels?`,
    answer: `Common amenities include WiFi, food, electricity backup, hot water, laundry facilities, and 24/7 security. Premium hostels may also offer AC rooms, gym facilities, and study rooms.`
  },
  {
    question: `How do I book a hostel in ${cityName}?`,
    answer: `You can book a hostel through GetStay by browsing available options, checking amenities and prices, and contacting the hostel directly. We recommend scheduling a visit before making a final decision.`
  }
];

export const getCityFAQs = (cityName: string): CityFAQ[] => {
  if (cityName.toLowerCase() === 'bhopal') {
    return getBhopalFAQs();
  }
  return getGenericCityFAQs(cityName);
};
