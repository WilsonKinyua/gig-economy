import axios from 'axios';

// Fetch all gigs
export async function getAllGigs() {
  try {
    const response = await axios.get(
      'https://joinstartup.africa/api/v1/gigs?with=tags,user,mediafiles,faqs,categories,gigpricingplans,gigaddons'
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch gigs. Please try again later.');
  }
}
