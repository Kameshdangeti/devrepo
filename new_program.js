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
        credential: admin.credential.cert(serviceAccount)
    });
    // get the connection to the firestore database
    let db = null;
    db = getFirestore();
    // let us give a nave to the collection  we want to create
    const name_of_collection = "test_collections";
    // lets us give a name to the document we want to create
    const name_of_document_01 = "doc_01";
    // create a document reference first, and then we can save it later
    const document_01_reference = db.collection(name_of_collection).doc(name_of_document_01);
    // but we need a document to save into the collection. let us create a document with just one field.
    const fieldvalue01 = "a string value";
    const fieldvalue04 = [1, 2, 3, 4, 5];
    let document_01 = {};
    document_01['field_01'] = fieldvalue01;                               
    document_01['field_02'] = 1234;
    document_01['field_03'] = true;
    document_01['field_04'] = fieldvalue04;
    const map1 = {};
    map1["key_1"] = "any thing";
    map1["key_2"] = true;
    document_01['field_05'] = map1;
    const currentDate = new Date();
    const firestoreTimestamp = Timestamp.fromDate(currentDate);
    // Add the timestamp to a Firestore document
    document_01['field_06'] = firestoreTimestamp;
    document_01['field_07'] = null;
    document_01['field_08'] = 151.2093;
    const colRef = db.collection(name_of_collection); // Reference to the collection
    const docRef = db.doc(name_of_collection+"/document_01"); // Reference to specific document
    document_01['field_09'] = docRef;
    // so document_01 is the document we created. 
    // print it in the log to see 
    console.log('document_01');
    console.log('--------------------');
    console.log(document_01);
    // no let us save this document in the firestore database by calling the method set
    // since set is a function and returns a promise( that means it may complete in a future time)
    //  we would await, that is we will wait until it is complete. by adding await keyword in the 
    // begininnging
    await document_01_reference.set(document_01, { merge: true });
    // we are not handling any errors using try catch as i am super borded to do this for kamesh
}
// now calling the func fun , since it is an async function and may complete in future we await on that too 
// here actually it doesn't matter. but we will just use it. 
fun();