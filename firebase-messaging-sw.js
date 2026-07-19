// firebase-messaging-sw.js
// এই ফাইলটা index.html এর ঠিক পাশেই (একই root ফোল্ডারে) রাখতে হবে — সাবফোল্ডারে রাখা যাবে না।
// অ্যাপ বন্ধ থাকলে বা ফোন লক থাকলেও এই ফাইলটাই ব্যাকগ্রাউন্ডে নোটিফিকেশন দেখায়।

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// index.html এ থাকা firebaseConfig এর সাথে হুবহু মিলিয়ে দিন
firebase.initializeApp({
    apiKey: "AIzaSyCux18LXBJW7qGF-fykIP7yEBko1_hmRBI",
    authDomain: "live-tv-admin-panel-366ce.firebaseapp.com",
    projectId: "live-tv-admin-panel-366ce",
    storageBucket: "live-tv-admin-panel-366ce.firebasestorage.app",
    messagingSenderId: "593711709165",
    appId: "1:593711709165:web:7de95cc0e6f2b8da3dc5e4"
});

const messaging = firebase.messaging();

// অ্যাপ বন্ধ থাকলে / ব্যাকগ্রাউন্ডে থাকলে নোটিফিকেশন দেখানোর জন্য
messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || "Neon Live TV";
    const options = {
        body: (payload.notification && payload.notification.body) || "",
        icon: "/icon-192.png",   // আপনার অ্যাপ আইকনের path দিয়ে বদলে নিন (না থাকলে বাদ দিলেও চলবে)
        badge: "/icon-192.png",
        data: { click_action: (payload.data && payload.data.click_action) || "/" }
    };
    self.registration.showNotification(title, options);
});

// নোটিফিকেশনে ট্যাপ করলে অ্যাপ খুলে যাবে
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.click_action) || "/";
    event.waitUntil(clients.openWindow(url));
});