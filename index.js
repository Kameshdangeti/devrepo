const admin = require("firebase-admin");
const {
    initializeApp,
    applicationDefault,
    cert,
} = require("firebase-admin/app");
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
    connectFirestoreEmulator,
} = require("firebase-admin/firestore");

async function fun() {
    var serviceAccount = require("./test-123-e974d-firebase-adminsdk-4pait-255cf30911.json");
    initializeApp({
        credential: admin.credential.cert(serviceAccount),
        
    });
    const dateTime = Date.now().toString();

    let db = null;
    db = getFirestore();
    const docRef = db.collection("users").doc(dateTime);

    let snapshot;

    docRef.set({
        first: dateTime,
        last: "B",
        born: 1815,
    }, { merge: true }).then(async () => {
        console.log(dateTime + ' insert completed');
        snapshot = await docRef.get();
        let born = snapshot.data().born;
        console.log('born ' + born);
        while (true) {
            born = born + 1;
            console.log('incrementing born value to new value ' + born);
            await docRef.update({ born });
            await new Promise((resolve) => setTimeout(resolve, 20000));
        }
    }).catch(() => {
        console.log(`$dateTime insert failed`);
    });
}

fun().then(() => {
    console.log("completed");
});
