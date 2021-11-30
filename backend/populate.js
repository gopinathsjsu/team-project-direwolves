const Booking =  require("../backend/model/Booking")
Booking.find({ userId: userId })
    .populate("userId", ["firstName", "lastName"])
    .populate("flightId", ["departureAirport","arrivalAirport"])
    .sort({ Time: "desc" })
    .then(booking => {
      
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(booking));
});