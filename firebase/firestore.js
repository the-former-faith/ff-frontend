export const fsFunctions = (firestore) => {
    return {
        requestCollection: (collection) => {
            return firestore
                .collection(collection)
                .get()
        },
        requestDoc: (collection, doc) => {
            return firestore
            .collection(collection)
            .get(doc)
        }
    }
}
