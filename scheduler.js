const cron = require("node-cron");

function startScheduler(bot) {
  // Pagi - 07.00 WIB
    cron.schedule("0 7 * * *", () => {
        bot("morning");
          }, {
              timezone: "Asia/Jakarta"
                });

                  // Siang - 12.00 WIB
                    cron.schedule("0 12 * * *", () => {
                        bot("afternoon");
                          }, {
                              timezone: "Asia/Jakarta"
                                });

                                  // Malam - 20.00 WIB
                                    cron.schedule("0 20 * * *", () => {
                                        bot("night");
                                          }, {
                                              timezone: "Asia/Jakarta"
                                                });

                                                  console.log("Jadwal Arona berhasil diaktifkan!");
                                                  }

                                                  module.exports = startScheduler;