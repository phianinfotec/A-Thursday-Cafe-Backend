const dashboardService = require("../services/dashboard.service");

exports.getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardOverview();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCustomerDetails = async (req, res) => {
  try {
    const data = await dashboardService.getCustomerDetails(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Customer Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
 