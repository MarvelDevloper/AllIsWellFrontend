import api from './api';

export const contactService = {
  submitEnquiry: async (enquiryData) => {
    // { name, email, message }
    console.log(enquiryData)
    const response = await api.post('/contact/send', enquiryData);
    console.log(response.data)
    return response.data;
  }
};
