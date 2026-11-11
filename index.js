const fs = require("fs");
const readline = require("readline");

const character = JSON.parse(
  fs.readFileSync("./config/character.json", "utf8")
);

const messages = JSON.parse(
  fs.readFileSync("./data/messages.json", "utf8")
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function randomMessage(category) {
  const list = messages[category];

  if (!list || list.length === 0) {
    return "Ehehe, Arona belum punya pesan untuk itu!";
  }

  return list[Math.floor(Math.random() * list.length)];
}

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 15) return "afternoon";
  if (hour >= 15 && hour < 18) return "random";
  return "night";
}

function respond(input) {
  const text = input.toLowerCase().trim();

  if (!text) return "Arona sedang mendengarkan!";

  if (text === "/bantuan") {
    return [
      "Perintah yang bisa kamu gunakan:",
      "/pagi - Ucapan pagi",
      "/siang - Ucapan siang",
      "/malam - Ucapan malam",
      "/random - Pesan random",
      "/semangat - Pesan penyemangat",
      "/ultah [nama] - Ucapan ulang tahun",
      "/keluar - Menutup Arona"
    ].join("\n");
  }

  if (text === "/pagi") return randomMessage("morning");
  if (text === "/siang") return randomMessage("afternoon");
  if (text === "/malam") return randomMessage("night");
  if (text === "/random") return randomMessage("random");
  if (text === "/semangat") return randomMessage("encouragement");

  if (text.startsWith("/ultah")) {
    const name = input.trim().split(/\s+/).slice(1).join(" ") || "Teman";
    return randomMessage("birthday").replaceAll("{name}", name);
  }

  if (text.includes("halo") || text.includes("hai")) {
    return "Haloooo! Arona di sini! Ada yang bisa Arona bantu?";
  }

  if (text.includes("terima kasih") || text.includes("makasih")) {
    return "Ehehe, sama-sama! Senang bisa membantu!";
  }

  if (text.includes("bosan")) {
    return "Lagi bosan? Mau Arona temani ngobrol?";
  }

  if (text.includes("sedih")) {
    return "Jangan memaksakan diri, ya. Kalau mau cerita, Arona siap mendengarkan.";
  }

  return randomMessage("random");
}

console.log("================================");
console.log(`   ${character.name} BOT`);
console.log("================================");
console.log("Halo! Arona sudah siap menemanimu!");
console.log(`Kepribadian: ${character.personality.join(", ")}`);
console.log("Ketik /bantuan untuk melihat perintah.");
console.log("================================\n");

console.log("Arona: " + randomMessage(getTimeGreeting()));

rl.setPrompt("Kamu: ");
rl.prompt();

rl.on("line", (input) => {
  if (input.trim().toLowerCase() === "/keluar") {
    console.log("\nArona: Sampai jumpa lagi! Jangan lupa istirahat, ya!");
    rl.close();
    return;
  }

  console.log("\nArona: " + respond(input) + "\n");
  rl.prompt();
});

rl.on("close", () => {
  console.log("Arona offline.");
  process.exit(0);
});
