//Summary

exports.summary = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: `Welcome to the Dashboard Mr.${user.firstName}`,
      user: user, // Send the user data
    });
  } catch (error) {
    console.error("Error in summary controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

//Profile
