const API_BASE_URL = 'https://localhost:5001/api'; // Replace with your backend URL

const AttendanceService = {
  getAttendanceRecords: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Attendance/GetAllAttendances`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Error fetching attendance records. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error fetching attendance records: ' + error.message);
    }
  },

  updateAttendanceRecord: async (updatedRecord) => {
    try {
      // Format date fields as ISO strings
      updatedRecord.checkInTime = new Date(updatedRecord.checkInTime).toISOString();
      updatedRecord.checkOutTime = new Date(updatedRecord.checkOutTime).toISOString();

      const response = await fetch(`${API_BASE_URL}/Attendance/UpdateAttendanceRecord/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Error updating attendance record. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error updating attendance record: ' + error.message);
    }
  },

  deleteAttendanceRecord: async (recordId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Attendance/DeleteAttendanceRecord/${recordId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return true; // Deletion successful
      } else {
        throw new Error(`Error deleting attendance record. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error deleting attendance record: ' + error.message);
    }
  }
};

export default AttendanceService;
