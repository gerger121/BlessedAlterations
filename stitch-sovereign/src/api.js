const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://blessedalterations.onrender.com/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Appointments
  async createAppointment(appointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async getAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/appointments${queryString ? `?${queryString}` : ''}`);
  }

  async getAppointment(id) {
    return this.request(`/appointments/${id}`);
  }

  async updateAppointmentStatus(id, status) {
    return this.request(`/appointments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteAppointment(id) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Messages
  async sendContactMessage(messageData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async getContactMessages(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/contact${queryString ? `?${queryString}` : ''}`);
  }

  async markMessageAsRead(id) {
    return this.request(`/contact/${id}/read`, {
      method: 'PATCH',
    });
  }

  async deleteContactMessage(id) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // Price Estimates
  async saveEstimate(estimateData) {
    return this.request('/estimates', {
      method: 'POST',
      body: JSON.stringify(estimateData),
    });
  }

  async getPricing() {
    return this.request('/pricing');
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  // Stats (Admin)
  async getStats() {
    return this.request('/stats');
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }
}

export const api = new ApiService();
export default api;
